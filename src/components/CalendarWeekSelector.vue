<template>
  <span
    style="
      position: absolute;
      margin-left: 10%;
      margin-top: 0px;
      background-color: greenyellow;
      padding: 0px 10px 0px 10px;
      border: 5px;
      border-style: solid;
      border-color: greenyellow;
      border-radius: 10%;
    "
    @click="selectCurr"
    >Today</span
  >
  <div class="week-selector">
    <span @click="selectPrev"> &lt; </span>
    <CalendarWeekIndicator
      style="margin: 0px 10px 0px 10px"
      :selected-date="selectedDate"
    />
    <span @click="selectNext"> > </span>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CalendarWeekIndicator from "./CalendarWeekIndicator.vue";

export default {
  name: "CalendarWeekSelector",

  components: {
    CalendarWeekIndicator,
  },

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
  margin: auto;
  display: flex;
  justify-content: space-between;
  color: var(--grey-800);
}

.week-selector > * {
  cursor: pointer;
  user-select: none;
}

span {
  margin-top: 5px;
}
</style>