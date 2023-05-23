<template>
  <v-list density="compact" nav>
    <v-list-item
      v-for="(navItem, index) in data"
      :to="'/' + navItem.value"
      :key="index"
      :prepend-icon="navItem.prependIcon"
      :title="navItem.title"
      :value="navItem.value"
    ></v-list-item>
  </v-list>
</template>
<script>
export default {
  name: "RailNavigation",
  props: {
    data: Object
  }
};
</script>
<style lang=""></style>
