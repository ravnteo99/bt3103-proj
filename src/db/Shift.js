import { ref } from 'vue';
import { db } from "@/firebase"
import { collection, query, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "shifts"));

const fetchShifts = () => {
    const shifts = ref([])
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
                'manpower': shift.manpower
            }
        })
    })

    return [unsubscribe, shifts]
}

export const filterShiftAvailability = (shiftID, assignedEmployeeIDs) => {

}

export const filterShiftAssignee = (shiftID) => {

}

export const [unsubscribe, shifts] = fetchShifts()
