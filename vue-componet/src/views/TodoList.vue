<script setup>
import { reactive, provide } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoItemContainer from "./TodoItemContainer.vue";
//

// const 초기값 Data
let nextId = 1;
const todoData = [
  { id: 1, text: "Vue.js", completed: false },
  { id: 2, text: "Node.js", completed: true },
];

// 반응형 Data
const todos = reactive(todoData);

// function
// 등록하는 기능 매개값을 newText
const addTodo = (newText) => {
  if (newText.trim() === "") {
    return;
  }
  todos.push({ id: nextId++, text: newText, completed: false });
};
// 변경 매개값을 id
const toggleComplete = (id) => {
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
// 삭제 매개값을 id
const removeTodo = (id) => {
  const idx = todos.findIndex((t) => t.id == id);
  todos.splice(idx, 1);
};

// provide...
provide("todos", todos);
provide("addTodo", addTodo);
provide("toggleComplete", toggleComplete);
provide("removeTodo", removeTodo);
</script>

<template>
  <header>
    <h1>TodoList(provide/inject)</h1>
  </header>
  <body>
    <TodoInput>
      <template v-slot:header>
        <h3>header slot</h3>
      </template>
      <template v-slot:footer>
        <h3>footer slot</h3>
      </template>
      <template v-slot:default>
        <h3>NO</h3>
      </template>
    </TodoInput>

    <ul>
      <TodoItemContainer v-for="todo in todos" v-bind:key="todo.id" v-bind:todo="todo">
      </TodoItemContainer>
    </ul>
  </body>
</template>
<style scoped></style>
