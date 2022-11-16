<template>
  <NotifButton />
  <NavBar />
  <Calendar />
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import NavBar from '../components/NavBar.vue';
import NotifButton from '../components/NotifButton.vue';

export default {
    name: "Availability",
    components: {
      Calendar,
      NavBar,
      NotifButton
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