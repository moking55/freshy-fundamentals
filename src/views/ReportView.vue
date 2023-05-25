<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-container fluid>
          <h3>แบบฟอร์มแจ้งปัญหาระหว่างการอบรม</h3>
          <v-divider class="my-5"></v-divider>
          <v-form v-model="valid" v-if="timeUntilNextReport < currentTime">
            <v-rows>
              <v-col cols="12" md="8" lg="6">
                <p>1. ท่านไม่ได้รับความสะดวกในส่วนใด?</p>
                <v-select
                  label="โปรดเลือกหัวข้อ"
                  :items="[
                    'เนื้อหาที่ใช้อบรม',
                    'ระบบคอมพิวเตอร์/สารสนเทศ',
                    'สถานที่อบรม',
                    'ทีมงานหรือเจ้าหน้าที่',
                    'ผู้เข้าร่วมอบรมท่านอื่น',
                    'ระบบเว็บไซต์',
                    'อื่นๆ...'
                  ]"
                  v-model="reportCase.reportType"
                ></v-select>
              </v-col>
            </v-rows>
            <v-rows v-if="reportCase.reportType">
              <v-col cols="12" md="8" lg="6">
                <p>2. โปรดอธิบายว่าท่านเจอปัญหาอย่างไร</p>
                <v-textarea label="คำอธิบาย" v-model="reportCase.reportDescription"></v-textarea>
              </v-col>
            </v-rows>
            <v-rows v-if="reportCase.reportDescription">
              <v-col cols="12" md="8" lg="6">
                <p>3. เพื่อการยืนยันตัวตนโปรดกรอกรหัสนักศึกษาของท่าน</p>
                <v-text-field
                  v-model="reportCase.studentID"
                  :rules="studentIDRule"
                  :counter="10"
                  label="รหัสนักศึกษา 10 หลัก"
                  required
                ></v-text-field>
              </v-col>
            </v-rows>
            <v-rows v-if="valid">
              <v-col cols="12" md="8" lg="6">
                <v-btn block class="mt-2" v-on:click="submitReport">ส่งรายงาน</v-btn>
              </v-col>
            </v-rows>
          </v-form>

          <div v-else>
            ท่านยังไม่สามารถแจ้งปัญหาได้เนื่องจากท่านได้แจ้งรายงานไปแล้ว โปรดรอ
            {{ timeUntilNextReport - currentTime }} วินาที เพื่อแจ้งปัญหาใหม่
          </div>
        </v-container>
      </v-card-item>
    </v-card>
  </v-container>
  <v-snackbar v-model="snackbar" timeout="2000">
    แจ้งปัญหาสำเร็จแล้ว ขออภัยในความไม่สะดวกที่เกิดขึ้น

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export default {
  name: "ReportView",
  setup() {
    const reportCase = ref({});
    const currentTime = Math.floor(Date.now() / 1000);
    return { reportCase, currentTime };
  },
  data() {
    return {
      valid: false,
      snackbar: false,
      studentIDRule: [
        (value) => {
          if (value?.length == 10) {
            this.valid = true;
            return true;
          }
          this.valid = false;
          return "รหัสนักศึกษาไม่ถูกต้อง";
        }
      ],
      timeUntilNextReport: localStorage.getItem("timeUntilNextReport")
    };
  },
  methods: {
    submitReport() {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const dateLocal = new Date(now.getTime() - offsetMs);

      this.reportCase["reportTime"] = dateLocal
        .toISOString()
        .slice(0, 19)
        .replace(/-/g, "/")
        .replace("T", " ");

      const db = getFirestore(initializeApp);
      addDoc(collection(db, "reports"), this.reportCase).then((result) => {
        console.log(result);
        const currentTime = Math.floor(Date.now() / 1000);
        this.snackbar = true;
        localStorage.setItem("timeUntilNextReport", currentTime + 300);
        location.reload();
      });
    },
    countDownTimer() {
      if (this.timeUntilNextReport - this.currentTime == 0) {
        location.reload();
      }
      if (this.timeUntilNextReport - this.currentTime > 0) {
        setTimeout(() => {
          this.timeUntilNextReport -= 1;
          this.countDownTimer();
        }, 1000);
      }
    }
  },
  created() {
    this.countDownTimer();
  }
};
</script>
<style lang=""></style>
