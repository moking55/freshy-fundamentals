<template>
  <v-container fluid v-if="coursesList.length">
    <v-row>
      <v-col cols="12" :md="!activeCard ? 12 : 4" :lg="!activeCard ? 12 : 3">
        <v-card>
          <v-expansion-panels v-model="coursePanel">
            <v-expansion-panel title="Learning path">
              <v-expansion-panel-text class="pa-0">
                <v-list>
                  <v-list-item
                    class="py-3 rounded"
                    v-for="course in coursesList"
                    :key="course.id"
                    :title="course.title.rendered"
                    :subtitle="course._embedded['wp:term'][0][0].name"
                    :value="course.id"
                    @click="toggleCourses(course.id)"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="grey-lighten-1">
                        <v-icon color="white">mdi-folder</v-icon>
                      </v-avatar>
                    </template>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="9" v-if="activeCard">
        <ReadPost :content="postData" />
      </v-col>
    </v-row>
  </v-container>
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
import axios from "axios";
import { ref } from "vue";
import ReadPost from "@/components/ReadPost.vue";

export default {
  name: "CoursesView",
  components: {
    ReadPost
  },
  data: () => ({
    postData: ref({}),
    coursePanel: [0]
  }),
  setup() {
    const isFetch = ref(true);
    const isFailed = ref(false);
    const activeCard = ref(false);
    const coursesList = ref([]);
    axios
      .get(import.meta.env.VITE_APP_API_BASE + "/posts?categories=2&_embed=wp:term")
      .then((response) => {
        console.log(response.data);
        coursesList.value = response.data;
      })
      .catch((error) => {
        isFailed.value = true;
        console.error(error);
      })
      .finally(() => {
        isFetch.value = false;
      });
    return {
      coursesList,
      isFetch,
      isFailed,
      activeCard
    };
  },
  methods: {
    toggleCourses(id) {
      this.isFetch = true;
      axios
        .get(import.meta.env.VITE_APP_API_BASE + "/posts/" + id)
        .then((response) => {
          console.log(response.data);
          this.postData.value = response.data;
        })
        .catch((error) => {
          this.isFailed = true;
          this.activeCard = false;
          console.log.error(error);
        })
        .finally(() => {
          this.isFetch = false;
          this.activeCard = true;
        });
    }
  }
};
</script>
<style scoped>
>>> p {
  margin-bottom: 1.5em;
}

>>> figcaption {
  color: #888;
  font-size: 10pt;
  margin-bottom: 1em;

}

>>> img {
  max-width: 100%;
  object-fit: contain;
}
</style>
