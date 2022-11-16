<template>
  <div class="available-card-wrapper" 
  :class="[isActive ? 'active' : 'inactive']" 
  @[mayclick]="toggle(); $emit('select', this.$.vnode.key)">
    <div class="display-picture">
      <img :src="displayPicture" :alt="title">
    </div>
    <p>{{ isAvailable }}</p>
    <p>{{ this.$.vnode.key}}</p>
    <font-awesome-icon class="available-tick" v-if="isAvailable" icon="fa-solid fa-check" />
    <div class="available-information">
      <p class="title"> {{ branch }} </p>
      <p class="title"> {{ title }} </p>
      <p class="date"> <span><font-awesome-icon icon="fa-calendar" class="fa-calendar" /></span>{{ date }} </p>
      <span class="date">
        <span><font-awesome-icon icon="fa-regular fa-clock" /></span>
        {{startTime}} - {{ endTime}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvailabilityCard",
  props: {
    branch: String,
    title: String,
    date: String,
    startTime: String,
    endTime: String,
    displayPicture: String,
    isAvailable: Boolean,
    firstSelected: Boolean,
    typeShift: Boolean,
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    mayclick() {
      return this.firstSelected ? ((this.isAvailable && this.typeShift) ? "click" : null) : "click"
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive
    }
  },
}
</script>

<style scoped>
  .available-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    width: 150px;
    padding: 10px;
    position: relative;
    height:180px;
  }
  .inactive {
    background-color: white;
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

  .date {
    font-size: 15px;
    display: flex;
    gap: 10px;

  }
</style>