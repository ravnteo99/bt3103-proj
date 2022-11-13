<template>
  <div :class="tagName">
    <div class="req-card-wrapper">
      <h2>{{ firstName }} {{ lastName }}</h2>
      <p>{{ tagName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["firstName", "lastName", "tagName"],
};
</script>

<style scoped>
.req-card-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  padding: 5px;
}

.shift-card-wrapper:hover {
  cursor: pointer;
}

h2 {
  margin-bottom: 0px;
}

.Barista {
  background-color: #787161;
  color: white;
  border-radius: 10px;
}

.Cashier {
  background-color: black;
  color: white;
  border-radius: 10px;
}

.Clerk {
  background-color: #ffb100;
  color: black;
  border-radius: 10px;
}
</style>