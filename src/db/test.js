import {collection, onSnapshot, query, where} from "firebase/firestore";
import {ref} from "vue";
import {db} from "@/firebase";

const dbShifts = collection(db, "shifts")
const dbEmployeeTag = collection(db, "employeeTag")
const dbBranchEmployee = collection(db, "branchEmployee")

export const fetchBranches = (employeeID) => {
    const branchID = ref([])
	const branchQuery = query(dbBranchEmployee, where("employeeID", "==", employeeID))

    const unsubscribe = onSnapshot(branchQuery, (querySnapshot) => {
        branchID.value = querySnapshot.docs.map((doc) => {
            return doc.data().branchID
          })
        })

	// returns a list of changing "branchID" array
    return [unsubscribe, branchID]
}

export const fetchTags = (employeeID) => {
    const tagNames = ref([])
	const tagQuery = query(dbEmployeeTag, where("employeeID", "==", employeeID))
    const unsubscribe = onSnapshot(tagQuery, (querySnapshot) => {
        tagNames.value = querySnapshot.docs.map((doc) => {
            return doc.data().tagName
        })
    })

	// returns a live "tags" array
    return [unsubscribe, tagNames]
}

export const filterShifts = (branchNames, tags, startDate, endDate=null) => {
	//date filter
	let q = query(dbShifts, where("date", ">=", startDate))
	if (endDate !== null) {
		q = query(q, where("date", "<=", endDate))
	}

	// branch filter
    if (branchNames.length > 0) {q = query(q, where("branch", "in", branchNames))}	

	// tag filter
	tags.forEach((tag) => {
		q = query(q, where(`manpower.${tag}`, ">=", `filledManpower.${tag}`))
	})

	const shifts = ref([])
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
        shifts.value = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
            'employeeID': data.employeeID,
            'tagName': data.tagName
        }})
    })

    //snapshot listener receives a new query snapshot whenever query result changes
    return [unsubscribe, shifts]
}

export const filterShift = (shifts, branchNames, tags, startDate, endDate=null, assigned, userID) => {
    let filteredShifts = shifts.filter((shift) => {
        let result = true
        //filter by startDate & endDate
        if (shift.date <= startDate) {
            return false
        }
        if (endDate !== null && shift.date >= endDate) {
            return false
        }
        if (!branchNames.includes(shift.branch)) {
            return false
        }
        //filter by whether shift has been fully assigned
        let tempResult = false
        tags.forEach((tag) => {
            if (shift.filledManpower[tag] < shift.manpower[tag]) {
                tempResult = true
            }
        })
        result = tempResult
        //filter by whether shift has already been assigned to employee
        assigned.forEach((assign) => {
            if (shift.id == assign.shiftID && userID == assign.employeeID) {
                result = false
            }
        })
        return result
    })

    return filteredShifts
}

export const availShift = (filteredShifts, available, userID) => {
    let availShifts = filteredShifts.filter((shift) => {
        let result = false
        available.forEach((avail) => {
            if (shift.id == avail.shiftID && userID == avail.employeeID) {
                result = true
            }
        })
        return result
    })
    return availShifts
}