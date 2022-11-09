<template>
  <h1 class="section-title">Available Employees <span>{{ filteredEmployees.length }} </span></h1>
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

    <select name="branch" id="branch" class="branch-filter input-field" v-model="selectedBranch">
      <option value="" selected>All branches</option>
      <option v-for="branch in branches" :value="branch" :key="branch.name"> {{ branch.name }} </option>
    </select>

  </div>
  <div class="employee-wrapper">
      <EmployeeCard
        v-for="employee in filteredEmployees"
        class="employee-card"
        :key="employee.firstName"
        :full-name="employee.fullName"
        :tags="employee.tags"
        :email-address="employee.emailAddress"
        :profile-link="require(`@/assets/${employee.firstName}.svg`)"
        @click="toggleModal(employee)"
    />
  </div>

  <!--  Modal Component-->
  <EmployeePopup
        v-if="lastClick"
        :employee="lastClick"
        :branch-options="branchOptions"
        @togglePopup="this.lastClick=null"
    />
</template>

<script>
import EmployeeCard from "@/components/EmployeeCard";
import EmployeePopup from "@/modals/EmployeePopup";
import { fetchBranches, fetchEmployees } from "@/common/Employee";

export default {
  name: "EmployeeDatabase",
  components: { EmployeePopup, EmployeeCard },
  data() {
    return {
      unsubscribeListener: [],
      employees: [],
      employeeBranches: [],
      employeeTags: [],
      branches: [],
      employeeSearch: "",
      selectedBranch: "",
      lastClick: null,
    }
  },
  created() {
    const [unsubscribeEmployee, employees] = fetchEmployees()
    const [unsubscribeBranch, branches] = fetchBranches()
    this.employees = employees
    this.branches = branches
    this.unsubscribeListener.push(unsubscribeBranch, unsubscribeEmployee)
  },
  unmounted() {
    this.unsubscribeListener.forEach((callback) => {
      callback()
    })
  },
  computed: {
    filteredEmployees() {
      const result = this.employees.filter(employee => {
        return employee.fullName.toLowerCase().includes(this.employeeSearch)
      })

      if (this.selectedBranch !== "") {
        let branchID = this.selectedBranch.id

        // only return employees from this branch
        const allowedEmployees = []
        this.employeeBranches.filter(assignment => {
          if (assignment.branchID === branchID) {
            allowedEmployees.push(assignment.employeeID)
          }
        })

        const newResults = result.filter(employee => {
          return allowedEmployees.includes(employee.id)
        })
        return newResults
      }

      return result
    },
    branchOptions() {
      const result = []
      this.branches.forEach((branch) => {
        result.push({"id": branch.id, "value": branch.name})
      })

      return result
    }
  },
  methods: {
    clearSearchBar() {
      this.employeeSearch = ""
    },
    toggleModal(employee) {
      this.lastClick = employee
    },
  }
}
</script>

<style scoped>
  .employee-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
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
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 30px;
  }

  .branch-filter {
    min-width: 200px;
    max-width: 250px;
  }
</style>