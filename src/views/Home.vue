<template>
    <div class="main">
        <div class="navbar">
            
            <div id="appName"> Cool app name</div>
            <div class="navBar">
            <button id="homeButton" type="button" onclick="homeDirFunc()" style='font-size: 18px'><i class='fas fa-home'></i>&nbsp; &nbsp; Home</button><br><br>
            <button id="availButton" type="button" @click="$router.push('availability')" style='font-size: 18px'><i class='fas fa-briefcase'></i>&nbsp; &nbsp; Availability</button><br><br>
            <button id="timetableButton" type="button" onclick="timetableDirFunc()" style='font-size: 18px'><i class='far fa-calendar-alt'></i>&nbsp; &nbsp; Timetable</button><br><br>
            <button id="settingsButton" type="button" @click="$router.push('setting')" style='font-size: 18px'><i class='fas fa-cog'></i>&nbsp; &nbsp; Settings</button>
            </div>

        </div>
    </div>
  </template>
<script>
import {ref} from "vue";
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged} from "firebase/auth";


const auth = getAuth(firebaseApp);
const isLoggedIn = ref(true);

onAuthStateChanged(auth, function(user) {
    if (user) {
        isLoggedIn.value = true
    } else {
        isLoggedIn.value = false
    }
})


  export default {
      data() {
          return {
          }
      },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
 .navbar{
    width: 20%;
    height: 100%;
    float: left;
    padding-left: 10px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 800;
    font-size: 18px;
    line-height: 18px;

}

#homeButton, #availButton, #timetableButton, #settingsButton{
    background-color: white;
    text-align: left;
    height:45px;
    width:180px;
    border: none;
    background: none;
    border-radius: 12px;
    transition-duration: 0.4s;
}

#homeButton:hover, #availButton:hover, #timetableButton:hover, #settingsButton:hover{
    background-color: #F8D57E;
    height:45px;
    width:180px
}

#appName{
    padding-top: 50px;
    padding-bottom: 50px;
    font-family: 'Gilroy-Regular', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
}
  </style>