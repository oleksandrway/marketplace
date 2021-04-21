import fb from 'firebase/app';
import 'firebase/auth'


class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payLoad) {
      state.user = payLoad
    }
  },
  actions: {
    async registerUser({ dispatch, commit }, { email, password }) {
      dispatch('shared/clearError')
      dispatch('shared/setLoading', true)

      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        dispatch('shared/setLoading', false)

      } catch (error) {
        dispatch('shared/setLoading', false)
        dispatch('shared/setError', error.message)
        throw error
      }
      // .then(user => {
      //   dispatch('setUser', new User(user.uid))
      // dispatch('setLoading', false)

      // })
      // .catch(error => {
      // dispatch('setLoading', false)
      // dispatch('setError', error.message)
      // })
    },
    async LoginUser({ dispatch, commit }, { email, password }) {
      dispatch('shared/clearError')
      dispatch('shared/setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        dispatch('shared/setLoading', false)
      } catch (error) {
        dispatch('shared/setLoading', false)
        dispatch('shared/setError', error.message)
        throw error

      }
    },
    autoLoginUser({ commit }, payLoad) {
      commit('setUser', new User(payLoad.uid))
    },
    logoutUser({ commit }) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null

    }
  }
}