<template>
    <Datepicker
        class="calendar-component"
        v-model="date"
        inline
        selectText="Done"
        cancelText="Reset"
        :enableTimePicker="false"
        :range="true"
        :minDate="new Date()"
        :action-row-component="actionRow"
    >
    </Datepicker>
    <h3> Selected {{ date }} </h3>
    <h3 v-if="done">Done is clicked</h3>
</template>

<script>
import ActionRowCustom from "@/components/ActionRowCustom";
export default {
  data() {
    return {
      date: null,
      done: false,
    }
  },
  computed: {
    actionRow() {
      return ActionRowCustom
    }
  },
}
</script>

<style>
  .dp__today {
    border: 1px solid var(--yellow-tone-3)
  }

  .dp__range_between {
    background-color: var(--yellow-tone-1);
  }

  .dp__range_end, .dp__range_start {
    background-color: var(--yellow-tone-2);
    color: black;
  }
</style>