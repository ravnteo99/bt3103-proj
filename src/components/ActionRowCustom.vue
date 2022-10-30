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

</style>