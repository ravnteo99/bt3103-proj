<template>
  <div class="popup-wrapper">
    <div class="request-popup">


      <div class="button-wrapper custom-action-row">
        <button class="action-button cancel" type="button" @click="this.$emit('togglePopup')">Cancel</button>
        <button class="action-button done" type="button" @click="this.$emit('requestTag')">Request</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagRequest"
}
</script>

<style scoped>
.popup-wrapper {
    z-index: 99;
    background-color: rgb(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .request-popup {
    background-color: white;
    border-radius: 20px;
    width: 50%;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 30px;
    position: relative;
    max-width: 700px;
    min-width: 600px;
  }
</style>