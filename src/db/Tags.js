import {collection, onSnapshot, query, where, getDocs, deleteDoc, addDoc} from "firebase/firestore";
import {db} from "@/firebase";
import { ref} from "vue";

const dbEmployeeTag = collection(db, "employeeTag")
const tagQuery = query(dbEmployeeTag)

export const fetchTags = () => {
    const tags = ref([])
    const unsubscribe = onSnapshot(tagQuery, (querySnapshot) => {
        tags.value = querySnapshot.docs.map((doc) => {
            const data = doc.data()
            return {
                'employeeID': data.employeeID,
                'tagName': data.tagName
            }
        })
    })

    return [unsubscribe, tags]
}

export const removeTag = async (employeeID, tagName) => {
    const q = query(tagQuery,
        where("employeeID", "==", employeeID),
        where("tagName", "==",  tagName)
    )

    const querySnapShot = await getDocs(q)
    querySnapShot.forEach((doc) => {
      deleteDoc(doc.ref)
    });
}

export const addTag = async (employeeID, tagName) => {
    await addDoc(dbEmployeeTag, {
        'employeeID': employeeID,
        'tagName': tagName
    })
}

export const [unsubTag, tags] = fetchTags()
