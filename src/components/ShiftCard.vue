<template>
  <div :class="branchclass">
    <div class="shift-card-wrapper">
      <h2>{{ branch }}</h2>
      <p>{{ title }}</p>
      Date: {{ date }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      branchclass: this.branch.replace(/\s/g, ""),
    };
  },
  props: ["branch", "title", "date", "startTime", "endTime"],
};
</script>

<style scoped>
.shift-card-wrapper {
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

.AngMoKioHub {
  background-color: rgb(244, 182, 187);
  border-radius: 10px;
}

.Junction8 {
  background-color: rgb(250, 224, 191);
  border-radius: 10px;
}

/* 255,255,193 201,253,205 194,224,252 */
</style>