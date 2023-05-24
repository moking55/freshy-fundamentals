<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="card in cards.content"
        :key="card.title"
        :cols="cards.defaultFlex"
        :md="cards.defaultFlex - 6"
        :lg="cards.defaultFlex - 9"
      >
        <v-card>
          <v-img
            :src="card.src"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <v-card-title class="text-white" v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="js">
export default {
    name: "DocumentView",
    data() {
        return {
            cards: {
                defaultFlex: 12,
                content:[
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
      ]
            },

        }
    },
}
</script>
<style></style>
