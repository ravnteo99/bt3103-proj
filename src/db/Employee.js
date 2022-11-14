import { ref } from 'vue';
import { db } from "@/firebase"
import {collection, query, onSnapshot, where, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const employeeQuery = query(collection(db, "employee"))
const branchColRef = collection(db, "branch")
const branchQuery = query(branchColRef)
const dbBranchEmployee = collection(db, "branchEmployee")

const fetchEmployees = () => {
    const employees = ref([])
    const unsubscribe = onSnapshot(employeeQuery, (querySnapshot) => {
        employees.value = querySnapshot.docs.map((doc) => {
            const employee = doc.data()
            return {
              "id": doc.id,
              "firstName": employee.firstName,
              "fullName": `${employee.firstName} ${employee.lastName}`,
              "emailAddress": employee.emailAddress,
              "contactNo": employee.contactNo,
              "address1": employee.address1,
              "address2": employee.address2,
              "address3": employee.address3,
            }
          })
        })

    return [unsubscribe, employees]
}

const fetchBranches = () => {
    const branches = ref([])
    const unsubscribe = onSnapshot(branchQuery, (querySnapshot) => {
        branches.value = querySnapshot.docs.map((doc) => {
            const branch = doc.data()
            return {"id": doc.id, "name": branch.name}
          })
        })

    return [unsubscribe, branches]
}

const fetchAssignments = () => {
    const assignments = ref([])
    const q = query(dbBranchEmployee)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        assignments.value = querySnapshot.docs.map((doc) => {
            const assignment = doc.data()
            return {"id": doc.id, "branchID": assignment.branchID, "employeeID": assignment.employeeID}
          })
        })

    return [unsubscribe, assignments]
}

export const fetchBranchAssignment = (employeeID, branchOptions) => {
    const employeeBranch = ref([])
    const q = query(dbBranchEmployee, where("employeeID", "==", employeeID))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        employeeBranch.value = querySnapshot.docs.map((doc) => {
            const branchID = doc.data().branchID
            // only going to return one value
            const branchNames = branchOptions.filter((branch) => {
              return branch.id === branchID;
            })
            return branchNames[0].value
          })
        })

    return [unsubscribe, employeeBranch]
}

export const createBranchAssignment = async (employeeID, branchID) => {
    await addDoc(dbBranchEmployee, {
      employeeID: employeeID,
      branchID: branchID
    });
}

export const removeBranchAssignment = async (employeeID, branchID) => {
    const employeeQuery = await getDocs(query(dbBranchEmployee,
          where("branchID", "==", branchID),
          where("employeeID", "==", employeeID)
      ))

      // remove employee from a branch
      employeeQuery.forEach( (doc) => {
        deleteDoc(doc.ref)
      })
}


export const [unsubEmployee, employees] = fetchEmployees()
export const [unsubBranch, branches] = fetchBranches()
export const [unsubAssignments, assignments] = fetchAssignments()
