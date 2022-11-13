<template>
  <div class="shift-card-wrapper">
    <h2>{{ branch }}</h2>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      branch: "Ang Mo Kio Hub",
      title: "Morning Shift",
    };
  },
};
</script>

<style scoped>
.shift-card-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #fbfbfd;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  line-height: 0px;
}
</style>