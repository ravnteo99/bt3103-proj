<template>
  <div class="card">
    {{shift.branch}} <br>
    <span>{{shift.startTime}}hrs - {{shift.endTime}}hrs</span>
  </div>
</template>

<script>
export default {
  props: {
    shift: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.card {
  background-color: greenyellow;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0px 10px 0px;
}

.card span {
  font-size: 13px;
}
</style>