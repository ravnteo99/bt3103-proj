<template>
  <ol class="day-of-week">
    <li v-for="day in days" :key="day">
      {{ day.day }} <span style="font-size: 15px; margin-left: 5px;">{{ day.date }}</span>
    </li>
  </ol>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "CalendarDays",

  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    days() {
      let index = (this.selectedDate.day() + 6) % 7;
      let days = [
        {
          day: "Mon",
          date: dayjs(this.selectedDate).subtract(index, "day").format("DD"),
        },
        {
          day: "Tue",
          date: dayjs(this.selectedDate)
            .subtract(index - 1, "day")
            .format("DD"),
        },
        {
          day: "Wed",
          date: dayjs(this.selectedDate)
            .subtract(index - 2, "day")
            .format("DD"),
        },
        {
          day: "Thu",
          date: dayjs(this.selectedDate)
            .subtract(index - 3, "day")
            .format("DD"),
        },
        {
          day: "Fri",
          date: dayjs(this.selectedDate)
            .subtract(index - 4, "day")
            .format("DD"),
        },
        {
          day: "Sat",
          date: dayjs(this.selectedDate)
            .subtract(index - 5, "day")
            .format("DD"),
        },
        {
          day: "Sun",
          date: dayjs(this.selectedDate)
            .subtract(index - 6, "day")
            .format("DD"),
        },
      ];
      return days;
    },
  },
};
</script>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: left;
  padding-right: 5px;
}
</style>