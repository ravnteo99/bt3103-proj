<template>
  <Calendar />

  <div class="canvas">  
    <AvailabilityCard
      v-for="shift in filteredShifts"
      :key="shift.id"
      :title="shift.title"
      :date="shift.date"
      :startTime="shift.startTime"
      :endTime="shift.endTime"
      :displayPicture="require('@/assets/AngMoKioHub.svg')"
      :isAvailable="checkAvailable(shift.id)"
      />
  </div>
  <div class="button-wrapper custom-action-row">
        <button class="action-button done" type="button">Confirm</button>
  </div>



</template>

<script>
import Calendar from '@/components/Calendar.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AvailabilityCard from "@/components/AvailabilityCard.vue"
import {unsubAssignments, unsubAvailability, unsubShift, assignment, availability, shifts, filterShift, availShift} from "@/db/Shift"
import {fetchBranches, fetchTags, getBranchName} from "@/db/Branch"

export default {
    name: "Availability",
    components: {Calendar, AvailabilityCard},
    data() {
    return {
      unsubscribeListener: [unsubAssignments, unsubAvailability, unsubShift],
      userID : "",
      userBranchID : [],
      userTag : [],
      shifts: [],
      assignment: [],
      availability: [],
      startDate: "2022-11-14",
      endDate: null,
      userBranchName: []
    }
  },

  async created() {
    this.assignment = assignment
    this.availability = availability
    this.shifts = shifts
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
  },

  watch: {
      userBranchID(newValue) {
        getBranchName(newValue).then((arr) => {
          this.userBranchName = arr
        })
      },
      // userBranchName(newValue) {
      //   [unsubShift, filteredShift] = filterShifts(newValue, this.userTag, this.startDate, this.endDate)
      //   this.unsubscribeListener.filter()
      // }
  },

  computed: {
    filteredShifts() {
      return filterShift(this.shifts, this.userBranchName, this.userTag, this.startDate, this.endDate, this.assignment, this.userID)
    },
    availableShifts() {
      return availShift(this.filteredShifts, this.availability, this.userID)
    }
  },

  methods: {
    checkAvailable(shiftID) {
      for (let i=0; i<this.availableShifts.length; i++) {
        if (this.availableShifts[i].id === shiftID) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped>
  .canvas {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
  .custom-action-row {
    justify-content: flex-end;
  }

  .action-button {
    font-weight: 600;
  }
</style>