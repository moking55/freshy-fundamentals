<template>
  <v-container>
    <v-card class="mb-3" v-for="assignmentInfo in assignmentResult" :key="assignmentInfo.id">
      <v-card-item class="ma-6" v-if="currentTime < assignmentInfo.due_date">
        <v-container fluid>
          <div class="d-flex justify-space-between">
            <h3>{{ assignmentInfo.name }}</h3>
            <p>ส่ง: {{ convertTimestampToDateTime(assignmentInfo.due_date) }} น</p>
          </div>
          <v-divider class="my-4"></v-divider>
          <p>
            {{ assignmentInfo.instruction }}
          </p>
          <v-spacer class="mb-6"></v-spacer>
          <v-form @submit.prevent="turnIn" v-if="!submitAssignment.isSubmitted(assignmentInfo.id)">
            <v-row class="mb-3">
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  color="green"
                  label="ชื่อ-นามสกุล"
                  :rules="nameRules"
                  v-model="assignment.name"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  color="green"
                  label="รหัสนักศึกษา"
                  :rules="studentIDRules"
                  v-model="assignment.studentID"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  color="green"
                  label="ลิ้งงาน"
                  :rules="assignmentRules"
                  v-model="assignment.link"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              :disabled="!(assignment.name && assignment.studentID && assignment.link)"
              @click="saveAssignmentInfo(assignmentInfo.id, assignmentInfo.name)"
              color="indigo"
              >ส่งงาน</v-btn
            >
          </v-form>
          <div v-else>
            <div class="text-green-darken-2">
              <v-icon icon="mdi-check" size="large"></v-icon> <span>คุณได้ส่งงานนี้ไปแล้ว</span>
            </div>
          </div>
        </v-container>
      </v-card-item>
    </v-card>
  </v-container>

  <v-dialog v-model="successDialog" width="auto">
    <v-card>
      <v-card-text> ส่งงานสำเร็จแล้ว ขอแสดงความยินดี </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { initializeApp } from "firebase/app";
import { useCollection } from "vuefire";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useAssignmentStore } from "@/stores/assignments.js";
import { ref } from "vue";

export default {
  name: "LabView",
  setup() {
    const submitAssignment = new useAssignmentStore();
    const currentTime = Math.floor(Date.now() / 1000);
    const db = getFirestore(initializeApp);
    const assignmentResult = ref();
    const isFetch = ref(true);
    const isFailed = ref(false);

    useCollection(collection(db, "assignments"))
      .promise.value.then((res) => {
        console.log(res);
        assignmentResult.value = res;
      })
      .catch((error) => {
        isFailed.value = true;
        console.error(error);
      })
      .finally(() => {
        isFetch.value = false;
      });
    return { submitAssignment, assignmentResult, isFetch, isFailed, db, currentTime };
  },
  data() {
    return {
      valid: false,
      submitted: this.submitAssignment.isSubmitted("asds"),
      successDialog: false,
      nameRules: [
        (value) => {
          if (value) return true;
          return "จำเป็นต้องกรอกข้อมูล";
        }
      ],
      studentIDRules: [
        (value) => {
          if (value) return true;
          return "จำเป็นต้องกรอกข้อมูล";
        }
      ],
      assignmentRules: [
        (value) => {
          if (value) return true;
          return "จำเป็นต้องกรอกข้อมูล";
        }
      ],
      assignment: {
        link: "",
        name: "",
        studentID: "",
        assignmentName: "",
        assignmentID: "",
        submitTime: ""
      }
    };
  },
  methods: {
    turnIn() {
      if (this.assignment.name && this.assignment.studentID && this.assignment.link) {
        const now = new Date();
        const offsetMs = now.getTimezoneOffset() * 60 * 1000;
        const dateLocal = new Date(now.getTime() - offsetMs);

        this.assignment.submitTime = dateLocal
          .toISOString()
          .slice(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ");
      }

      addDoc(collection(this.db, "assignment_turnin"), this.assignment).then((result) => {
        console.log(result);
        this.submitAssignment.setStatus(this.assignment.assignmentID, true);
        this.successDialog = true;
        this.submitted = true;
        this.assignment.link = "";
      });
    },
    convertTimestampToDateTime(timestamp) {
      const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);

      const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      return formattedDateTime;
    },
    saveAssignmentInfo(assignID, assignName) {
      this.assignment.assignmentID = assignID;
      this.assignment.assignmentName = assignName;
    }
  }
};
</script>
<style lang=""></style>
