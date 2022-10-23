<template>
  <div class="calendar-week">
    <div class="calendar-week-header">
      <!-- <CalendarWeekIndicator
        :selected-date="selectedDate"
        class="calendar-week-header-selected-week"
      /> -->

      <CalendarWeekSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <CalendarDays :selected-date="selectedDate" />

    <ol class="days-grid">
      <CalendarDayItem v-for="day in days" :key="day" :day="day" />
    </ol>

    <!-- <ol class="days-grid">
      <CalendarDayItem
        v-for="day in days"
        :key="day"
        :day="day"
        :is-today="day.date === today"
      />
    </ol> -->
  </div>
</template>

<script>
import dayjs from "dayjs";
// import CalendarWeekIndicator from "./CalendarWeekIndicator.vue";
import CalendarWeekSelector from "./CalendarWeekSelector.vue";
// import CalendarDayItem from "./CalendarDayItem.vue";
import CalendarDays from "./CalendarDays.vue";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDayItem from "./CalendarDayItem.vue";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  components: {
    // CalendarWeekIndicator,
    CalendarWeekSelector,
    // CalendarDayItem,
    CalendarDays,
    CalendarDayItem,
  },

  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format("YYYY-MM-DD"),
      dayOfWeek: dayjs().day(),
    };
  },

  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
  },

  computed: {
    days() {
      let index = (this.selectedDate.day() + 6) % 7;
      let days = [
        {
          day: "Mon",
          date: dayjs(this.selectedDate)
            .subtract(index, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Tue",
          date: dayjs(this.selectedDate)
            .subtract(index - 1, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Wed",
          date: dayjs(this.selectedDate)
            .subtract(index - 2, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Thu",
          date: dayjs(this.selectedDate)
            .subtract(index - 3, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Fri",
          date: dayjs(this.selectedDate)
            .subtract(index - 4, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Sat",
          date: dayjs(this.selectedDate)
            .subtract(index - 5, "day")
            .format("YYYY-MM-DD"),
        },
        {
          day: "Sun",
          date: dayjs(this.selectedDate)
            .subtract(index - 6, "day")
            .format("YYYY-MM-DD"),
        },
      ];
      return days;
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