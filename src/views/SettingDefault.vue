<template>
    <div class="setting">
      <div class="setting-item">
        <h4 class="userTitle"><b>User Information</b></h4>
        <h4 class="userDescrip">Enter your personal information below. <br> You can change it anytime you want. </h4>
        <form id="userForm" @submit.prevent="updateProfile()">
          <label for="email"><b>Email Address</b></label><br><br>
          <input 
              type="text" 
              id="email" 
              required="" 
              v-model="employee.emailAddress"
            /><br>
  
          <label for="fullName"><b>Full Name</b> </label><br><br>
          <input 
              type="text" 
              id="fname" 
              required="" 
              v-model="employee.firstName"
              placeholder="First Name"
            /> &nbsp;&nbsp;
          <input 
              type="text" 
              id="lname" 
              required="" 
              v-model="employee.lastName"
              placeholder="Last Name"
            /><br>
  
          <label for="contactInfo"><b>Contact Information</b></label><br><br>
          <input 
              type="text" 
              id="contactNo" 
              required=""
              v-model="employee.contactNo" 
              placeholder="Mobile No."
            /><br>

            <label for="address"><b>Address</b></label><br><br>
            <input 
            type="text" 
            id="address" 
            required="" 
            v-model="employee.address1"
            placeholder="address1"
            />
            <input 
            type="text" 
            id="address" 
            required="" 
            v-model="employee.address2"
            placeholder="address2"
            /> 
            <input 
            type="text" 
            id="address" 
            required="" 
            v-model="employee.address3"
            placeholder="address3"
            /><br>
          <input type="button" @click="updateProfile" value="Save Changes" id="savebutton">
      </form>
      </div>
  
      <div class="setting-item">
        <div class="userCard">
        <img class="userImage" src="img.jpg" style="width:168px;height:168px;">
        <h1 class="userName">{{employee.firstName}} {{employee.lastName}}</h1>
        <p class="tagList">Tags: </p>
        <p class="branchList">Branches: </p>
        <form id="cardForm">   
          <button id="requestbutton" type="button" >Request Tag/Branches</button><br>
          <button id="resetbutton" type="button">Reset Password</button><br><br>
        </form>
        </div>
      </div>
    </div>
  </template>
  <script>


import { db } from "@/firebase"
import { getAuth } from "firebase/auth";
import { collection, getDocs, onSnapshot, doc, updateDoc} from "firebase/firestore";


export default {
  name: "SettingDefault",

  data() {
    return {
      employee: {
        employeeId: '',
        emailAddress: '',
        firstName: '',
        lastName: '',
        contactNo: '',
        address1: '',
        address2: '',
        address3: ''
      }
    }
  },
  firestore(){
    const auth = getAuth();
    const user = auth.currentUser;
    return {
      employee: db.collection('employee').doc(user.uid),
    }
  },
  methods:{
    async updateProfile() {
      const employeeRef = doc(db, "employee", this.employeeId);
      await updateDoc(employeeRef, {
        emailAddress: this.employee.emailAddress,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        contactNo: this.employee.contactNo,
        address1: this.employee.address1,
        address2: this.employee.address2,
        address3: this.employee.address3
      });
    }
  },
  async created() {
    const auth = getAuth();
    var user = auth.currentUser;
    this.employee.emailAddress = user.email;

    const employeeQuery = await getDocs(collection(db, "employee"));
    employeeQuery.forEach((doc) => {
      onSnapshot(doc.ref, (doc) => {
        const employeeCheck = doc.data()
        if (this.employee.emailAddress === employeeCheck.emailAddress){
          this.employeeId = doc.id;
          this.employee.emailAddress = employeeCheck.emailAddress;
          this.employee.firstName = employeeCheck.firstName;
          this.employee.lastName = employeeCheck.lastName;
          this.employee.contactNo = employeeCheck.contactNo;
          this.employee.address1 = employeeCheck.address1;
          this.employee.address2 = employeeCheck.address2;
          this.employee.address3 = employeeCheck.address3

        }
      })
    })
  }
}

  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .setting{
    display: flex;
  }
  
  .setting-item{
    width: 40%;
    height: 100%;
  }
  
  .userTitle{
    font-family: 'Gilroy-Regular', sans-serif;
    font-weight: 800;
    font-size: 20px;
    line-height: 18px;
    text-align: left;
  }
  
  .userDescrip{
    font-family: 'Gilroy-Regular', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 30px;
    text-align: left;
  }
  
  #userForm{
    font-family: 'Gilroy-Regular', sans-serif;
    font-weight: 800;
    font-size: 18px;
    line-height: 18px;
    padding-bottom: 50px;
    text-align: left;
  }
  
  #email, #contactNo{
    height:45px;
    width: 380px;
    border: groove;
    margin-bottom: 50px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 200;
    font-size: 16px;
    border-radius: 12px;
    line-height: 18px;
  }

  #address{
    height:45px;
    width: 380px;
    border: groove;
    margin-bottom: 20px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 200;
    font-size: 16px;
    border-radius: 12px;
    line-height: 18px;
  }
  
  #fname, #lname{
    height:45px;
    width: 175px;
    border: groove;
    margin-bottom: 50px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 200;
    font-size: 16px;
    border-radius: 12px;
    line-height: 18px;
  }
  
  #cancelbutton{
    background-color: white;
    border: groove;
    height:45px;
    width:120px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    float: right;
    border-radius: 12px;
    transition-duration: 0.4s;
  }
  
  #cancelbutton:hover{
    background-color: lightgray;
  }
  
  #savebutton{
    background-color: #F8D57E;
    border: none;
    height:45px;
    width:140px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    float: right;
    border-radius: 12px;
    transition-duration: 0.4s;
    margin-left: 30px;
  }
  
  #savebutton:hover{
    background-color: #c1931d;
  }
  /* userCard css*/
  .userCard{
    margin-top: 60px;
    margin-left: 30px;
    width:80%;
    height:130%;
    background-color: #FAFAFA;
    text-align: left;
  }
  
  .userImage{
    margin-top: 25px;
    margin-left: 100px;
    margin-bottom: 25px;
  }
  
  .userName{
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 800;
    font-size: 26px;
    line-height: 18px;
    margin-left: 100px;
    margin-bottom: 25px;
  }
  
  p{
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 800;
    font-size: 16px;
    line-height: 18px;
    margin-left: 30px;
  }
  
  #requestbutton{
    background-color: white;
    border: groove;
    height:45px;
    width:240px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    border-radius: 12px;
    transition-duration: 0.4s;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 60px;
    cursor: pointer;
    cursor: hand;
  }
  
  #requestbutton:hover{
    background-color: lightgray;
  }
  
  #resetbutton{
    background-color: #F8D57E;
    border: none;
    height:45px;
    width:240px;
    font-family: 'Gilroy-Light', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    border-radius: 12px;
    transition-duration: 0.4s;
    margin-left: 60px;
  }
  
  #resetbutton:hover{
    background-color: #c1931d;
  }
  </style>
  