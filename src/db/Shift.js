import { ref } from 'vue';
import { db } from "@/firebase"
import { collection, query, onSnapshot } from "firebase/firestore";

const queryShift = query(collection(db, "shifts"));
const queryAvailability = query(collection(db, "employeeAvailability"));
const queryAssignments = query(collection(db, "employeeAssignments"));

const fetchShifts = () => {
    const shifts = ref([])
    const unsubscribe = onSnapshot(queryShift, (querySnapshot) => {
        shifts.value = querySnapshot.docs.map((doc) => {
            const shift = doc.data()
            return {
                'id': doc.id,
                'title': shift.title,
                'date': shift.date,
                'startTime': shift.startTime,
                'endTime': shift.endTime,
                'branch': shift.branch,
                'manpower': shift.manpower,
                'filledManpower': shift.filledManpower
            }
        })
    })

    return [unsubscribe, shifts]
}

const fetchAvailability = () => {
    const availability = ref([])
    const unsubscribe = onSnapshot(queryAvailability, (querySnapshot) => {
        availability.value = querySnapshot.docs.map((doc) => {
            const available = doc.data()
            return {
                'id': doc.id,
                'employeeID': available.employeeID,
                'shiftID': available.shiftID,
            }
        })
    })

    return [unsubscribe, availability]
}

const fetchAssignment = () => {
    const assignment = ref([])
    const unsubscribe = onSnapshot(queryAssignments, (querySnapshot) => {
        assignment.value = querySnapshot.docs.map((doc) => {
            const assign = doc.data()
            return {
                'id': doc.id,
                'employeeID': assign.employeeID,
                'shiftID': assign.shiftID,
            }
        })
    })

    return [unsubscribe, assignment]
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

export const [unsubShift, shifts] = fetchShifts();
export const [unsubAvailable, availability] = fetchAvailability();
export const [unsubAssignment, assignment] = fetchAssignment();