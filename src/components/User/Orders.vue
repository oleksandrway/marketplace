<template>
  <v-container>
  <v-layout row>
      <v-flex xs12 class="text-center" pt-5 v-if="loading">
          <v-progress-circular
            :size="80"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3" >
          Orders
        </h1>

        <v-list
      flat
      subheader
      three-line
    >

      <v-list-item-group
        multiple
        active-class=""
         v-for="order in  orders" 
        :key="order.id"
      >
        <v-list-item
       
        >
          <template v-slot:default="{ }">
            <v-list-item-action>
              <v-checkbox  
              @click="markDone(order)"
              :input-value="order.done"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> {{order.name}}</v-list-item-title>
              <v-list-item-subtitle> {{order.phone}}</v-list-item-subtitle>
              <v-list-item-subtitle> {{order.done}}</v-list-item-subtitle>

            </v-list-item-content>
            <v-list-item-action>
              <v-btn
              :to="'/ad/' + order.adId"
               class="primary">
                Open
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>

        
      </v-list-item-group>
    </v-list>
      </v-flex>
      <v-flex xs12 class="text-center" pt-5 v-else>
          <h1> You have no orders</h1>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
// import {mapState} from 'vuex';
export default {
  
  computed: {
    ...mapGetters({
      loading: "shared/loading",
      orders:"orders"

    }),
    // ...mapState({
    //   orders: state => state.orders
    // })
  },
  methods: {
    markDone(order) {
      this.$store.dispatch('markOrderDone', order.id)
      .then(() => {
        order.done = true
      })
      .catch(() =>{ })
     
    }
  },
  created() {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

<style>

</style>