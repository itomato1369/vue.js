<script setup>
// Vue.js의 특징
// 1. Data를 변경하면 -> 화면(DOM)을 refresh
// 2.

import { ref, reactive, computed } from "vue";
// ref는 반응형

const url = ref("https://vuejs.org/");
const isDisabled = ref(true);
const imgAttributes = reactive({
  src: "./src/assets/logo.svg",
  alt: "Vue 기본 로고",
  width: "150px",
});
const txtColor = ref("pink");
// const backColor = ref("green");
const styleAttributes = reactive({
  color: "orange",
  background: "purple",
});

const msg = ref("Good afternoon");
const isTxtColorRed = ref(true);
const isBgColorBlue = ref(true);
const classStyles = reactive({
  txtColorRed: true,
  bgColorBlue: false,
  txtSize24: true,
});

// Data 속성

let isRedTrue = ref(true); // .value 값을 조정
let isBlueTrue = ref(true);

// Data 속성
const computedStyles = computed(() => {
  isRedTrue = ref(Math.round(Math.random())); // 0, '', null => falsy false값을 가짐
  isBlueTrue = ref(Math.round(Math.random()));
  // isRedTrue = isRedTrue == 0 ? false : true;
  // isBlueTrue = isBlueTrue == 0 ? false : true;

  return { txtColorRed: isRedTrue.value, bgColorBlue: isBlueTrue.value };
});

setInterval(() => {
  isRedTrue.value = Math.round(Math.random());
  isBlueTrue.value = Math.round(Math.random());
  console.log(isRedTrue.value, isBlueTrue.value, Math.random());
}, 2000);
</script>

<template>
  <p>
    <a v-bind:href="url" v-bind:style="{ color: txtColor }">Vue.js사이트</a>
  </p>
  <p>
    <a v-bind:href="url + 'guide/introduction.html'" v-bind:style="styleAttributes"
      >Vue.js 가이드페이지</a
    >
  </p>
  <p><button v-bind:disabled="isDisabled">click</button></p>
  <p><img v-bind="imgAttributes" /></p>

  <p v-bind:class="{ txtColorRed: true }">{{ msg }}</p>
  <p v-bind:class="{ txtColorRed: false }">{{ msg }}</p>
  <p v-bind:class="{ txtColorRed: true }">{{ msg }}</p>
  <p v-bind:class="{ 'txt-color-pink': isTxtColorRed }">{{ msg }}</p>
  <p v-bind:class="{ txtColorRed: true, bgColorBlue: isBgColorBlue }">{{ msg }}</p>
  <p v-bind:class="classStyles">{{ msg }}</p>
  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>

<style scoped>
.txtColorRed {
  color: red;
}

.txt-color-pink {
  color: rgb(224, 4, 253);
}

.bgColorBlue {
  background-color: blue;
}

.txtSize24 {
  font-size: 24px;
}
</style>
