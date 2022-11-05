<template>
  <div class="information-wrapper">
    <div class="newshift-popup">
      <div class="header-wrapper">
        <div class="header">
          <h2>New Schedule</h2>
          <p v-if="repeating">A repeating schedule generates multiple shifts</p>
          <p v-else>This option generates a single shift</p>
        </div>
      </div>
      <form class="new-schedule">
        <label for="title">Title</label>
        <input type="text" name="title" />
        <label for="startDate">Starts From</label>
        <input type="date" name="startDate" />
        <label for="endDate">Ends On</label>
        <input type="date" name="endDate" />
        <div class="time-input">
          <div class="column">
            <label for="startTime">Time In</label>
            <input type="time" name="startTime" />
          </div>
          <div class="column">
            <label for="startTime">Time Out</label>
            <input type="time" name="startTime" />
          </div>
        </div>
        <label for="manpower">Manpower</label>
        <Multiselect
          v-model="selectedBranch"
          mode="tags"
          placeholder="Select Branches"
          track-by="value"
          label="value"
          :close-on-select="false"
          :options="tags"
          @select="selectToggle"
          @deselect="removeToggle"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Multiselect from "@vueform/multiselect/src/Multiselect";
const dbTags = collection(db, "tags");

export default {
  name: "NewShift",
  data() {
    return {
      repeating: false,
      tags: [],
      selectedTags: [],
    };
  },

  components: { Multiselect },

  async mounted() {
    const tagsQuery = await getDocs(dbTags);
    tagsQuery.forEach((doc) => {
      this.tags.push(doc.data().tag);
    });
  },
};
</script>

<style scoped>
.information-wrapper {
  z-index: 99;
  background-color: rgb(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.newshift-popup {
  background-color: white;
  border-radius: 20px;
  width: 50%;
  min-height: 500px;
  flex-direction: row;
  align-items: center;
  /* gap: 20px; */
  padding: 30px;
  position: relative;
  max-width: 400px;
  min-width: 300px;
}

.new-schedule {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 0.6;
  padding: 0px 30px 0px 30px;
}

input {
  padding: 7px 12px 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  overflow: hidden;
}

.time-input {
  display: flex;
}

.column {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.header-wrapper {
  display: flex;
  justify-content: center;
  text-align: center;
}

.header h2 {
  font-size: 34px;
  margin-bottom: 5px;
}

.header p {
  font-size: 18px;
  margin-top: 0px;
}

.add-button {
  background-color: buttonface;
  border-radius: 3px;
  padding: 4px 6px;
  cursor: pointer;
}

.add-button:hover {
  background-color: var(--yellow-tone-1);
}

label {
  margin-top: 20px;
}
</style>