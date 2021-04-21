<template>
  <v-dialog width="400px" v-model="modal">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" class="warning">Edit</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
               <v-text-field
                    v-model="editedTitle"
                    label="title"
                    name="title"
                    type="text"
                  ></v-text-field>
                  <v-textarea
                    v-model="editedDescription"
                    label="description"
                    name="description"
                    type="text"
            multi-line
                  ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer> </v-spacer>
                <v-btn @click="onCancel" text>Cancel</v-btn>
                <v-btn @click="onSave" class="success">Save</v-btn>
             
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data() {
    return {
      modal: false,
      editedDescription: this.ad.description ,
      editedTitle:  this.ad.title ,
    };
  },
  methods: {
    onCancel() {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false

    },
    onSave() {
      if (this.editedDescription !== '' && this.editedTitle !== '') {

        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id : this.ad.id
        })

        this.modal = false
      }
    }
  }
};
</script>

<style>
</style>