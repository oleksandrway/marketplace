import fb from 'firebase/app';

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}
export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('shared/clearError')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('shared/setError', error)
        throw error
      }
    },

    async fetchOrders({ commit, getters }) {
      commit('shared/setLoading', true)
      commit('shared/clearError')

      const resultOrders = []

      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()

        if (!orders) {
          commit('shared/setLoading', false)

          return
        }

        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.phone, o.adId, o.done, key)
          )
        })

        commit('loadOrders', resultOrders)
      } catch (error) {
        console.log(error);
        commit('shared/setError', error)
      }

      commit('shared/setLoading', false)

    },

    async markOrderDone({ commit, getters }, payload) {
      commit('shared/clearError')

      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('shared/setError', error)
        throw error
      }
    }


  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(o => o.done)

    },
    undoneOrders(state) {
      return state.orders.filter(o => !o.done)

    },
    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }

}

