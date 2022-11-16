<template>
  <NotifButton/>
  <NavBar/>

  <h1 class="section-title">Availability <span>{{ filteredShifts.length }} </span></h1>
  <h3> {{ selectedShift }}</h3>
  <h3> {{ firstSelected }}</h3>
  <h3> {{ firstAvailableType }}</h3>

  <div class="section-wrapper">
    <div class="shift-wrapper">
      <div class="canvas">
        <AvailabilityCard
            v-for="shift in filteredShifts"
            :key="shift.id"
            :branch="shift.branch"
            :title="shift.title"
            :date="shift.date"
            :startTime="shift.startTime"
            :endTime="shift.endTime"
            :displayPicture="require('@/assets/AngMoKioHub.svg')"
            :isAvailable="checkAvailable(shift.id)"
            :firstSelected="shift.firstSelected"
            :typeShift="shift.firstSelectedType"
            @select="(i) => selectedShift.includes(i) ? selectedShift.pop(i) : selectedShift.push(i)"
        />
      </div>
      <div class="button-wrapper custom-action-row">
        <button class="action-button done" type="button">Confirm</button>
      </div>
    </div>
    <div class="right-wrapper">
      <Calendar/>
    </div>
  </div>

</template>

<script>
import Calendar from '@/components/Calendar.vue'
import NotifButton from "@/components/NotifButton";
import NavBar from "../components/NavBar.vue"

import {getAuth, onAuthStateChanged} from "firebase/auth";
import AvailabilityCard from "@/components/AvailabilityCard.vue"
import {
  unsubAssignment,
  unsubAvailable,
  unsubShift,
  assignment,
  availability,
  shifts,
  filterShift,
  availShift
} from "@/db/Shift"
import {fetchBranches, fetchTags, getBranchName} from "@/db/Branch"

export default {
  name: "Availability",
  components: {Calendar, AvailabilityCard, NavBar, NotifButton},
  data() {
    return {
      unsubscribeListener: [unsubAssignment, unsubAvailable, unsubShift],
      userID: "",
      userBranchID: [],
      userTag: [],
      shifts: [],
      assignment: [],
      availability: [],
      startDate: "2022-11-14",
      endDate: null,
      userBranchName: [],
      selectedShift: [],
      firstSelected: false,
      firstAvailableType: false,
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
  unmounted() {
    this.unsubscribeListener.forEach((callback) => {
      callback()
    })
  },
  watch: {
    userBranchID(newValue) {
      getBranchName(newValue).then((arr) => {
        this.userBranchName = arr
      })
    },
    selectedShift(newValue) {
      console.log(this.selectedShift)
      if (this.selectedShift.length === 1) {
        this.firstSelected = true
        if (this.availableShifts.includes(newValue)) {
          this.firstAvailable = true
        }
      } else if (this.selectedShift.length === 0) {
        this.firstSelected = false
      }
    }
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
      for (let i = 0; i < this.availableShifts.length; i++) {
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
.section-wrapper {
  display: flex;
}

.shift-wrapper {
  border-radius: 10px;
  overflow: auto;
  flex: 3;
  min-width: 500px;
}

.canvas {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #FBFBFD;
  border-radius: 20px;
  padding: 20px;
  height: 500px;
  overflow-y: scroll;
}

.custom-action-row {
  justify-content: flex-end;
}

.action-button {
  font-weight: 600;
}

h1 span {
  color: #808080;
  font-weight: normal;
  font-size: 20px;
  margin-left: 10px;
}
</style>