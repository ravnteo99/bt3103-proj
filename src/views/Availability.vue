<template>
  <Calendar />
  <h3>{{ userBranchID }}</h3>
  <h3>{{ userTag }}</h3>
  <h3>{{ userID }}</h3>
  <h3>{{ userBranchName }}</h3>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/firebase"
import { collection, query, where, getDocs, documentId } from "firebase/firestore"; 
import {unsubAssignments, unsubAvailability, assignment, availability} from "@/db/Shift"
import {fetchBranches, fetchTags} from "@/db/Branch"
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
    // this.userBranchName = this.branchName
    this.shifts = this.filteredShifts
    this.assignment = assignment
    this.availability = availability
  },

  computed: {
    // branchName() {
    //    return this.getBranchName(this.userBranchID)
    // },
    filteredShifts() {
      return filterShifts(this.userBranchName, this.userTag, this.startDate, this.endDate)
    },
  },
  methods: {
      async getBranchName(branchID) {
      //query for branch based on brandID
      const queryBranch =  await getDocs(query(collection(db, "branch"), where(documentId(), "in", branchID)))
      let userBranch = [] 
      queryBranch.forEach((doc) => {
          userBranch.push(doc.data().name)
      })
      // Get Branch that user belongs to.
      return userBranch;
    }
  }
}
</script>

<style scoped>

</style>