<template>
  <v-app>
    <v-main>
      <EmployeeCalendar/>
    </v-main>
  </v-app>
</template>

<script>
import EmployeeCalendar from './components/EmployeeCalendar.vue'

export default {
  name: 'App',

  components: {
    EmployeeCalendar,
  },

  data: () => ({
    //
  }),
}
</script>
