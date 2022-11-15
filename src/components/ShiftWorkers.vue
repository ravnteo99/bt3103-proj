<template>
<!--  display name, profile picture and tag-->
  <p>{{ workerID }}</p>

</template>

<script>
import {getEmployee} from "@/db/Employee";

export default {
  name: "ShiftWorkers",
  props: ["employee"],
  data() {
    return {
      workerID: this.employee,
      workerObj: null
    }
  },
  mounted() {
    const getDbEmployee = async () => {
      this.workerObj = await getEmployee(this.workerID)
    }

    getDbEmployee()
  }
}
</script>

<style scoped>

</style>