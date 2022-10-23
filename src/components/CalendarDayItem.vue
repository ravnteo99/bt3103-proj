<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--today': isToday,
    }"
  >
    <span>{{ label }}</span>
  </li>
</template>

<script>
import dayjs from "dayjs";
// import firebaseApp from "../firebase.js";
// import { getFirestore } from "firebase/firestore";
// import { collection, getDoc, getDocs, doc } from "firebase/firestore";

// const db = getFirestore(firebaseApp)

export default {
  name: "CalendarDayItem",

  props: {
    day: {
      type: Object,
      required: true,
    },

    isToday: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    },
  },

  // mounted() {
  //   async function display() {
  //     let z = await getDocs(collection(db, "EmployeeAssignments"));

  //     z.forEach((docs) => {
  //       let data = docs.data()
  //       let shiftId = data.Shift;
  //       async function getShift() {
  //         const docRef = doc(db, 'shift', shiftId)
  //         const docSnap = await getDoc(docRef)
  //         return docSnap.data()
  //       }
  //       let shift = getShift()
  //       let startTime = shift.StartTime;
  //       let endTime = shift.EndTime;

  //     })
  //   }
  // }
};
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
</style>