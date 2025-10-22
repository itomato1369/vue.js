<script setup>
import { ref, reactive } from "vue";
// 반응형 변수 ref
//
const url = ref("https://vuejs.org/");
const url1 = ref("https://www.youtube.com/watch?v=ARGmMR_-bHw");
const imgAttributes = reactive({
  src: "./src/assets/logo.svg",
  alt: "Vue 기본 로고",
});
const now = new Date();
const timeStr = ref(now.toLocaleTimeString());

function nowTime() {
  const newTime = new Date();
  timeStr.value = newTime.toLocaleTimeString();
}
setInterval(nowTime, 1000);
</script>

<template>
  <header>
    <h1>V u e . j s 오 전 수 업</h1>
    <p><img class="logo" v-bind="imgAttributes" /></p>
  </header>
  <main>
    <h3>환영합니다</h3>
    <p>현재 시간: {{ timeStr }}</p>
    <p>이 페이지는 Node.js / Vue.js 입니다</p>
    <h3>내용</h3>
    <ol>
      <li>간단한 테스트</li>
      <li>
        <p>링크 <a v-bind:href="url">홈페이지</a></p>
      </li>
      <li>리스트 항목</li>
    </ol>
    <h3>허리 건강 챙기기</h3>
    <p><a v-bind:href="url1">요추 요정</a></p>
  </main>
  <footer>
    <p>&copy; Copyright 2025 All Rights Reserved.</p>
  </footer>
</template>

<style>
/* 1. 기본 스타일 재설정 */
body {
  font-family: Arial, sans-serif; /* 폰트 설정 */
  line-height: 1.6; /* 줄 간격 설정 */
  margin: 0; /* body 기본 여백 제거 */
  padding: 0;
  background-color: #f4f4f4; /* 배경색 설정 */
  color: #333; /* 기본 글자색 설정 */
}

/* 2. 레이아웃 중앙 정렬 및 기본 스타일 */
h1 {
  text-align: center;
  background-color: #42b883; /* Vue 색상 */
  color: white;
  padding: 20px 0;
  margin-bottom: 30px;
}
.logo {
  width: 150px; /* 이미지 너비 */
  height: auto; /* 비율 유지 */
  display: block; /* 블록 요소로 만들어 margin: auto 적용 가능하게 함 */
  margin: 20px auto; /* 상하 여백 20px, 좌우 자동(중앙 정렬) */
}
main {
  max-width: 800px; /* 내용 최대 너비 제한 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 20px;
  background-color: white; /* main 배경색 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

/* 3. 내용 스타일 */
h3 {
  color: #35495e; /* 강조 색상 */
  border-bottom: 2px solid #eee; /* 하단 구분선 */
  padding-bottom: 5px;
  margin-top: 20px;
}

ul {
  list-style-type: square; /* 리스트 마커 모양 변경 */
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

/* 4. 링크 스타일 */
a {
  color: #42b883;
  text-decoration: none; /* 밑줄 제거 */
}

a:hover {
  text-decoration: underline; /* 마우스 오버 시 밑줄 표시 */
}

/* 5. 푸터 스타일 */
footer {
  text-align: center;
  padding: 15px 0;
  margin-top: 30px;
  border-top: 1px solid #ddd;
  font-size: 0.85em; /* 작은 글자 크기 */
  color: #777;
}
</style>
