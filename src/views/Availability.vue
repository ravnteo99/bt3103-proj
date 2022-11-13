<template>
  <Calendar />
  <h3>{{ userBranchID }}</h3>
  <h3>{{ userTag }}</h3>
  <h3>{{ userAssign }}</h3>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth } from "firebase/auth";

import { db } from "@/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";
// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//     const userID = user.uid;
//   } else {
//     const userID = null;
//   }
// });
// const userID = "IIDJA"
// console.log({{ userID }})
export default {
    name: "Availability",
    components: {Calendar},
    data() {
    return {
      userID : "NUTIYBOtubFTnwLi4990",
      userBranchID : [],
      userTag : [],
      date : "2022-10-25",
      userAssign : [],
      shifts : [],
      userAvailability : []
    }
  },
  async created() {
      const q = query(collection(db, "branchEmployee"), where("employeeID", "==", this.userID));
      const queryBranchID = await getDocs(q);
      queryBranchID.forEach((doc) => {
        this.userBranchID.push(doc.data().branchID)
      })

      const q2 = query(collection(db, "employeeTag"), where("employeeID", "==", this.userID));
      const queryEmployeeTag = await getDocs(q2);
      queryEmployeeTag.forEach((doc) => {
        this.userTag.push(doc.data().tagName)
      })

      const q3 = query(collection(db, "EmployeeAssignments"), where("employeeID", "==", this.userID))
      const assignQuery = await getDocs(q3);
      assignQuery.forEach((doc) => {
        this.userAssign.push(doc.data().shiftID)
      })
      


  }
}
</script>

<style scoped>

</style>