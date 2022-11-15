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
                // hacky way to retrieve date out of firestore timestamp
                'date': new Date(shift.startTime.seconds*1000).toDateString(),
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

// export const filterShiftAvailability = (shiftID, assignedEmployeeIDs) => {

// }

// export const filterShiftAssignee = (shiftID) => {

// }

export const [unsubShift, shifts] = fetchShifts();
export const [unsubAvailable, availability] = fetchAvailability();
export const [unsubAssignment, assignment] = fetchAssignment();