<template>
  <div>
    <button v-on:click="onClickFnc">클릭</button>
    <p>결과: {{ randValue }}</p>
  </div>

  <p><input type="text" v-model="msg" /></p>

  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>

<script setup>
import { ref, computed } from "vue";

// Data
const randValue = ref("시작 전");
const msg = ref("Let's Go");

let isRedFlag = ref(true);
let isBlueFlag = ref(true);
const computedStyles = computed(() => {
  return { txtColorRed: isRedFlag.value, bgColorBlue: isBlueFlag.value };
  // ref(true); 이기에 .value로 해야함
});

// Event 함수생성
const onClickFnc = () => {
  const rand = Math.round(Math.random() * 100);
  randValue.value = rand;
  console.log(rand);

  isRedFlag.value = rand > 50 ? true : false;
  isBlueFlag.value = rand > 50 ? true : false;
};
</script>

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
