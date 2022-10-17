<template>
    <div class="custom-action-row">
        <button class="action-button reset" @click="$emit('closePicker')">{{ cancelText }}</button>
        <button class="action-button done" @click="$emit('selectDate')">{{ selectText }}</button>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        emits: ['selectDate', 'closePicker'],
        props: {
            selectText: { type: String, default: 'Select' },
            cancelText: { type: String, default: 'Cancel' },
        },
    });
</script>

<style>
    .custom-action-row {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
    }

    .current-selection {
        margin: 10px 0 0 0;
    }

    .action-button {
        display: block;
        border-radius: 10px;
        padding: 5px;
        margin: 10px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        width: 30%;
    }

    .done {
      background-color: var(--yellow-tone-2);
    }
</style>