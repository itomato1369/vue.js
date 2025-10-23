<template>
  <header>
    <h1>Model</h1>
  </header>
  <main>
    <textarea v-bind:rows="rCount" v-model="textAreaInput"></textarea>
    <p v-html="textAreaInput.replace(/\n/g, `<br>`)"></p>
    <br />
    <select v-model="memberType">
      <option value="일반">일반회원</option>
      <option value="이반">이반회원</option>
      <option value="삼반">삼반회원</option>
    </select>
    <p>{{ memberType }}</p>
    <br />
    <section>
      <label><input type="checkbox" v-model="selectOS" value="1" /> macOS</label><br />
      <label><input type="checkbox" v-model="selectOS" value="2" /> windows</label><br />
      <label><input type="checkbox" v-model="selectOS" value="3" /> Linux</label>
    </section>
    <p>{{ selectOS }}</p>
    <br />
    <section>
      <label><input type="radio" name="selectedOS" v-model="selectedOS" value="1" /> macOS</label
      ><br />
      <label><input type="radio" name="selectedOS" v-model="selectedOS" value="2" /> windows</label
      ><br />
      <label><input type="radio" name="selectedOS" v-model="selectedOS" value="3" /> Linux</label
      ><br />
    </section>
    <p>{{ selectedOS }}</p>
  </main>
  <footer></footer>
</template>
<script setup>
import { ref } from "vue";

// new RegExp(), /Test/
// new Array(), []

const textAreaInput = ref("test");
const rCount = ref(5);
const memberType = ref("일반");
const selectOS = ref([]);
const selectedOS = ref([]);
</script>
<style>
/* 1. 기본 스타일 및 레이아웃 설정 */
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5; /* 밝은 배경색 */
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 30px;
}

main {
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 2. 헤더 스타일 */
header h1 {
  background-color: #007bff; /* 파란색 계열 강조 */
  color: white;
  padding: 15px 0;
  margin: -30px -30px 30px -30px; /* main 내부에서 상단 여백 제거 */
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  text-align: center;
  font-size: 2em;
  font-weight: 600;
}

/* 3. 입력 요소 스타일 (공통) */
textarea,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box; /* 패딩이 너비를 초과하지 않도록 설정 */
  transition: border-color 0.2s;
}

textarea:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

/* 4. 섹션 구분 및 결과 표시 스타일 */
section {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fcfcfc;
}

/* 5. 결과 값 표시 스타일 */
/* v-html을 사용하는 p 태그와 단순 결과를 보여주는 p 태그 */
p {
  margin: 10px 0;
  padding: 8px 12px;
  background-color: #e9ecef; /* 결과 배경색 */
  border-radius: 4px;
  color: #333;
  word-wrap: break-word; /* 긴 텍스트 줄바꿈 */
  border-left: 5px solid #007bff; /* 좌측 포인트 */
}

/* 6. 레이블 및 체크박스/라디오 버튼 */
label {
  display: inline-block;
  margin-right: 20px;
  line-height: 2; /* 줄 간격 확보 */
  cursor: pointer;
}

input[type="checkbox"],
input[type="radio"] {
  margin-right: 5px;
}
</style>
