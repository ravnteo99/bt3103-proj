import { ref } from 'vue';
import { db } from "@/firebase"
import {collection, query, onSnapshot, where, getDocs, doc, getDoc, addDoc, deleteDoc} from "firebase/firestore";

const db_shifts = collection(db, "shifts")
const shiftQuery = query(db_shifts);
const db_eAssignment = collection(db, "employeeAssignments")
const db_eAvailability = collection(db, "employeeAvailability")

const fetchShifts = () => {
    const shifts = ref([])
    const unsubscribe = onSnapshot(shiftQuery, (querySnapshot) => {
        shifts.value = querySnapshot.docs.map((doc) => {
            const shift = doc.data()
            return {
                'id': doc.id,
                'title': shift.title,
                // hacky way to retrieve date out of firestore timestamp
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

export const filterShiftAvailability = async (shiftID) => {
    const AssignmentQuery = query(
        db_eAssignment,
        where("shiftID", "==", shiftID)
    )

    // no need to subscribe a listener for this
    const querySnapshot = await getDocs(AssignmentQuery)
    const assignedWorkers = querySnapshot.docs.map((doc) => {
        const assignment = doc.data()
        return assignment.employeeID
    })

    let availabilityQuery = query(
        db_eAvailability,
        where("shiftID", "==", shiftID)
    )

    if (assignedWorkers.length > 0) {
        availabilityQuery = query(availabilityQuery, where("employeeID", "not-in", assignedWorkers))
    }

    const availableWorkers = ref([])
    const unsubscribe = onSnapshot(availabilityQuery, (snapShot) => {
        availableWorkers.value = snapShot.docs.map((doc) => {
            return doc.data().employeeID
        })
    })

    return [unsubscribe, availableWorkers]
}

export const getShift = async (shiftID) => {
    const docRef = doc(db, "shifts", shiftID);
    const docSnap = await getDoc(docRef);

    return docSnap.data()
}

export const filterShiftAssignee = (shiftID) => {
    const assigneeIDs = ref([])
    const AssignmentQuery = query(db_eAssignment, where("shiftID", "==", shiftID))
    const unsubscribe = onSnapshot(AssignmentQuery, (querySnapshot) => {
        assigneeIDs.value = querySnapshot.docs.map((doc) => {
            const assignment = doc.data()
            return assignment.employeeID
        })
    })

    return [unsubscribe, assigneeIDs]
}

export const createAssignment = async (shiftID, employeeID) => {
    const q = query(db_eAssignment,
        where("employeeID", "==", employeeID),
        where("shiftID", "==", shiftID)
    );

    const querySnapshot = await getDocs(q);
    // this employee has not been assigned the shift
    if (querySnapshot.empty) {
        await addDoc(db_eAssignment, {
          employeeID: employeeID,
          shiftID: shiftID
        });
    }
}

export const deleteAssignment = async (shiftID, employeeID) => {
    // check if workers moved to "availableWorkers" have been assigned a shift
    const q = query(db_eAssignment,
        where("employeeID", "==", employeeID),
        where("shiftID", "==", shiftID)
    );

    const querySnapshot = await getDocs(q);
    // this employee has been assigned a shift
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref)
        });
    }
}

export const [unsubscribe, shifts] = fetchShifts()
