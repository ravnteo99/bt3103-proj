<template>
  <h1 class="section-title">Shifts Information</h1>

<!--  branch filter for shifts-->
  <select name="branch" id="branch" class="branch-filter input-field" v-model="selectedBranch">
    <option value="" selected>All branches</option>
    <option v-for="branch in branches" :value="branch" :key="branch.name"> {{ branch.name }} </option>
  </select>


  <div class="section-wrapper">
    <div class="shift-wrapper">
      <div class="shift-canvas">
        <div class="shift-card" v-for="shift in filteredShifts" :key="shift" @click="this.selectedShift=shift">
          <h3> {{ shift.title }}</h3>
          <p>
            <font-awesome-icon icon="fa-calendar" class="fa-calendar" />
            {{shift.date }}
          </p>
          <p>
            <span><font-awesome-icon icon="fa-regular fa-clock" /></span>
            {{ shift.startTime }} - {{ shift.endTime }}
          </p>
        </div>
      </div>
    </div>

    <div class="right-wrapper">
      <button class="create-button action-button">Create Shift</button>
      <Datepicker
          v-model="date"
          inline
          range
          :enableTimePicker="false"
          :action-row-component="actionRow"
      >
      </Datepicker>
      <div class="custom-action-row">
        <button class="clear-button action-button" @click="this.date = null">Display All Shifts</button>
      </div>

    </div>
  </div>


<!--  Modal Component-->
  <ShiftDetails
      v-if="selectedShift"
      @closePopup="this.selectedShift=null"
      :shift-id="selectedShift.id"
  />
</template>

<script>
import { branches } from "@/db/Employee";
import { unsubscribe, shifts } from "@/db/Shift";
import ShiftDetails from "@/modals/ShiftDetails";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import ActionRowCustom from "@/components/ActionRowCustom";

export default {
  name: "EmployerShift",
  components: {
    ShiftDetails,
    Datepicker
  },
  data() {
    return {
      unsubscribeListener: [unsubscribe],
      shifts: shifts,
      branches: branches,
      selectedBranch: null,
      selectedShift: null,
      date: null,
    }
  },
  unmounted() {
    this.unsubscribeListener.forEach((callback) => {
      callback()
    })
  },
  computed: {
    actionRow() {
      return ActionRowCustom
    },
    filteredShifts() {
      let result = null
      if (this.date === null) {
        result = this.shifts
      } else {
        result = this.shifts.filter((shift) => {
          const startDate = this.date[0].toISOString().substring(0, 10)
          const endDate = this.date[1].toISOString().substring(0, 10)
          if (endDate !== null) {
            return (shift.date >= startDate && shift.date <= endDate)
          } else {
            return (shift.date >= startDate)
          }
        })
      }

      // sort shifts by start time
      return result.sort((a, b) => {
        var keyA = a.startTime,
          keyB = b.endTime;
        // Compare the 2 times
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
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

.right-wrapper {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-action-row {
  justify-content: flex-start;
}

.action-button {
  width: 250px;
  font-weight: 600;
}

.create-button {
  background-color: var(--yellow-tone-2);
}

.shift-canvas {
  background-color: #FBFBFD;
  border-radius: 20px;
  padding: 20px;
  height: 500px;
  overflow-y: scroll;
}

.shift-card {
  border-radius: inherit;
  background-color: white;
  padding: 1px 20px;
  margin-top: 20px;
}

.shift-card:hover {
  background-color: var(--yellow-tone-1);
}
</style>