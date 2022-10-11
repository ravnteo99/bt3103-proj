<template>
    <div id="wrapper">
        <form id="login">
            <input 
                type="email"
                name="email"
                id="email"
                v-model="email"
                placeholder="Email Address" required 
            />
            <br />
            <input 
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Password"
                required
            />
            <br />
        </form>
    </div>
</template>

<script>

</script>

<style scoped>
</style>