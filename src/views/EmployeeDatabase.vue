<template>
  <ul>
    <li v-for="employee in employeees" :key="employee.name"> {{ employee.name }} </li>
  </ul>
</template>

<script>
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "EmployeeDatabase",
  data() {
    return {
      employeees: []
    }
  },
  mounted() {
    async function readEmployee() {
      const querySnapshot = await getDocs(collection(db, "employee"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }

    readEmployee()
  }
}
</script>

<style scoped>

</style>