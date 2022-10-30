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

/* input boxes to have the same font size */
input {
  font-family: inherit;
  font-size: inherit;
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

/* action buttons CSS */
.custom-action-row {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.action-button {
    display: block;
    border-radius: 10px;
    padding: 10px 10px;
    margin: 10px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    width: 30%;
}

.done {
  background-color: var(--yellow-tone-2);
}
</style>
