<script setup>
import { RouterView } from "vue-router";
</script>
<script>
import RailNavigation from "@/components/RailNavigation.vue";

export default {
  components: {
    RailNavigation
  },
  data: () => ({
    showExplanation: false,
    drawer: false,
    group: null,
    items: [
      {
        title: "Foo",
        value: "foo"
      },
      {
        title: "Bar",
        value: "bar"
      },
      {
        title: "Fizz",
        value: "fizz"
      },
      {
        title: "Buzz",
        value: "buzz"
      }
    ],
    railItemList: [
      {
        prependIcon: "mdi-home",
        title: "หน้าหลัก",
        value: "home"
      },
      {
        prependIcon: "mdi-source-branch",
        title: "เนื้อหาการสอน",
        value: "courses"
      },
      {
        prependIcon: "mdi-folder",
        title: "เอกสารประกอบ",
        value: "documents"
      },
      {
        prependIcon: "mdi-clipboard-text",
        title: "งานที่มอบหมาย",
        value: "lab"
      },
      {
        prependIcon: "mdi-checkbox-multiple-marked",
        title: "แบบสอบถาม",
        value: "survey"
      },
      {
        prependIcon: "mdi-alert",
        title: "แจ้งปัญหา",
        value: "reports"
      },
    ]
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-app-bar color="green-darken-2" prominent>
      <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-toolbar-title>
        <span v-if="!showExplanation" @mouseover="showExplanation = true" class="hover-text">
          <strong>FFP</strong>
        </span>
        <span @mouseleave="showExplanation = false" v-if="showExplanation" class="explanation">
          <strong>F</strong>reshy <strong>F</strong>undamentals <strong>P</strong>rogram
        </span>
        <span
          ><small style="font-size: 8pt; color: #bdbdbd" class="ps-2">
            by
            <a href="//github.com/moking55" style="text-decoration: none; color: #bdbdbd"
              >Codename_T</a
            ></small
          ></span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list :items="items"></v-list>
    </v-navigation-drawer> -->

    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>

      <RailNavigation :data="railItemList" />
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
.hover-text {
  display: inline-block;
  position: relative;
}
</style>
