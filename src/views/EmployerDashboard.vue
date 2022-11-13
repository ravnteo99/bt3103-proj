<template>
  <div class="column left">
    <h1>Shifts</h1>
    <div class="shift-wrapper">
      <ShiftCard
        v-for="shift in shifts"
        :key="shift"
        :branch="shift.branch"
        :title="shift.title"
      />
    </div>
  </div>
  <div class="column right">
    <h1>Employees</h1>
  </div>
</template>

<script>
import ShiftCard from "../components/ShiftCard.vue";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import dayjs from "dayjs";
const dbShifts = collection(db, "shifts");

export default {
  data() {
    return {
      shifts: [],
    };
  },
  components: { ShiftCard },
  async mounted() {
    for (let i = 0; i < 7; i++) {
      let date = dayjs().add(i, "day").format("YYYY-MM-DD");

      const q = await query(dbShifts, where("date", "==", date));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const filledManpower = data.filledManpower;
        const manpower = data.manpower;
        if (filledManpower != undefined) {
          let filled = true;
          for (const [key, value] of Object.entries(filledManpower)) {
            if (manpower[key] != value) {
              filled = false;
              break;
            }
          }
          if (!filled) {
            this.shifts.push({ branch: data.branch, title: data.title });
          }
        }
      });
    }
  },
};
</script>

<style scoped>
.column {
  float: left;
  text-align: left;
}

.left {
  width: 75%;
}

.right {
  width: 25%;
}

.shift-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}
</style>