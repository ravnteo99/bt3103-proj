<template>
  <div class="information-wrapper">
    <div class="employee-popup">
      <div class="header-wrapper">
        <div class="header">
          <img :src="require(`@/assets/${employee.firstName}.svg`)" alt="profile picture">
          <h2> {{ employee.fullName }} </h2>
          <p> {{ employee.emailAddress }} </p>
        </div>
      </div>

      <form class="personal-information">
        <label for="emailAddress">Email Address</label>
        <input type="text" name="emailAddress" :value="employee.emailAddress" disabled>
        <label for="address">Address</label>
        <input type="text" name="address" :value="employee.emailAddress" disabled>
        <input type="text" name="address" :value="employee.emailAddress" disabled>
        <input type="text" name="address" :value="employee.emailAddress" disabled>
        <label for="contactNumber">Contact Number</label>
        <input type="text" name="contactNumber" :value="employee.emailAddress" disabled>

        <div class="button-wrapper custom-action-row">
          <button class="action-button" type="button" @click="this.$emit('togglePopup')">Cancel</button>
          <button class="action-button done" type="button" @click="this.$emit('togglePopup'), updateTagBranches()">Save</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeePopup",
  props: ["employee"],
  methods: {
    updateTagBranches() {
      console.log("hi")
    }
  }
}
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

  .employee-popup {
    background-color: white;
    border-radius: 20px;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
  }

  input {
    padding: 7px 12px 6px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
  }

  .header-wrapper {
    display: flex;
    justify-content: center;
    text-align: center;
    flex: .4;
  }

  .header h2 {
    font-size: 34px;
    margin-bottom: 5px;
  }

  .header p {
    font-size: 18px;
    margin: 0px;
  }

  img {
    border-radius: 100%;
  }

  .personal-information {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: .6;
    padding-right: 30px;
  }

  label {
    margin-top: 20px;
  }

  .custom-action-row {
    margin-top: 20px;
    justify-content: center;
  }

  .action-button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>