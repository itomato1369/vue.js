<script setup>
// Composition API setup 지정 , 함수기반 
// Options API
import { ref, computed } from "vue";
// ★Data 변경 => 화면이 자동 refresh★
const radiusInit = Math.round(Math.random() * 10);
const radius = ref(radiusInit);
const PI = ref(3.14);

// 계산된 속성
const area = computed(() => {
  return radius.value * radius.value * PI.value;
});
// 반영형 데이터radius 5초 마다 값 변경 refresh
setInterval(() => {
  radius.value = Math.round(Math.random() * 10);
}, 5000);
</script>

<template>
  <p>반지름이 {{ radius }}이고, 원주율이 {{ PI }}인 원의 면적은 {{ area }}다</p>
</template>

<style scoped>

</style>

