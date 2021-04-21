<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list subheader>
        <v-subheader>Title</v-subheader>

        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-action>
            <v-icon> mdi-{{ link.icon }} </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-action>
            <v-icon> mdi-logout </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card color="grey lighten-4" flat tile>
      <v-toolbar
        extended
        extension-height="0"
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" class="pointer" custom v-slot="{ navigate }">
            <span @click="navigate" @keypress.enter="navigate" role="link">
              Home page</span
            >
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="hidden-sm-and-down"
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          text
        >
          <v-icon left>mdi-{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn
          class="hidden-sm-and-down"
          @click="onLogout"
          text
          v-if="isUserLoggedIn"
        >
          <v-icon left>mdi-logout</v-icon>
          logout
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-main>
      <router-view></router-view>
    </v-main>

    <template v-if="error">
      <v-snackbar
        :timeout="6000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}

        <template v-slot:action="{ attrs }">
          <v-btn color="dark" text v-bind="attrs" @click.native="closeError">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>

import {mapState, mapGetters} from 'vuex'


export default {
  data() {
    return {
      drawer: false,
    };
  },

  computed:
   {
    // error() {
    //   // return this.$store.getters["shared/error"];
      
    // },
    ...mapState('shared', ['error']),

    // isUserLoggedIn() {
    //   return this.$store.getters.isUserLoggedIn;
    // },
    ...mapGetters(['isUserLoggedIn']),
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "bookmark-outline", url: "/orders" },
          { title: "New ad", icon: "file-plus", url: "/new" },
          { title: "My ads", icon: "view-list", url: "/list" },
        ];
      }

      return [
        { title: "login", icon: "lock", url: "/login" },
        { title: "Registration", icon: "face", url: "/registration" },
      ];
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("shared/clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    },
  },
};
</script>




<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
