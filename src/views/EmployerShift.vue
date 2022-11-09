<template>
  <h1>{{ shiftObj }}</h1>
</template>

<script>
import { shifts } from "@/common/Shift";

export default {
  name: "EmployerShift",
  data() {
    return {
      shiftObj: shifts
    }
  },
}
</script>

<style scoped>

</style>