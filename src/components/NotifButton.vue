<template>
    <p>{{this.fname}}</p>
    <div class="profile"><MyProfile /></div>
    <div class="signout"><SignOut /></div>
</template>

<script>
import { firebaseApp } from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import MyProfile from "@/components/MyProfile.vue"
import SignOut from "@/components/SignOut.vue"

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    name: 'NotifButton',
    components: {
        MyProfile,
        SignOut
    },
    data() {
        return {
            fname: "",
        }
    },
    created() {
        this.fetchItems()
    },
    methods: {
        async fetchItems() {
            const docSnap = await getDoc(doc(db, 'employee', auth.currentUser.uid))
            if (docSnap.exists()) {
                this.fname = docSnap.data().firstName
                console.log(docSnap.data())
            } else {
                console.log('Document does not exist')
            }
        }
    }
}
</script>

<style scoped>
p {
    font-weight: bold;
    margin-bottom: 0px;
}
.profile {
    margin-bottom: -10px;
}
</style>