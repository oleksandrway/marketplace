import { firebase } from '@firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBgPGpPLKRAShC3T7gapaUFJHfRix3UYh8",
    authDomain: "itc-ads-35309.firebaseapp.com",
    projectId: "itc-ads-35309",
    storageBucket: "itc-ads-35309.appspot.com",
    messagingSenderId: "681880728019",
    appId: "1:681880728019:web:f84098470de52d0cf33f26",
    measurementId: "G-W9NXL8J4VN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;