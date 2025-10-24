<script setup>
import { defineProps, inject } from "vue";
import TodoItemButton from "./TodoItemButton.vue";
//
// 반응형 Data
// inject
const toggleComplete = inject("toggleComplete");

// defineProps...
const props = defineProps({
  todo: { type: Object, required: true },
});

// function
const handleToggle = () => {
  toggleComplete(props.todo.id);
};
</script>

<template>
  <li v-bind:class="{ completed: todo.completed }">
    <span v-on:click="handleToggle">{{ todo.text }}</span>
    <TodoItemButton v-bind:item-id="todo.id" />
  </li>
</template>

<style scoped>
.completed span {
  text-decoration: line-through;
  color: gray;
}
</style>
