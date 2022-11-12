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
      <form class="new-schedule" @submit.prevent="">
        <label for="title">Title</label>
        <input type="text" name="title" v-model="title" />

        <label v-if="repeating" for="repeatedDays">Repeats Every</label>
        <Multiselect
          v-if="repeating"
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
        <input
          v-if="repeating"
          type="date"
          name="startDate"
          v-model="startDate"
        />
        <label v-if="repeating" for="endDate">Ends On</label>
        <input v-if="repeating" type="date" name="endDate" v-model="endDate" />

        <label v-if="!repeating" for="date">Date</label>
        <input v-if="!repeating" type="date" name="date" v-model="date" />

        <div class="multi-input">
          <div class="column">
            <label for="startTime">Time In</label>
            <input type="time" name="startTime" v-model="startTime" />
          </div>
          <div class="column">
            <label for="endTime">Time Out</label>
            <input type="time" name="endTime" v-model="endTime" />
          </div>
        </div>
        <label for="manpower">Manpower</label>
        <Multiselect
          v-model="selectedTags"
          mode="tags"
          placeholder="Select Manpower"
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
          <input
            class="manpower-qty"
            type="number"
            name="{{tag}}"
            v-model="manpower[tag]"
          />
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
import { collection, getDocs, addDoc } from "firebase/firestore";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import dayjs from "dayjs";
const dbTags = collection(db, "tags");

export default {
  name: "NewShift",
  data() {
    return {
      repeating: false,
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectedDays: [],
      tags: [],
      selectedTags: [],
      manpower: {
        Clerk: 1,
        Barista: 1,
        Cashier: 1,
      },
      startDate: "",
      endDate: "",
      dayIndex: {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 0,
      },
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
    async createShift() {
      let manpower = {};

      for (let i = 0; i < this.selectedTags.length; i++) {
        const tag = this.selectedTags[i];
        manpower[tag] = this.manpower[tag];
      }

      if (!this.repeating) {
        this.pushData(manpower);
      } else {
        this.selectedDays.forEach((day) => {
          const dayIndex = this.dayIndex[day];
          const startDate = this.startDate;
          const endDate = dayjs(this.endDate).add(1, "day");
          const startIndex = dayjs(startDate).day();
          let nextDay;
          if (startIndex <= dayIndex) {
            nextDay = dayjs(startDate);
          } else {
            nextDay = dayjs(startDate).add(7 - startIndex + dayIndex, "day");
          }
          while (nextDay.isBefore(endDate)) {
            this.pushRepeatedData(manpower, nextDay.format("YYYY-MM-DD"));
            nextDay = nextDay.add(7, "day");
          }
        });
      }
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

    async pushData(manpower) {
      try {
        const docRef = await addDoc(collection(db, "shifts"), {
          title: this.title,
          branch: "Ang Mo Kio", // to be changed
          date: this.date,
          startTime: this.startTime.replace(":", ""),
          endTime: this.endTime.replace(":", ""),
          manpower: manpower,
        });
        console.log("Document written with ID: ", docRef);
      } catch (error) {
        console.error(error);
      }
    },

    async pushRepeatedData(manpower, date) {
      try {
        console.log("test");
        const docRef = await addDoc(collection(db, "shifts"), {
          title: this.title,
          branch: "Ang Mo Kio", // to be changed
          date: date,
          startTime: this.startTime.replace(":", ""),
          endTime: this.endTime.replace(":", ""),
          manpower: manpower,
        });
        console.log("Document written with ID: ", docRef);
      } catch (error) {
        console.error(error);
      }
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
  width: 40px;
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