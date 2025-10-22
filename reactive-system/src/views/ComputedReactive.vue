<script setup>
// Composition API setup 지정 , 함수기반 
import { reactive, computed } from "vue";


// ★Data 변경 => 화면이 자동 refresh★
const data = reactive({
  PI: 3.14,
  radius: Math.round(Math.random() * 10),
});

// 계산된 속성
const area = computed(() => {
  return data.radius * data.radius * data.PI;
});
// 반영형 데이터radius 5초 마다 값 변경 refresh
setInterval(() => {
  data.radius = Math.round(Math.random() * 10);
}, 5000);
</script>

<template>
  <p>반지름이 {{ data.radius }}이고, 원주율이 {{ data.PI }}인 원의 면적은 {{ area }}다</p>
</template>

<style scoped>

</style>
