<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="card in documentsResult"
        :key="card.id"
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
            <!-- <v-card-title class="text-white" v-text="card.title"></v-card-title> -->
          </v-img>

          <v-card-actions>
            <span v-text="card.filename"></span>
            <v-spacer></v-spacer>
            <v-btn
              @click="downloadItem(card.download_link)"
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-download"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-snackbar v-model="snackbar" :timeout="timeout" location="bottom right">
    {{ text }}
  </v-snackbar>

  <v-dialog v-model="isFetch" :scrim="false" persistent width="auto">
    <v-card color="primary">
      <v-card-text>
        Please stand by
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="isFailed" width="auto">
    <v-card>
      <v-card-text> มีปัญหาเกิดขึ้นระหว่างการดึงข้อมูลโปรดเรียก TA </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="isFailed = false">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { useCollection } from "vuefire";
import { collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { ref } from "vue";

export default {
  name: "DocumentView",
  setup() {
    const db = getFirestore(initializeApp);
    const documentsResult = ref();

    const isFetch = ref(true);
    const isFailed = ref(false);

    useCollection(collection(db, "documents"))
      .promise.value.then((res) => {
        console.log(res);
        documentsResult.value = res;
      })
      .catch((error) => {
        isFailed.value = true;
        console.error(error);
      })
      .finally(() => {
        isFetch.value = false;
      });
    return { documentsResult, isFetch, isFailed };
  },
  data() {
    return {
      cards: {
        defaultFlex: 12
      },
      snackbar: false,
      text: "กำลังดาวน์โหลดเอกสาร",
      timeout: 2000
    };
  },
  methods: {
    downloadItem(link) {
      this.snackbar = true;
      window.open(link);
    }
  }
};
</script>
<style></style>
