<script setup>
import { inject, ref, defineProps } from "vue";
// API 가져오기

// 반응형 Data
const addTodo = inject("addTodo");
const newTodoText = ref("");
defineProps({
  msg: String,
});

// Method function
const handleAddTodo = () => {
  // 입력된 값을 addTodo에 전달
  addTodo(newTodoText.value);
  // 필드 초기화
  newTodoText.value = "";
};
</script>
<template>
  <div>
    <slot name="header"></slot>
  </div>

  <div>
    <input
      type="text"
      placeholder="새 값을 입력하세요"
      v-model="newTodoText"
      v-on:keyup.enter="handleAddTodo"
    />
    <!-- 양방향 바인딩 v-model
     Form 요소에서 수동 처리할 필요 없이 항상 동기화 상태로 유지
    입력을 newTodoText.value에서 실시간으로 저장
    값이 바뀌면 필드 내용도 변경 -->
    <button v-on:click="handleAddTodo">추가하기</button>
  </div>
  <slot></slot>
  <div>
    <slot name="footer"></slot>
  </div>
</template>
