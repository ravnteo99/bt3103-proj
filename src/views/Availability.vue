<template>
  <Calendar />
  <h3>{{ userBranchID }}</h3>
  <h3>{{ userTag }}</h3>
  <h3>{{ userID }}</h3>
  <h3>{{ userBranchName }}</h3>
  <h3>{{ assignment }}</h3>
  <h3>{{ availability }}</h3>
  
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "@/firebase"
// import { collection, query, where, getDocs, documentId } from "firebase/firestore"; 
import {unsubAssignments, unsubAvailability, assignment, availability} from "@/db/Shift"
import {fetchBranches, fetchTags, getBranchName} from "@/db/Branch"
import {filterShifts} from "@/db/test"

export default {
    name: "Availability",
    components: {Calendar},
    data() {
    return {
      unsubscribeListener: [unsubAssignments, unsubAvailability],
      userID : "",
      userBranchID : [],
      userTag : [],
      shifts: [],
      assignment: [],
      availability: [],
      userShifts : [],
      userAssign : [],
      userAvailability : [],
      startDate: "2022-11-14",
      endDate: null,
      userBranchName: []
    }
  },

  async created() {
    this.assignment = assignment
    this.availability = availability
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userID = user.uid
          const [unsubBranch, branchID] = fetchBranches(user.uid)
          const [unsubTag, userTags] = fetchTags(user.uid)
          this.unsubscribeListener.push(unsubBranch, unsubTag)
          this.userBranchID = branchID
          this.userTag = userTags
      } else {
          this.userID = null;
      }
    });
    this.shifts = this.filteredShifts

  },

  watch: {
      userBranchID(newValue) {
        getBranchName(newValue).then((arr) => {
          this.userBranchName = arr
        })
      }
  },

  computed: {
    filteredShifts() {
      return filterShifts(this.userBranchName, this.userTag, this.startDate, this.endDate)
    },
  },

  methods: {
  }
}
</script>

<style scoped>

</style>