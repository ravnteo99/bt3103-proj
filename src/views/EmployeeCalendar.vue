<template>
  <div v-if="!auth">NOT AUTHORISED</div>
  <div v-else>
    <NotifButton />

    <NavBar />
    <h1>Timetable</h1>
    <CalendarWeek />
  </div>
</template>

<script>
import CalendarWeek from "../components/CalendarWeek.vue";
import NotifButton from "@/components/NotifButton";
import NavBar from "../components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      auth: false,
    };
  },
  components: { CalendarWeek, NotifButton, NavBar },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.auth = true;
      }
    });
  },
};
</script>

<style scoped>
body {
  font-family: sans-serif;
  font-weight: 100;
  --grey-100: #e4e9f0;
  --grey-200: #cfd7e3;
  --grey-300: #b5c0cd;
  --grey-800: #3e4e63;
  --grid-gap: 1px;
  --day-label-size: 20px;
}

ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.calendar-week-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
}
</style>
