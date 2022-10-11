<template>
        <h1 class="signin">Sign In</h1>
        <br>
        <p class="register1">If you don't have an account registered,</p>
        <br>
        <p class="register2">you can register here!</p>
        <br>
        <form id="login">
            <label for="email">Email Address</label><br>
            <input 
                type="email"
                name="email"
                id="email"
                v-model="email"
                placeholder="someone@example.com" required 
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

            <button type="submit">Sign In</button><br>
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
.register1 {
    margin-top: -10px;
}
.register2 {
    margin-top: -30px;
    margin-bottom: 10px;
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