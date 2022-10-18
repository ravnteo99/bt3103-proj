<template>
  <h1 class="section-title">Available Employees <span>{{ employeeCount }} </span></h1>
  <div class="filter-wrapper">
    <form @submit.prevent="" class="search-bar">
      <input class="input-field"
             type="text"
             v-model="employeeSearch"
             placeholder="Search employees by name"
      >
      <font-awesome-icon
          icon="fa-solid fa-x"
          class="cross-icon"
          v-if="employeeSearch.length > 0"
          @click="clearSearchBar"
      />
    </form>
    <BranchFilter class="branch-filter"/>
  </div>

  <div class="employee-wrapper">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.firstName"
        :first-name="employee.firstName"
        :last-name="employee.lastName"
        :tag="employee.tag"
        :email-address="employee.emailAddress"
        :profile-link="require(`@/assets/${employee.firstName}.svg`)"
    />
  </div>
</template>

<script>
import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore";
import EmployeeCard from "@/components/EmployeeCard";
import BranchFilter from "@/views/BranchFilter";

export default {
  name: "EmployeeDatabase",
  components: { EmployeeCard, BranchFilter },
  data() {
    return {
      employees: [],
      employeesPlaceholder: [],
      employeeSearch: "",
      branchFilter: [],
      tags: [
          "Cashier", "Barista", "Clerk"
      ],
    }
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "employee"));
    querySnapshot.forEach((doc) => {
      const employee = doc.data()
      this.employees.push({
        "firstName": employee.firstName,
        "lastName": employee.lastName,
        "tag": employee.tag,
        "emailAddress": employee.emailAddress
      })
    });
    this.employeesPlaceholder = this.employees
  },
  computed: {
    employeeCount() {
      return this.employees.length
    },
  },
  methods: {
    clearSearchBar() {
      this.employeeSearch = ""
    }
  }
}
</script>

<style scoped>
  .employee-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  h1 span {
    color: #808080;
    font-weight: normal;
    font-size: 20px;
    margin-left: 10px;
  }

  .search-bar {
    position: relative;
    min-width: 300px;
    max-width: 400px;
    width: 50%;
    display: flex;
    align-items: center;
  }

  .cross-icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }

  .input-field {
    border: 1px solid #d1d5db;
    border-radius: 4px;
    width: 100%;
    padding: 7px 12px 6px 12px;
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  .input-field:focus, .input-field:active {
    box-shadow: 0 0 0 3px var(--yellow-tone-1);
  }

  .filter-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 30px;
    width: 700px;
  }

  .branch-filter {
    min-width: 300px;
    max-width: 400px;
    width: 300px;
  }
</style>