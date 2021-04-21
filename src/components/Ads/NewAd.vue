<template>
  <v-container px-10>
    <v-layout row>
      <v-flex xc12>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            label="Ad title"
            name="title"
            type="texxt"
            required
            :rules="[(v) => !!v || 'title is required']"
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Ad description"
            name="description"
            type="text"
            :rules="[(v) => !!v || 'descriprion is required']"
            multi-line
          ></v-textarea>
        </v-form>
        <v-layout row mt-3>
          <v-flex xs12>
            <v-btn class="primary" @click="triggerUpload">
              Upload
              <v-icon right dark>mdi-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :src="imageSrc" height="100" v-if="imageSrc" />
          </v-flex>
        </v-layout>
        <v-layout row mb-5>
          <v-flex xs12> </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              v-model="promo"
              label="Add to promo"
              color="primary"
            ></v-switch>
            <v-btn
              :loading="loading"
              class="succes primary"
              right
              :disabled="!valid || !image || loading"
              @click="createAd"
            >
              Create ad</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {

  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    };
  },
  computed: {
    // loading() {
    //   return this.$store.getters.loading;
    // },
    ...mapState('shared', ['loading'])
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image,
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = () => {  // here was e => but I chenged because its wasn't used
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file


}
  },
};
</script>

<style>
</style>