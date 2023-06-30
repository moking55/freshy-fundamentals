<script>
import { RouterView } from "vue-router";
import RailNavigation from "@/components/RailNavigation.vue";
import { useDisplay } from "vuetify";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";

export default {
  components: {
    RailNavigation,
    RouterView
  },
  data: () => ({
    showExplanation: false,
    drawer: false,
    changeUserDialogue: false,
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
        prependIcon: "mdi-alert",
        title: "แจ้งปัญหา",
        value: "reports"
      }
    ]
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  },
  setup() {
    const { mobile } = useDisplay();
    const navDrawerIsOpen = ref(!mobile.value);
    const userInfo = useUserStore();
    
    return { navDrawerIsOpen, mobile, userInfo };
  },
  computed: {
    isCourses() {
      return this.$route.name === "courses";
    }
  },
  methods: {
    refresh() {
      this.$router.go(0);
    },
    saveChange() {
      this.changeUserDialogue = false;
      this.userInfo.setUser(this.userInfo.username, this.userInfo.avatar);
    }
  }
};
</script>
<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-app-bar color="green-darken-2" prominent>
      <v-app-bar-nav-icon
        variant="text"
        v-if="mobile"
        @click.stop="navDrawerIsOpen = !navDrawerIsOpen"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span v-if="!showExplanation" @mouseover="showExplanation = true" class="hover-text">
          <strong>FFP</strong>
        </span>
        <span
          @mouseleave="showExplanation = false"
          v-if="showExplanation"
          class="explanation text-grey-lighten-1"
        >
          <strong class="text-white">F</strong>reshy
          <strong class="text-white">F</strong>undamentals
          <strong class="text-white">P</strong>rogram
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

      <v-btn variant="text" v-if="isCourses" @click="refresh" icon="mdi-reload"></v-btn>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list :items="items"></v-list>
    </v-navigation-drawer> -->

    <v-navigation-drawer v-model="navDrawerIsOpen" expand-on-hover rail>
      <v-list @click="changeUserDialogue = true">
        <v-list-item :prepend-avatar="userInfo.avatar">
          <v-list-item-title>{{ userInfo.username }}</v-list-item-title>
          <v-list-item-subtitle>ผู้เข้าร่วม</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-dialog persistent v-model="changeUserDialogue" width="auto">
        <v-card>
          <v-card-item class="text-center">
            <v-avatar size="100" class="mb-6" color="surface-variant">
              <v-img :src="userInfo.avatar"></v-img>
            </v-avatar>
            <v-text-field
              label="ลิ้งค์อวาต้า"
              v-model="userInfo.avatar"
              variant="underlined"
              style="width: 300px"
              density="compact"
            ></v-text-field>
            <v-text-field
              label="ชื่อผู้อบรม"
              v-model="userInfo.username"
              variant="underlined"
              style="width: 300px"
              density="compact"
            ></v-text-field>
          </v-card-item>
          <v-card-actions>
            <v-btn color="primary" block @click="saveChange">บันทึก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
