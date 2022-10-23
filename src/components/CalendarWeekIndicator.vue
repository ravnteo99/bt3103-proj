<template>
  <div class="selected-week">{{ startOfWeek }} &#8211; {{endOfWeek}}</div>
</template>

<script>
import dayjs from "dayjs";

console.log(dayjs().day())

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedWeek() {
      return this.selectedDate.format("DD MMM YYYY");
    },
    startOfWeek() {
      let days = (this.selectedDate.day()+6)%7;
      return dayjs(this.selectedDate).subtract(days, "day").format("DD MMM YYYY");
    },
    endOfWeek() {
      let days = (this.selectedDate.day()+6)%7;
      return dayjs(this.selectedDate).add(6-days, "day").format("DD MMM YYYY");
    }
  },
};
</script>

<style scoped>
.selected-week {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>