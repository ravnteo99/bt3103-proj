<template>
  <div class="selected-week">{{ startOfWeek }} &#8211; {{endOfWeek}}</div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    startOfWeek() {
      let day = (this.selectedDate.day()+6)%7;
      return dayjs(this.selectedDate).subtract(day, "day").format("DD MMM YYYY");
    },
    endOfWeek() {
      let day = (this.selectedDate.day()+6)%7;
      return dayjs(this.selectedDate).add(6-day, "day").format("DD MMM YYYY");
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