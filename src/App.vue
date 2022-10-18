<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Poppins', sans-serif;
  --yellow-tone-1: #F9EBC9;
  --yellow-tone-2: #F8D57E;
  --yellow-tone-3: #FFB100;
}

:root {
  --ms-tag-font-weight: 500;
  --ms-tag-bg: #F8D57E;
  --ms-tag-color: black;
  --ms-option-bg-pointed: #F9EBC9;
  --ms-ring-color: #F9EBC9;
}

/* employee tags class to be used in employee card */
.Barista {
  background-color: #787161;
  color: white;
}

.Cashier {
  background-color: black;
  color: white;
}

.Clerk {
  background-color: #FFB100;
  color: black;
}
</style>
