<script setup>
import { inject, defineProps } from "vue";
//
// 반응형 Data
const removeTodo = inject("removeTodo");

// function
// defineProps...
const props = defineProps({
  itemId: { type: Number, required: true },
});
const handleDelte = () => {
  removeTodo(props.itemId);
};
</script>
<template>
  <button v-on:click="handleDelte">삭제</button>
</template>
