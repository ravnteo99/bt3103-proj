<template>
  <NotifButton/>
  <NavBar />
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
            v-model="emailAddress"
        /><br>

        <label for="fullName"><b>Full Name</b> </label><br><br>
        <input
            type="text"
            id="fname"
            required=""
            v-model="firstName"
            placeholder="First Name"
        /> &nbsp;&nbsp;
        <input
            type="text"
            id="lname"
            required=""
            v-model="lastName"
            placeholder="Last Name"
        /><br>

        <label for="contactInfo"><b>Contact Information</b></label><br><br>
        <input
            type="text"
            id="contactNo"
            required=""
            v-model="contactNo"
            placeholder="Mobile No."
        /><br>

        <label for="address"><b>Address</b></label><br><br>
        <input
            type="text"
            id="address"
            required=""
            v-model="address1"
            placeholder="address1"
        />
        <input
            type="text"
            id="address"
            required=""
            v-model="address2"
            placeholder="address2"
        />
        <input
            type="text"
            id="address"
            required=""
            v-model="address3"
            placeholder="address3"
        /><br>
        <input type="button" @click="updateProfile" value="Save Changes" id="savebutton">
      </form>
    </div>

    <div class="setting-item">
      <div class="userCard">
        <img class="userImage" src="img.jpg" style="width:168px;height:168px;">
        <h1 class="userName">{{ firstName }} {{ lastName }}</h1>
        <p class="tagList">Tags: </p>
        <p class="branchList">Branches: </p>
        <form id="cardForm">
          <button id="requestbutton" type="button" @click="this.tagRequest=true">Request Tag/Branches</button>
          <br>
          <button id="resetbutton" type="button">Reset Password</button>
          <br><br>
        </form>
      </div>
    </div>
  </div>

<!--  Modal component-->
  <TagRequest
    v-if="tagRequest"
    @togglePopup="this.tagRequest=false"
    @requestTag="requestTag"
  />
</template>
<script>
import {db} from "@/firebase"
import {getAuth} from "firebase/auth";
import {collection, getDocs, onSnapshot, doc, updateDoc} from "firebase/firestore";
import NotifButton from "@/components/NotifButton";
import TagRequest from "@/modals/TagRequest";
import NavBar from "../components/NavBar.vue";

export default {
  name: "SettingDefault",
  components: {NotifButton, TagRequest, NavBar},
  data() {
    return {
      employeeId: '',
      emailAddress: '',
      firstName: '',
      lastName: '',
      contactNo: '',
      address1: '',
      address2: '',
      address3: '',
      tagRequest: false,
    }
  },
  firestore() {
    const auth = getAuth();
    const user = auth.currentUser;
    return {
      employee: db.collection('employee').doc(user.uid),
    }
  },
  methods: {
    async updateProfile() {
      const employeeRef = doc(db, "employee", this.Id);
      const updateData = {
        emailAddress: this.emailAddress,
        firstName: this.firstName,
        lastName: this.lastName,
      }

      if (this.contactNo !== undefined) {
        updateData["contactNo"] = this.contactNo
      }
      if (this.address1 !== undefined) {
        updateData["address1"] = this.address1
      }
      if (this.address2 !== undefined) {
        updateData["address2"] = this.address2
      }
      if (this.address3 !== undefined) {
        updateData["address3"] = this.address3
      }

      await updateDoc(employeeRef, updateData);
    },
    requestTag() {
      this.tagRequest = false
    }
  },
  async created() {
    const auth = getAuth();
    var user = auth.currentUser;
    this.emailAddress = user.email;

    const employeeQuery = await getDocs(collection(db, "employee"));
    employeeQuery.forEach((doc) => {
      onSnapshot(doc.ref, (doc) => {
        const employeeCheck = doc.data()
        if (this.emailAddress === employeeCheck.emailAddress) {
          this.Id = doc.id;
          this.emailAddress = employeeCheck.emailAddress;
          this.firstName = employeeCheck.firstName;
          this.lastName = employeeCheck.lastName;
          this.contactNo = employeeCheck.contactNo;
          this.address1 = employeeCheck.address1;
          this.address2 = employeeCheck.address2;
          this.address3 = employeeCheck.address3
        }
      })
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting {
  display: flex;
}

.setting-item {
  width: 40%;
  height: 100%;
}

.userTitle {
  font-family: 'Gilroy-Regular', sans-serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 18px;
  text-align: left;
}

.userDescrip {
  font-family: 'Gilroy-Regular', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 30px;
  text-align: left;
}

#userForm {
  font-family: 'Gilroy-Regular', sans-serif;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  padding-bottom: 50px;
  text-align: left;
}

#email, #contactNo {
  height: 45px;
  width: 380px;
  border: groove;
  margin-bottom: 50px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 200;
  font-size: 16px;
  border-radius: 12px;
  line-height: 18px;
}

#address {
  height: 45px;
  width: 380px;
  border: groove;
  margin-bottom: 20px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 200;
  font-size: 16px;
  border-radius: 12px;
  line-height: 18px;
}

#fname, #lname {
  height: 45px;
  width: 175px;
  border: groove;
  margin-bottom: 50px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 200;
  font-size: 16px;
  border-radius: 12px;
  line-height: 18px;
}

#cancelbutton {
  background-color: white;
  border: groove;
  height: 45px;
  width: 120px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  float: right;
  border-radius: 12px;
  transition-duration: 0.4s;
}

#cancelbutton:hover {
  background-color: lightgray;
}

#savebutton {
  background-color: #F8D57E;
  border: none;
  height: 45px;
  width: 140px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  float: right;
  border-radius: 12px;
  transition-duration: 0.4s;
  margin-left: 30px;
}

#savebutton:hover {
  background-color: #c1931d;
}

/* userCard css*/
.userCard {
  margin-top: 60px;
  margin-left: 30px;
  width: 80%;
  height: 130%;
  background-color: #FAFAFA;
  text-align: left;
}

.userImage {
  margin-top: 25px;
  margin-left: 100px;
  margin-bottom: 25px;
}

.userName {
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 800;
  font-size: 26px;
  line-height: 18px;
  margin-left: 100px;
  margin-bottom: 25px;
}

p {
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  margin-left: 30px;
}

#requestbutton {
  background-color: white;
  border: groove;
  height: 45px;
  width: 240px;
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

#requestbutton:hover {
  background-color: lightgray;
}

#resetbutton {
  background-color: #F8D57E;
  border: none;
  height: 45px;
  width: 240px;
  font-family: 'Gilroy-Light', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  border-radius: 12px;
  transition-duration: 0.4s;
  margin-left: 60px;
}

#resetbutton:hover {
  background-color: #c1931d;
}
</style>
  