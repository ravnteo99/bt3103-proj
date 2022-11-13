<template>
  <div class="column left">
    <h1>Shifts</h1>
    <div class="shift-wrapper">
      <ShiftCard />
    </div>
  </div>
  <div class="column right">
    <h1>Employees</h1>
  </div>
</template>

<script>
import ShiftCard from "../components/ShiftCard.vue";
export default {
  components: { ShiftCard },
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