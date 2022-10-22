import {initializeApp} from 'firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyBwT7mzK-SZdOHvvx2ECPqd7f_iLnHOej0",
  authDomain: "bt3103-job-scheduler.firebaseapp.com",
  projectId: "bt3103-job-scheduler",
  storageBucket: "bt3103-job-scheduler.appspot.com",
  messagingSenderId: "649357689559",
  appId: "1:649357689559:web:c793e04be2bcc7ac15e692",
  measurementId: "G-W9PLYBCNKC"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

//---- save to firestore ------
function savetofs(){
  var a = document.getElementById("email").value
  var b = document.getElementById("name").value
  var c = document.getElementById("address").value
  var d = document.getElementById("contactInfo").value

  alert("Hello " + a + " we have saved your information")

  db.collection("employeeInfo").doc(a).set({
      Email: a,
      Name :b,
      Address:c,
      ContactNo:d
  })
  .then((docRef)=>{
      console.log(docRef)
      window.location.reload()
  })
  .catch((error)=>{
      console.error("Error adding document: ", error);
  });
      }