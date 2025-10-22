<script setup>
import { ref } from "vue";
// Data
const score = ref(80);
const getRandomValue = () => {
  score.value = Math.round(Math.random() * 60) + 40;
  console.log(score.value);
};
const point = ref(100); //
</script>
<template>
  <header>
    <h1>This is</h1>
    <button v-on:click="getRandomValue">Random 점수</button>
  </header>
  <br />
  <main>
    <p>{{ score }}</p>
    <br />
    <p v-if="score > 90">A</p>
    <p v-else-if="score >= 80">B</p>
    <p v-else-if="score >= 70">C</p>
    <p v-else>D</p>
    <br />
    <input type="text" v-model="point" />
    <p v-if="point >= 10000">점수" {{ point }} "은 사장입니다</p>
    <p v-else-if="point >= 300">점수" {{ point }} "은 골드 고객입니다</p>
    <p v-else-if="point >= 200">점수" {{ point }} "은 실버 고객입니다</p>
    <p v-else>점수" {{ point }} "은 브론즈 고객입니다</p>
  </main>
</template>
<style></style>
