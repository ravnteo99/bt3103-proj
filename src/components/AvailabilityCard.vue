<template>
  <div class="available-card-wrapper" :class="[isActive ? 'active' : 'inactive']" @click="toggle">
    <div class="display-picture">
      <img :src="displayPicture" :alt="title">
    </div>
    <font-awesome-icon class="available-tick" v-if="isAvailable" icon="fa-solid fa-check" />
    <div class="available-information">
      <p class="title"> {{ title }} </p>
      <p class="date"> <span><font-awesome-icon icon="fa-calendar" class="fa-calendar" /></span>{{ date }} </p>
      <span class="date">
        <span><font-awesome-icon icon="fa-regular fa-clock" /></span>
        {{startTime}} - {{ endTime}}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "AvailabilityCard",
  props: {
    title: String,
    date: String,
    startTime: String,
    endTime: String,
    displayPicture: String,
    isAvailable: Boolean
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
  .available-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;

    width: 150px;
    padding: 20px;
    position: relative;
  }
  .inactive {
    background-color: #FBFBFD;
  }
  .active {
    background-color: var(--yellow-tone-2);
  }

  .available-tick {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
  }

  .available-information {
    text-align: center;
    padding: 0 20px;
    width: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .available-information p {
    margin: 5px;
  }

  img {
    border-radius: 100%;
  }

  .title {
    font-weight: bold;
  }

  .user-tag {
    border-radius: 5px;
    font-weight: bold;
    padding: 3px;
    width: 200px;
  }

  .none {
    background-color: #F83262;
    color: white;
  }

  .date {
    font-size: 15px;
    display: flex;
    gap: 10px;

  }
</style>