<script setup>
import mainBG from "@/assets/main-bg.jpg";
</script>

<template>
  <div style="height: 91vh">
    <v-img cover class="h-100" :src="mainBG">
      <div class="h-100 d-flex" style="background: rgba(22, 33, 62, 0.6)">
        <v-container class="my-auto text-white">
          <div class="my-auto">
            <h1>ยินดีต้อนรับเข้าสู่ FFP</h1>
            <p>ระบบจัดการห้องเรียนขนาดเล็ก</p>
          </div>
        </v-container>
        <div class="home-credit text-grey d-flex justify-space-between w-100 px-5">
          <small>Beta 1.0.1</small>
          <small
            >built and maintained by
            <a href="//codename-t.com/" class="text-decoration-none text-white"
              >Codename_T</a
            ></small
          >
        </div>
      </div>
    </v-img>
  </div>
</template>
<style scoped>
.home-credit {
  position: absolute;
  bottom: 15px;
}
</style>
