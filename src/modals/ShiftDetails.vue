<template>
  <h1 class="title">Shift Details</h1>

</template>

<script>
export default {
  name: "ShiftDetails",
  data() {
    return {
      shiftObj: {},
      shiftDescription: "",
      startTime: "",
      endTime: "",
      status: null,
      availableWorkers: [],
      assignedWorkers: [],
    }
  },
  async created() {

  }
}
</script>

<style scoped>

</style>