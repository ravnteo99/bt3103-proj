<template>
    <h1 class="newbranch">New Branch</h1>
    <br>
    <form id="newbranch" @submit.prevent="signup()">
        <label for="name">Name</label><br>
        <input 
            type="text"
            name="name"
            id="name"
            v-model="name"
            placeholder="Branch Name" required 
        />
        <br><br>
        <label for="address">Address</label><br>
        <input 
            type="text"
            name="address1"
            id="address1"
            v-model="address1"
            placeholder="Address Line 1"
            required
        /><br>
        <input 
            type="text"
            name="address2"
            id="address2"
            v-model="address2"
            placeholder="Address Line 2"
            required
        /><br>
        <input 
            type="text"
            name="address3"
            id="address3"
            v-model="address3"
            placeholder="Address Line 3"
            required
        />
        <br><br>
        <button class="cancel">Cancel</button>
        <button type="submit" class="publish">Publish</button><br>
    </form>
</template>

<script>
export default {
    name:'NewBranch',
    data() {
        return {
            name: "",
            address1: "",
            address2: "",
            address3: ""
        }
    },
    methods:{

    }
}
</script>

<style scoped>
h1 {
    margin-bottom: 0px;
}
label {
    font-size: 14px;
    font-weight: bold;
}
#address1 {
    margin-bottom: 10px;
}
#address2 {
    margin-bottom: 10px;
}
input {
    -webkit-appearance: none;
    font-size: 14px;
    height: 30px;
    width: 280px;
    box-sizing: border-box;
    border-color: lightgray;
    border-radius: 8px;
    border-width: 1px;
}
input:focus {
    border-color: black;
}
.cancel:hover{
    background-color: #cfd7e3;
}
.publish:hover{
    background-color: #fcca4c;
}
button:active {
    opacity: 0.6;
    transform: translateY(3px);
}
.cancel {
    height: 30px;
    width: 135px;
    margin-right: 10px;
    -webkit-appearance: none;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background-color: white;
    border-radius: 8px;
    border-color: black;
    border-width: 1px;
    cursor: pointer;
}
.publish {
    height: 30px;
    width: 135px;
    -webkit-appearance: none;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    background-color: #F8D57E;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}
</style>