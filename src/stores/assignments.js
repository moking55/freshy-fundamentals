import { ref } from "vue";
import { defineStore } from "pinia";

export const useAssignmentStore = defineStore("assignment", () => {
  const assignments = ref([]);
  function setStatus(docID, status) {
    assignments.value.push({
      status: status,
      documentID: docID
    });
  }
  function isSubmitted(documentID) {
    const assignment = assignments.value.find((assignment) => assignment.documentID === documentID);
    return assignment ? assignment.status : false;
  }

  return { isSubmitted, setStatus };
});
