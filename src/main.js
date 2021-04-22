import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import  fb from 'firebase/app';
import 'firebase/storage'
import BuyModalComponent from '@/components/shared/buyModal';


// import './styles/main.sass'

// намагався поміняти колір

// import colors from 'vuetify/lib/util/colors'

// Vue.use(vuetify, {
//   theme: {
//     themes: {
//       light: {
//         primary: colors.red.darken1, // #E53935
//         secondary: colors.red.lighten4, // #FFCDD2
//         accent: colors.indigo.base, // #3F51B5
//       },
//     },
//   },
// })
// new Vuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: colors.red.darken1, // #E53935
//         secondary: colors.red.lighten4, // #FFCDD2
//         accent: colors.indigo.base, // #3F51B5
//       },
//     },
//   },
// }) 
//



//
Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  
  vuetify,
  router,
  
  store,
  render: h => h(App),


// намагався поміняти колір

  // beforeCreate() {
  //   console.log(this.$vuetify);
  //   console.log(this.$vuetify.theme);
  //   console.log(this.$vuetify.theme.themes);
  //   console.log(this.$vuetify.theme.themes.light);
  //   console.log(this.$vuetify.theme.themes.dark);
  //   this.$vuetify.theme.themes.light.primary = '#fff'
  //   // this.$vuetify.theme.themes.dark.primary = '#EF5350',
  // },
  created() {
    //
    

    //
    fb.initializeApp({
      apiKey: "AIzaSyBgPGpPLKRAShC3T7gapaUFJHfRix3UYh8",
      authDomain: "itc-ads-35309.firebaseapp.com",
      projectId: "itc-ads-35309",
      storageBucket: "itc-ads-35309.appspot.com",
      messagingSenderId: "681880728019",
      appId: "1:681880728019:web:f84098470de52d0cf33f26",
      measurementId: "G-W9NXL8J4VN"
    })

    // const firebaseConfig = {
    //   apiKey: "AIzaSyBgPGpPLKRAShC3T7gapaUFJHfRix3UYh8",
    //   authDomain: "itc-ads-35309.firebaseapp.com",
    //   projectId: "itc-ads-35309",
    //   storageBucket: "itc-ads-35309.appspot.com",
    //   messagingSenderId: "681880728019",
    //   appId: "1:681880728019:web:f84098470de52d0cf33f26",
    //   measurementId: "G-W9NXL8J4VN"
    // };

    //  const app =   fb.initializeApp(firebaseConfig);
    //   app.storage();

     fb.auth().onAuthStateChanged(user => { 
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
        return
      }
      this.$store.dispatch('setUserChecked', true)
      

    })

 


  }
}).$mount('#app')
