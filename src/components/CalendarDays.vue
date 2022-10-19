<template>
  <ol class="day-of-week">
    <li
      v-for="day in days"
      :key="day"
    >
      {{ day }}
    </li>
  </ol>
</template>

<script>
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default {
  name: 'CalendarDays',

  computed: {
    days() {
      return days
    }
  }
}
</script>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}
</style>