<template>
  <div class="column left">
    <h1>Shifts</h1>
    <div class="shift-wrapper">
      <ShiftCard
        v-for="shift in shifts"
        :key="shift"
        :branch="shift.branch"
        :title="shift.title"
        :date="shift.date"
        :startTime="shift.startTime"
        :endTime="shift.endTime"
      />
    </div>
  </div>
  <div class="column right">
    <h1>Employees</h1>
    <div class="request-wrapper">
      <EmployeeTagReqCard
        v-for="req in tagRequests"
        :key="req"
        :firstName="req.firstName"
        :lastName="req.lastName"
        :tagName="req.tagName"
      />
    </div>
  </div>
</template>

<script>
import ShiftCard from "../components/ShiftCard.vue";
import EmployeeTagReqCard from "../components/EmployeeTagReqCard.vue";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
const dbShifts = collection(db, "shifts");
const dbTagRequest = collection(db, "tagRequest");
// const dbBranchRequest = collection(db, "branchRequest");

export default {
  data() {
    return {
      shifts: [],
      tagRequests: [],
    };
  },
  components: { ShiftCard, EmployeeTagReqCard },
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
            this.shifts.push({
              branch: data.branch,
              title: data.title,
              date: data.date,
              startTime: data.startTime,
              endTime: data.endTime,
            });
          }
        }
      });
    }

    const qTag = await query(dbTagRequest);
    const tagQuerySnapshot = await getDocs(qTag);

    tagQuerySnapshot.forEach((d) => {
      const data = d.data();
      const reqTag = data.tagName;
      const employeeID = data.employeeID;
      const employeeRef = doc(db, "employee", employeeID);
      getDoc(employeeRef).then((docSnap) => {
        const employee = docSnap.data();
        this.tagRequests.push({
          firstName: employee.firstName,
          lastName: employee.lastName,
          tagName: reqTag,
        });
      });
    });
  },
};
</script>

<style scoped>
.column {
  float: left;
  text-align: left;
}

.left {
  width: 65%;
  padding-right: 5%;
}

.right {
  width: 30%;
}

.shift-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.request-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}
</style>