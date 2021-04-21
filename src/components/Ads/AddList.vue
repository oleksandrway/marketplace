<template>
  <v-container>
    <v-layout v-if="!loading && myAds.length !== 0 " row>
      <v-flex xc12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My ads</h1>

        <v-card class="elevation-10 mb-10" v-for="ad in myAds" :key="ad.id">
          <v-layout row>
            <v-flex xs4>
              <v-img :src="ad.imageSrc" min-height="100%" height="0" > </v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                 <h2 class="text--primary">{{ad.title}}</h2> 
                 <p>{{ ad.descr}}</p>
                 </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info mr-5"
                :to="/ad/ + ad.id"
                >Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myAds.length === 0 " row>
        <v-flex xs12 class="text-center" pt-5>
          <h1> You have no ads</h1>
        </v-flex>
      </v-layout>
      <v-layout v-else row>
        <v-flex xs12 class="text-center" pt-5>
          <v-progress-circular
            :size="80"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  computed: {
    // myAds() {
    //   return this.$store.getters.myAds
    // }
    ...mapGetters({myAds:'myAds', loading: "shared/loading" ,})
  }

};
</script>

<style>
</style>