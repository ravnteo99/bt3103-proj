<template>
  <div class="shift-card-wrapper">
    <h2>{{ branch }}</h2>
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["branch", "title"],
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