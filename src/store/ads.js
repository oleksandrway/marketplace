import fb from 'firebase/app';
import 'firebase/database'
import 'firebase/storage';

class Ad {
  constructor (title, description,ownerId, imageSrc="", promo = false,id = null ) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id

  }
}

export default {
  state: {
    ads : [
    //   {
    //     promo: false,
    //     id: 1,
    //     show: false,
    //     imageSrc:
    //       "http://images.unsplash.com/photo-1529736576495-1ed4a29ca7e1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    //     title: "first",
    //     subtitle: "first card",
    //     descr:
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil deserunt consequatur a necessitatibus reiciendis delectus fugit commodi deleniti quibusdam asperiores, ullam quod molestiae at excepturi error amet numquam distinctio voluptatibus?",
    //   },
    //   {
    //     promo: true,
    //     id: 2,
    //     show: false,

    //     imageSrc:
    //       "https://helpx.adobe.com/content/dam/help/en/photoshop/how-to/photo-editor/_jcr_content/main-pars/image/photo_editor_1800x1012-1.jpg",
    //     title: "second",
    //     subtitle: "first card",
    //     descr:
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil deserunt consequatur a necessitatibus reiciendis delectus fugit?",
    //   },
    //   {
    //     promo: true,
    //     id: 3,
    //     show: false,
    //     imageSrc:
    //       "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    //     title: "third",
    //     subtitle: "first card",
    //     descr:
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil? deserunt consequatur a necessitatibus reiciendis delectus fugit commodi deleniti quibusdam asperiores, ullam quod molestiae at excepturi error amet numquam distinctio voluptatibus"
    //   },
    //   {
    //     promo: true,
    //     id: 4,
    //     show: false,
    //     imageSrc:
    //       "https://st3.depositphotos.com/12674628/15275/i/600/depositphotos_152758804-stock-photo-red-rose-with-water-drops.jpg",
    //     title: "fourth",
    //     subtitle: "first card",
    //     descr:
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ? ",
    //   },
    ],
  },      
  mutations: {
    createAd(state, payLoad) {
      state.ads.push(payLoad);
    },
    loadAds (state, payLoad) {
      state.ads = payLoad
    },
    updateAd( state, { title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
    
  },  
  actions: {
   async createAd({commit, getters}, payLoad) {
      // payLoad.id = Math.random()
      commit('shared/clearError')
      commit('shared/setLoading', true)

      const image = payLoad.image
      try {
        const newAd = new Ad(
          payLoad.title, 
          payLoad.description , 
          getters.user.id,
           '',
           payLoad.promo  
            )

        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        console.log(imageExt);


        const fileData = await fb.storage().ref(`ads/${ad.key}${imageExt}`).put(image)
        console.log(fileData);

        const imageSrc = await fileData.ref.getDownloadURL()
        // const imageSrc = fb.storage().ref().child("ads/MY-ZqBYtTolBwAaY8g2.png")



        // const imageSrc = 'https://firebasestorage.googleapis.com/v0/b/itc-ads-35309.appspot.com/o/ads%2F-MY9_FAsLkHn1CnBKUam.png?alt=media&token=d226e336-2770-41b9-8fcb-ab117d849e47'
       console.log(imageSrc);

        await fb.database().ref('ads').child(ad.key).update({
          imageSrc 
        })



          commit('setLoading', false)
        commit ('createAd', {
          ...newAd ,
          id: ad.key,
          imageSrc

        })
      } catch (error) {
        commit('shared/setError', error.message)

        console.log(error.message);
        console.log(error);

        commit('shared/setLoading', false)
        throw error
      }

    },
    async fetchAds ({commit}) {
      commit('shared/clearError')
      commit('shared/setLoading', true)

      const resultAds = []

      try {
       const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]

          resultAds.push(
            new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key)
          )

        })

        commit('loadAds', resultAds)
        commit('shared/setLoading', false)

      } catch(error) {
        commit('shared/setError' , error.message)
        commit('shared/setLoading', false)
        throw error
      }
    },
    async updateAd({commit}, {title, description, id}) {
      commit('shared/clearError')
      commit('shared/setLoading', true)
       

      try {
        await  fb.database().ref('ads').child(id).update({
          title, description
        })
       
          commit('updateAd', {
            title, description, id
          })
    

          commit('shared/setLoading', false) 
      } catch (error) {
        commit('shared/setError',  error.message) 
        commit('shared/setLoading', false) 
        throw error
      }
    }

  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => ad.promo); // change by myself
    },
    myAds(state, getters) {
      return state.ads.filter(ad => {
       
        return ad.ownerId ===  getters.user.id
      })
    },
    adById(state)  {
      return adId => {
        // console.log(adId );   
        // console.log(typeof(state.ads[1].id), typeof(adId) ); 
        return state.ads.find(ad => ad.id == adId)         // шукав чому не працює виявилось що різні типи даних 
      }
    },
    
  }
}