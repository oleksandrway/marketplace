<template>
  <v-container>
    <v-layout row>
      <v-flex xc12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300"> </v-img>
          <v-card-text>
            <h2 class="text--primary">{{ ad.title }}</h2>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <addEditAdModal v-if="isOwner" :ad="ad" />

            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else>
          <v-container>
            <v-flex xs12 class="text-center" pt-5>
              <v-progress-circular
                :size="80"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-flex>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import EditAdModal from "./EditAdModal";
export default {
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    ad() {
      const id = this.id;
      // console.log(this.$store.getters.adById(id));

      return this.$store.getters.adById(id);
    },
    isOwner() {
      return this.ad.ownerId === this.$store.getters.user.id;
    },
    ...mapGetters("shared", ["loading"]),
  },
  components: {
    addEditAdModal: EditAdModal,
  },
};
</script>

<style>
</style>