import fb from 'firebase/app';
import 'firebase/auth'


class User {
  constructor(id) {
    this.id = id
  }
}


export default {
  state: {
    user: null,
    userChecked: false
  },
  mutations: {
    setUser(state, payLoad) {
      state.user = payLoad
     
    } ,
    userChecked(state, payLoad) {
      state.userChecked = payLoad
    }
  },
  actions: {
    async registerUser({ dispatch, commit }, { email, password }) {
      dispatch('shared/clearError')
      dispatch('shared/setLoading', true)

      try {
        const response = await fb.auth().createUserWithEmailAndPassword(email, password)
        const user = response.user
        commit('setUser', new User(user.uid))
        dispatch('shared/setLoading', false)
        dispatch('fetchAds')

      } catch (error) {
        dispatch('shared/setLoading', false)
        dispatch('shared/setError', error)
        throw error
      }

      // .then(user => {
      //   dispatch('setUser', new User(user.uid))
      // dispatch('setLoading', false)

      // })
      // .catch(error => {
      // dispatch('setLoading', false)
      // dispatch('setError', error)
      // })
    },
    async LoginUser({ dispatch, commit }, { email, password }) {
      dispatch('shared/clearError')
      dispatch('shared/setLoading', true)
      try {
        const response = await fb.auth().signInWithEmailAndPassword(email, password)
        const user = response.user
        commit('setUser', new User(user.uid))
       
        dispatch('shared/setLoading', false)
        dispatch('fetchAds')

      } catch (error) {
        dispatch('shared/setLoading', false)
        dispatch('shared/setError', error)
        throw error

      }
    },
    autoLoginUser({ commit }, payLoad) {
      commit('setUser', new User(payLoad.uid))
      commit('userChecked', true)

    },
    setUserChecked({commit}, payLoad) {
      commit('userChecked', true)
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