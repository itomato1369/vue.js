<script setup>
//일반적인 권장 순서 (Best Practice)
// 대부분의 개발자가 선호하고 코드를 이해하기 쉬운 순서는 다음과 같습니다.

// Imports (가장 먼저): ref, computed, onMounted 등 Vue API 및 외부 모듈 가져오기.

// Constant / Props / Emits Declarations: 컴포넌트에서 사용하는 상수, 외부에서 받을 props, 발생시킬 emits 정의.

// Reactive State (Data): ref, reactive 등을 사용한 반응형 데이터 선언 (height, width).

// Computed Properties: computed를 사용한 계산된 속성 정의 (area).

// Watchers: 데이터 변화를 감시하는 watch 또는 watchEffect 정의.

// Lifecycle Hooks: onMounted, onUpdated 등 라이프사이클 훅 정의.

// Methods (function): 컴포넌트의 로직을 수행하는 일반 함수 정의 (change).
import {
  ref,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
  //   onBeforeCreate,
  //   onCreated,
} from "vue";

// Data 초기값
const heightData = Math.round(Math.random() * 10);
const widthData = Math.round(Math.random() * 10);
// const 반응형
const height = ref(heightData);
const width = ref(widthData);
const area = computed(() => {
  return height.value * width.value;
});

// function
onBeforeMount(() => {
  console.log(`onBeforeMount:${height.value} * ${width.value}`);
});
onMounted(() => {
  console.log(`onMounted:${height.value} * ${width.value}`);
});
onBeforeUpdate(() => {
  console.log(`onBeforeUpdate:${height.value} * ${width.value}`);
});
onUpdated(() => {
  console.log(`onUpdated:${height.value} * ${width.value}`);
});
onRenderTracked(() => {
  console.log(`onRenderTracked:${height.value} * ${width.value}`);
});
onRenderTriggered(() => {
  console.log(`onRenderTriggered:${height.value} * ${width.value}`);
});
// onBeforeCreate(() => {
//   console.log(`onBeforeCreate:${height.value} * ${width.value}`);
// });
// onCreated(() => {
//   console.log(`onCreated:${height.value} * ${width.value}`);
// });
const change = () => {
  height.value = Math.round(Math.random() * 10);
  width.value = Math.round(Math.random() * 10);
};
</script>

<template>
  <header>
    <h1>24.Oct Morning !</h1>
  </header>
  <body>
    <p>세로 {{ height }}, 가로 {{ width }}인 사각형의 면적은 {{ area }}</p>
    <button v-on:click="change">값을 변경</button>
  </body>
</template>
<style></style>
