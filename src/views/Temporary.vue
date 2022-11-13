<template>
  <button @click="togglePopup">Create Shift</button>
  <NewShift v-if="popup" @togglePopup="popup=false" :branch="branch"/>
</template>

<script>
import NewShift from "../modals/NewShift.vue";

export default {
  name: "Temporary",

  data() {
    return {
      popup: false,
      branch: "Ang Mo Kio Hub", // to be changed
    };
  },

  components: { NewShift },

  methods: {
    togglePopup() {
      this.popup = true
    }
  }
};
</script>

<style>
</style>