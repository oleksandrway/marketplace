import store from '../store'


export default function (to, from, next) {

  if (store.state.user.userChecked) {
    if (store.state.user.user) {
      next()
    } else {
      next('/login?loginError=true')
    }
    return 
  } 
    store.watch(() => store.state.user.userChecked, checked => {
      if (store.state.user.user) {
        next()
      } else {
        next('/login?loginError=true')
      }
    })
  



}
