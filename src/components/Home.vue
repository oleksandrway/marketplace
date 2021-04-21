<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in promoAds"
              :key="i"
              :src="item.imageSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="car-link">
                <v-btn class="error" :to="'/ad/' + item.id">
                  {{ item.title }}
                </v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row>
        <v-flex xs12 sm6 lg4 xl3 v-for="ad of ads" :key="ad.id">
          <v-card max-width="350" class="mx-auto">
            <v-img :src="ad.imageSrc" height="200px"></v-img>

            <v-card-title>
              {{ ad.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ ad.subtitle }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text :to="'/ad/' + ad.id"> Open </v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>

              <v-spacer></v-spacer>

              <v-btn icon @click="ad.show = !ad.show">
                <v-icon>{{
                  ad.show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="ad.show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ ad.descr }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-center" pt-5>
          <v-progress-circular
            :size="80"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // promoAds() {
    //   return this.$store.getters.promoAds
    // },
    // ads() {
    //   return this.$store.getters.ads
    // },
    // loading ( ) {
    //   return this.$store.getters.loading
    // }
    ...mapGetters({
      promoAds: "promoAds",
      ads: "ads",
      loading: "shared/loading",
    }),
    // ...mapGetters('shared', ['loading'])
  },
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 7px;
  border-radius: 5px 5px 0 0;
}
</style>