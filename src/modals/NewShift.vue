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
      <div class="btn-group">
        <button id="onetimebtn" @click="selectOneTime">One-Time</button>
        <button id="repeatingbtn" @click="selectRepeating">Repeating</button>
      </div>
      <form class="new-schedule">
        <label for="title">Title</label>
        <input type="text" name="title" />

        <label v-if="repeating" for="repeatedDays">Repeats Every</label>
        <Multiselect v-if="repeating"
          v-model="selectedDays"
          mode="tags"
          placeholder="Select Days"
          track-by="value"
          label="value"
          :close-on-select="false"
          :options="days"
          @select="selectToggle"
          @deselect="removeToggle"
        />

        <label v-if="repeating" for="startDate">Starts From</label>
        <input v-if="repeating" type="date" name="startDate" />
        <label v-if="repeating" for="endDate">Ends On</label>
        <input v-if="repeating" type="date" name="endDate" />

        <label v-if="!repeating" for="date">Date</label>
        <input v-if="!repeating" type="date" name="date" />

        <div class="multi-input">
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
          v-model="selectedTags"
          mode="tags"
          placeholder="Select Branches"
          track-by="value"
          label="value"
          :close-on-select="false"
          :options="tags"
          @select="selectToggle"
          @deselect="removeToggle"
        />
        <label>Manpower Detail</label>

        <div v-if="selectedTags.length == 0"><br /></div>

        <ol v-for="tag in selectedTags" :key="tag">
          <input class="manpower-qty" type="text" name="{{tag}}" />
          <font-awesome-icon icon="fa-user" class="fa-user" />
          <label for="{{tag}}"> x {{ tag }}</label>
        </ol>
        <div class="button-wrapper custom-action-row">
          <button class="action-button done" type="button" @click="createShift">
            Publish
          </button>
        </div>
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
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      selectedDays: [],
      tags: [],
      selectedTags: [],
      Clerk: 0,
      Barista: 0,
      Cashier: 0,
    };
  },

  components: { Multiselect },

  async mounted() {
    const tagsQuery = await getDocs(dbTags);
    tagsQuery.forEach((doc) => {
      this.tags.push(doc.data().tag);
    });
  },

  methods: {
    createShift() {
      console.log("test1");
    },

    selectOneTime() {
      const onetimebtn = document.getElementById("onetimebtn");
      onetimebtn.style.backgroundColor = "rgb(248, 213, 126)";

      const repeatingbtn = document.getElementById("repeatingbtn");
      repeatingbtn.style.backgroundColor = "white";

      this.repeating = false;
    },

    selectRepeating() {
      const onetimebtn = document.getElementById("onetimebtn");
      onetimebtn.style.backgroundColor = "white";

      const repeatingbtn = document.getElementById("repeatingbtn");
      repeatingbtn.style.backgroundColor = "rgb(248, 213, 126)";

      this.repeating = true;
    },
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

.multi-input {
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

.done:hover {
  background-color: var(--yellow-tone-3);
}

label {
  margin-top: 20px;
}

ol {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.fa-user {
  margin: 0px 5px 0px 5px;
}

.manpower-qty {
  width: 20px;
  margin: 0px 5px 0px 5px;
}

.custom-action-row {
  margin-top: 20px;
  justify-content: flex-end;
}

.btn-group {
  margin: 0 auto;
  width: 80%;
}

#onetimebtn {
  background-color: rgb(248, 213, 126);
}

.btn-group button {
  width: 50%;
  background-color: white;
  padding: 10px 24px;
  cursor: pointer;
  float: left;
}

.btn-group button:not(:last-child) {
  border-right: none;
}
</style>