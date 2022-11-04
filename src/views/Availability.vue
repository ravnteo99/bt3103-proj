<template>
  <Calendar />
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
    name: "Availability",
    components: {
      Calendar
    }
}
</script>

<style scoped>
button:hover{
    background-color: #fcca4c;
}
button:active {
    opacity: 0.6;
    transform: translateY(3px);
}
</style>