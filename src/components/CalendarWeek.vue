<template>
  <CalendarWeekSelector
    :current-date="today"
    :selected-date="selectedDate"
    @dateSelected="selectDate"
  />
  <div class="calendar-week">
    <CalendarDays :selected-date="selectedDate" />

    <ol class="days-grid">
      <CalendarDayItem
        v-for="day in days"
        :key="day"
        :day="day"
        :shifts="shiftMap.get(day.date)"
      />
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CalendarWeekSelector from "./CalendarWeekSelector.vue";
import CalendarDays from "./CalendarDays.vue";
import CalendarDayItem from "./CalendarDayItem.vue";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  components: {
    CalendarWeekSelector,
    CalendarDays,
    CalendarDayItem,
  },

  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format("YYYY-MM-DD"),
      dayOfWeek: dayjs().day(),
      shiftIds: [],
      shiftMap: new Map(),
    };
  },

  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },

  computed: {
    days() {
      let index = (this.selectedDate.day() + 6) % 7;
      let days = [
        {
          day: "Mon",
          date: dayjs(this.selectedDate)
            .subtract(index, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Tue",
          date: dayjs(this.selectedDate)
            .subtract(index - 1, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Wed",
          date: dayjs(this.selectedDate)
            .subtract(index - 2, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Thu",
          date: dayjs(this.selectedDate)
            .subtract(index - 3, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Fri",
          date: dayjs(this.selectedDate)
            .subtract(index - 4, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Sat",
          date: dayjs(this.selectedDate)
            .subtract(index - 5, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Sun",
          date: dayjs(this.selectedDate)
            .subtract(index - 6, "day")
            .format("YYYY-MM-DD"),
        },
      ];
      return days;
    },
  },

  mounted() {
    // function to sort shifts
    function compareShifts(shift1, shift2) {
      const obj1 = shift1.startTime;
      const obj2 = shift2.startTime;
      if (obj1 < obj2) {
        return -1;
      }
      if (obj1 > obj2) {
        return 1;
      }
      return 0;
    }

    // get userid INCOMPLETE

    // get shiftids assigned to userid INCOMPLETE
    async function getShiftIds() {
      let z = await getDocs(collection(db, "EmployeeAssignments"));
      let shiftIds = [];
      z.forEach((docs) => {
        let data = docs.data();
        let shiftId = data.Shift;
        shiftIds.push(String(shiftId));
      });
      return shiftIds;
    }

    getShiftIds().then((arr) => {
      this.shiftIds = arr;

      arr.forEach((id) => {
        async function getShift() {
          const docRef = doc(db, "shift", id);
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        }

        getShift().then((shift) => {
          // map key:shiftDates value:[StartTime, EndTime, Branch]
          let date = shift.Date;
          let startTime = shift.StartTime;
          let endTime = shift.EndTime;
          let branch = shift.Branch;
          if (this.shiftMap.get(date) == undefined) {
            this.shiftMap.set(date, []);
          }
          this.shiftMap.get(date).push({
            startTime: startTime,
            endTime: endTime,
            branch: branch,
          });

          // sort shifts by time
          let arr = this.shiftMap.get(date);
          this.shiftMap.set(
            date,
            arr.sort((shift1, shift2) => {
              return compareShifts(shift1, shift2);
            })
          );
        });
      });
    });
  },
};
</script>

<style scoped>
.calendar-week {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
  margin-top: 20px;
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>