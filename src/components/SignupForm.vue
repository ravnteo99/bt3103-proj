<template>
        <h1 class="signup">Sign Up</h1>
        <br>
        <form id="signup">
            <label for="email">Email Address</label><br>
            <input 
                type="email"
                name="email"
                id="email"
                v-model="email"
                placeholder="someone@example.com" required 
            />
            <br><br>
            <label for="fullname">Full Name</label><br>
            <input 
                type="text"
                name="fname"
                id="fname"
                v-model="fname"
                placeholder="First Name"
                required
            />
            <input 
                type="text"
                name="lname"
                id="lname"
                v-model="lname"
                placeholder="Last Name"
                required
            />
            <br><br>
            <label for="password">Password</label><br>
            <input 
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Enter your password"
                required
            />
            <br><br>
            <label for="password">Confirm Password</label><br>
            <input 
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Re-enter your password"
                required
            />
            <br><br>

            <button type="submit">Sign Up</button><br>
        </form>
</template>

<script>

</script>

<style scoped>
h1 {
    font-family: sans-serif;
}
p {
    font-family: sans-serif;
    font-size: 16px;
}
form {
    font-family: sans-serif;
}
label {
    font-size: 14px;
    font-weight: bold;
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
#fname {
    height: 30px;
    width: 135px;
    margin-right: 10px;
}
#lname {
    height: 30px;
    width: 135px;
}
input:focus {
    border-color: black;
}
button {
    -webkit-appearance: none;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    height: 30px;
    width: 280px;
    background-color: #F8D57E;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}
button:hover{
    background-color: #fcca4c;
}
button:active {
    opacity: 0.6;
    transform: translateY(3px);
}

</style>