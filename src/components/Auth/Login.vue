<template>
  <div>
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm4 md6 elevation-10>
          <v-toolbar align-center justify-center class="blue darken-3">
            <v-toolbar-title class="white--text"
              ><h4>Login</h4></v-toolbar-title
            >
          </v-toolbar>
          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    label="email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    counter
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="loading"

                :disabled="!valid || loading"
                color="primary"
                @click="onSubmit">Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      email: "dsf@fdjs.co",
      password: "dsf@fdjs.co",
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "this should be email",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 5) ||
          "Pame must be equel or more than 10 characters",
      ],
    };
  },
  computed: {
    // loading() {
    //   return this.$store.getters.loading
    // }
    ...mapGetters('shared', ['loading'])
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };

        this.$store
          .dispatch("LoginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});

      }
    },
  },
  created () {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('shared/setError', 'please log in to acces this page.')
    }
  }
}
</script>

<style>
</style>