 import store from '../store'
 
 
 export default function(to, from , next) {

 


  const isUserLogin =   store.getters.user
    if (isUserLogin) { 
      next()
    } else {
      next( '/login?loginError=true')
    }

 
 }
