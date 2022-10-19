<template>
  <div class="week-selector">
    <span @click="selectPrev"> &lt; </span>
    <span @click="selectCurr">Today</span>
    <span @click="selectNext"> > </span>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "CalendarWeekSelector",

  props: {
    currentDate: {
      type: String,
      required: true,
    },

    selectedDate: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectPrev() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "week");
      this.$emit("dateSelected", newSelectedDate);
    },
    selectCurr() {
      let newSelectedDate = dayjs(this.currentDate);
      this.$emit("dateSelected", newSelectedDate);
    },

    selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "week");
      this.$emit("dateSelected", newSelectedDate);
    },
  },
};
</script>

<style scoped>
.week-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.week-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>