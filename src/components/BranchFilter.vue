<template>
  <Multiselect
      v-model="selectedBranch"
      mode="tags"
      placeholder="Select Branches"
      track-by="value"
      label="value"
      :close-on-select="false"
      :options="branchOptions"
      @select="selectToggle"
      @deselect="removeToggle"
    />
<!--  @deselect="removeToggle"-->
<!--      @clear="removeToggle"-->

<!--  Modal component  -->
    <ConfirmationMessage
        v-if="showConfirmation"
        msg="Would you like to confirm your edits?"
        @closeMessage="closeMessage"
        @confirmEdit="confirmEditFn"
    />
</template>

<script>
import Multiselect from '@vueform/multiselect'
import ConfirmationMessage from "@/modals/ConfirmationMessage";

import { db } from "@/firebase"
import { collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
const dbBranch = collection(db, "branch");
const dbBranchEmployee = collection(db, "branchEmployee")

export default {
  name: "BranchFilter",
  components: { Multiselect, ConfirmationMessage },
  props: ["employeeID", "branches", "branchOptions"],
  emits: ['removeBranch'],
  data() {
    return {
      selectedBranch: [],
      showConfirmation: false,
      selectedOption: "",
      removedOption: ""
    }
  },
  mounted() {
    const employeeBranch = []
    this.branches.forEach((branch) => {
      const branchNames = branch.branchName
      branchNames.forEach((name) => {
        employeeBranch.push(name)
      })
    })
    this.selectedBranch = employeeBranch
  },
  methods: {
    selectToggle(selectedOption) {
      this.showConfirmation = true
      this.selectedOption = selectedOption
    },
    removeToggle(removedOption) {
      this.showConfirmation = true
      this.removedOption = removedOption
    },
    confirmEditFn() {
      if (this.selectedOption !== "") {
        // add new branch to employee
        this.assignBranch(this.selectedOption)

        // // changes data to re-render EmployeePopup
        // const employeeData = {
        //   "employeeID": this.employeeID,
        //   "addedBranchName": this.selectedOption
        // }
        // this.$emit('addBranch', employeeData)
        this.selectedOption = ""
      } else if (this.removedOption !== "") {
        // remove employee from a branch
        this.removeBranch(this.removedOption)

        // // changes data to re-render EmployeePopup
        // const employeeData = {
        //   "employeeID": this.employeeID,
        //   "removedBranchName": this.selectedOption
        // }
        // this.$emit('removeBranch', employeeData)
        this.$emit('removeBranch')
        this.removedOption = ""
      }

      this.showConfirmation = false
    },
    closeMessage(lastSelected) {
      this.showConfirmation=false
      // remove the last selected branch from input box
      this.selectedBranch = this.selectedBranch.filter((branch) => {
        return (branch !== lastSelected)
      })
    },
    async assignBranch(branchName) {
      const branchID = await this.getBranchID(branchName)

      // Assign employee to new branch
      await addDoc(dbBranchEmployee, {
        branchID: branchID,
        employeeID: this.employeeID
      });
    },
    async removeBranch(branchName) {
      const branchID = await this.getBranchID(branchName)
      const employeeQuery = await getDocs(query(dbBranchEmployee,
          where("branchID", "==", branchID),
          where("employeeID", "==", this.employeeID)
      ))

      // remove employee from a branch
      employeeQuery.forEach((doc) => {
        deleteDoc(doc.ref)
      })
    },
    async getBranchID(branchName) {
      const branchQuery = await getDocs(query(dbBranch, where("name", "==", branchName)))
      let branchID = ""
      branchQuery.forEach((doc) => {
        branchID = doc.id
      });
      return branchID
    }
  },
}
</script>

<style src="../../node_modules/@vueform/multiselect/themes/default.css">

</style>