<template>
  <div class="selected-week">{{ selectedWeek }}</div>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedWeek() {
      return this.selectedDate.format("MMMM YYYY");
    },
  },
};
</script>

<style scoped>
.selected-week {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>