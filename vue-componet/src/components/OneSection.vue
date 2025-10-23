<script setup>
import { defineProps, defineEmits } from "vue";

// const
const emit = defineEmits(["callStarPoint"]);

// Data
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "값이 입력되지 않음",
  },
});

// function
const onClick = (e) => {
  emit("callStarPoint", e.target.parentElement.parentElement.children[0].innerText);

  // 송출  하위 componet 에서 상위 (부모)로
};
</script>

<template>
  <section class="box">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <p><button v-on:click="onClick">자식 component 에서 생성</button></p>
  </section>
</template>
<style scoped>
section {
  border: green 3px dashed;
  margin: 10px;
}
</style>
