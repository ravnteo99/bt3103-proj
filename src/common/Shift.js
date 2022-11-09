import { ref } from 'vue';
import { db } from "@/firebase"
import { collection, query, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "shift"));

export const fetchShifts = () => {
    const shifts = ref([])
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        shifts.value = querySnapshot.docs.map((doc) => (doc.data().branch))
    })

    return [unsubscribe, shifts]
}
