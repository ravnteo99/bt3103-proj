<template>
  <div class="shift-wrapper">
    <div class="shift-popup">
      <h1 class="title">Shift Details</h1>
    </div>
  </div>


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
  }
}
</script>

<style scoped>
.shift-wrapper {
    z-index: 99;
    background-color: rgb(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.shift-popup {
    background-color: white;
    border-radius: 20px;
    width: 50%;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px;
    position: relative;
    max-width: 500px;
    min-width: 400px;
  }
</style>