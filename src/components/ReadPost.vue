<template>
  <v-card>
    <v-card-item class="ma-5">
      <h2 class="mb-5">{{ content.value.title.rendered }}</h2>
      <div class="pa-1" v-html="content.value.content.rendered"></div>
    </v-card-item>
  </v-card>
</template>
<script lang="js">
export default {
    name: "ReadPost",
    props: {
        content: Object
    },
    setup(props) {
        console.log(props.content.value.title.rendered.toString());
    }
}
</script>
