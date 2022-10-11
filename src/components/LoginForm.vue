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
.register1 {
    margin-top: -10px;
}
.register2 {
    margin-top: -30px;
}
</style>