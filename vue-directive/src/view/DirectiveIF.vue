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
<style>
/* 1. 기본 스타일 및 레이아웃 설정 */
body {
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa; /* 밝은 회색 배경 */
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

main {
  width: 100%;
  max-width: 450px;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 2. 헤더 및 버튼 스타일 */
header {
  background-color: #343a40; /* 어두운 색상 헤더 */
  color: white;
  padding: 15px 0;
  margin: -30px -30px 30px -30px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  text-align: center;
}

header h1 {
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff; /* 파란색 버튼 */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition:
    background-color 0.2s,
    transform 0.1s;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.4);
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: translateY(1px);
}

/* 3. 점수 표시 스타일 */
main > p:first-of-type {
  font-size: 3em;
  font-weight: 700;
  color: #28a745; /* 점수 강조 (녹색) */
  margin: 20px 0 10px 0;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 15px;
}

/* 4. 등급 표시 스타일 (A, B, C, D) */
/* v-if로 조건부 렌더링되는 P 태그 그룹의 스타일 */
main > p:nth-of-type(2),
main > p:nth-of-type(3),
main > p:nth-of-type(4),
main > p:nth-of-type(5) {
  font-size: 2em;
  font-weight: bold;
  padding: 5px 0;
  color: #dc3545; /* 기본 D 등급은 빨간색 */
}

/* A 등급 스타일 (임시 CSS 선택자, 실제로는 Vue 동적 클래스 권장) */
/* 여기서는 코드를 간략히 하라는 요청에 따라 순수 CSS로만 처리 */
p.grade-display {
  color: #ffc107; /* B, C 등급은 노란색/주황색 계열 */
}
p.grade-display.A {
  color: #28a745; /* A 등급은 녹색 */
}

/* 5. 입력 필드 스타일 */
input[type="text"] {
  width: 80%;
  padding: 10px;
  margin: 25px auto 15px auto;
  border: 1px solid #ccc;
  border-radius: 6px;
  display: block;
  text-align: center;
  transition: border-color 0.2s;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}

/* 6. 고객 등급 표시 스타일 */
main > p:last-of-type,
main > p:nth-last-of-type(2),
main > p:nth-last-of-type(3),
main > p:nth-last-of-type(4) {
  padding: 10px 15px;
  background-color: #e9ecef;
  border-radius: 6px;
  margin: 10px 0;
  color: #343a40;
  font-weight: 500;
}
</style>
