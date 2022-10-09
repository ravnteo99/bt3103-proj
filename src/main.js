import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueTextAreaAutosize from "vue-textarea-autosize";
import firebase from "firebase/app";
import "firebase/firestore";

loadFonts();

firebase.initializeApp({
	apiKey: "AIzaSyBwT7mzK-SZdOHvvx2ECPqd7f_iLnHOej0",
	authDomain: "bt3103-job-scheduler.firebaseapp.com",
	projectId: "bt3103-job-scheduler",
	storageBucket: "bt3103-job-scheduler.appspot.com",
	messagingSenderId: "649357689559",
	appId: "1:649357689559:web:c793e04be2bcc7ac15e692",
	measurementId: "G-W9PLYBCNKC",
});

export const db = firebase.firestore();

createApp(App).use(vuetify).use(VueTextAreaAutosize).mount("#app");
