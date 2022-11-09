<template>
  <div class="information-wrapper">
    <div class="employee-popup">

      <!-- cross icon on top right-->
      <font-awesome-icon
          icon="fa-solid fa-x"
          class="cross-icon"
          @click="this.$emit('togglePopup')"
      />

      <div class="header-wrapper">
        <div class="header">
          <img :src="require(`@/assets/${employee.firstName}.svg`)" alt="profile picture">
          <h2> {{ employee.fullName }} </h2>
          <p> {{ employee.emailAddress }} </p>
          <div class="user-tag">
            <p v-for="tag in employee.tags" :class="tag" :key="tag">
              {{ tag }}
              <span class="remove-class-button"><font-awesome-icon icon="fa-solid fa-x fa-2xs" /></span>
            </p>
            <span class="add-button"><font-awesome-icon icon="fa-solid fa-plus" /></span>
          </div>
        </div>
      </div>

      <form class="personal-information">
        <label for="emailAddress">Email Address</label>
        <input type="text" name="emailAddress" :value="employee.emailAddress" disabled>
        <label for="address">Address</label>
        <input type="text" name="address" :value="employee.address1" disabled>
        <input type="text" name="address" :value="employee.address2" disabled>
        <input type="text" name="address" :value="employee.address3" disabled>
        <label for="contactNumber">Contact Number</label>
        <input type="text" name="contactNumber" :value="employee.contactNo" disabled>
        <label for="branches">Branches</label>
        <branch-filter
          :branchOptions="branchOptions"
          :employeeID="employee.id"
        />

        <div class="button-wrapper custom-action-row">
          <button class="action-button done" type="button" @click="this.$emit('togglePopup')">Done</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import BranchFilter from "@/components/BranchFilter";

export default {
  name: "EmployeePopup",
  components: { BranchFilter },
  props: ["employee", "branches", "branchOptions"],
  emits: ["togglePopup"],
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
    min-height: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 30px;
    position: relative;
    max-width: 700px;
    min-width: 600px;
  }

  .cross-icon {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
  }

  input {
    padding: 7px 12px 6px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    overflow: hidden;
  }

  .header-wrapper {
    display: flex;
    justify-content: center;
    text-align: center;
    flex: .4;
    padding-left: 30px;
  }

  .header h2 {
    font-size: 34px;
    margin-bottom: 5px;
  }

  .header p {
    font-size: 18px;
    margin-top: 0px;
  }

  .user-tag {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  .user-tag p {
    border-radius: 5px;
    font-weight: bold;
    padding: 3px;
    width: 150px;
    margin-bottom: 0px;
    position: relative;
  }

  .user-tag p span {
    font-size: 15px;
    width: 10%;
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .user-tag p span:hover {
    background-color: #d1d5db;
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
    justify-content: flex-end;
  }

  .done:hover {
    background-color: var(--yellow-tone-3);
  }
</style>