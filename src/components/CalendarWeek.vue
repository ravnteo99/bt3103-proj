<template>
  <div class="calendar-week">
    <div class="calendar-week-header">
      <CalendarWeekIndicator
        :selected-date="selectedDate"
        class="calendar-week-header-selected-week"
      />

      <CalendarWeekSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <CalendarDays />

    <ol class="days-grid">
      <CalendarDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
      />
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CalendarWeekIndicator from "./CalendarWeekIndicator.vue";
import CalendarWeekSelector from "./CalendarWeekSelector.vue";
import CalendarDayItem from "./CalendarDayItem.vue";
import CalendarDays from "./CalendarDays.vue";

export default {
  components: {
    CalendarWeekIndicator,
    CalendarWeekSelector,
    CalendarDayItem,
    CalendarDays,
  },

  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format("YYYY-MM-DD"),
    };
  },

  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },

  computed: {
    days() {
      return [
        { date: "2022-10-10" },
        { date: "2022-10-11" },
        { date: "2022-10-12" },
        { date: "2022-10-13" },
        { date: "2022-10-14" },
        { date: "2022-10-15" },
        { date: "2022-10-16" },
      ];
    },
  },
};
</script>

<style scoped>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}
</style>