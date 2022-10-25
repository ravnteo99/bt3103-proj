<template>
  <div class="employee-card-wrapper">
    <div class="display-picture">
      <img :src="profileLink" :alt="fullName">
    </div>
    <div class="worker-information">
      <p class="name"> {{ fullName }} </p>
      <p :class="tag" class="user-tag"> {{ tag }} </p>
      <p class="email-address"> {{ emailAddress }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeCard",
  props: {
    fullName: String,
    tag: String,
    emailAddress: String,
    profileLink: String
  },
}
</script>

<style scoped>
  .employee-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FBFBFD;
    border-radius: 10px;
    padding-top: 20px;
  }

  .worker-information {
    text-align: center;
    padding: 0 20px;
    width: inherit;
  }

  .worker-information p {
    margin: 5px;
  }

  img {
    border-radius: 100%;
  }

  .name {
    font-weight: bold;
  }

  .user-tag {
    border-radius: 5px;
    font-weight: bold;
    padding: 3px;
    width: 200px;
  }

  .email-address {
    font-size: 15px;
  }
</style>