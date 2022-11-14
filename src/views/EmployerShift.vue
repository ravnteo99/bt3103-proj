<template>
  <h1 class="section-title">Shifts Information</h1>

<!--  branch filter for shifts-->
  <select name="branch" id="branch" class="branch-filter input-field" v-model="selectedBranch">
    <option value="" selected>All branches</option>
    <option v-for="branch in branches" :value="branch" :key="branch.name"> {{ branch.name }} </option>
  </select>

  <ShiftDetails />
  <p> {{ shifts }} </p>

</template>

<script>
import { branches } from "@/db/Employee";
import { unsubscribe, shifts } from "@/db/Shift";
import ShiftDetails from "@/modals/ShiftDetails";

export default {
  name: "EmployerShift",
  components: {
    ShiftDetails
  },
  data() {
    return {
      unsubscribeListener: [unsubscribe],
      shifts: shifts,
      branches: branches
    }
  },
  unmounted() {
    this.unsubscribeListener.forEach((callback) => {
      callback()
    })
  }
}
</script>

<style scoped>

</style>