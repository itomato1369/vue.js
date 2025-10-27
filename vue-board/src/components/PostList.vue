<script setup>
// import
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

// function
// data 속성 정의
// params
defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <header>
    <h1>PostList</h1>
  </header>
  <main>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <!-- title 클릭하면 상세화면으로  -->
        <h3>
          <RouterLink v-bind:to="{ name: 'PostView', params: { id: post.id } }">{{
            post.title
          }}</RouterLink>
        </h3>
        <p>{{ post.content }}</p>
        <p>
          <em>작성자: {{ post.writer }}</em>
        </p>
      </li>
    </ul>
  </main>
</template>
<style scoped>
/* 전체 레이아웃 및 제목 스타일 */
header {
  padding: 20px;
  background-color: #f8f8f8; /* 아주 연한 회색 배경 */
  border-bottom: 2px solid #eee; /* 하단 구분선 */
}

h1 {
  font-size: 2em; /* 제목 크게 */
  color: #333; /* 진한 글자색 */
  margin: 0;
}

/* 목록 스타일 */
main {
  padding: 20px;
}

ul {
  list-style: none; /* 목록 기호 제거 */
  padding: 0;
  margin: 0;
}

li {
  border: 1px solid #ddd; /* 경계선 */
  border-radius: 8px; /* 모서리 둥글게 */
  padding: 15px;
  margin-bottom: 15px; /* 항목 간 간격 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
  transition: transform 0.2s; /* 마우스 오버 시 애니메이션 준비 */
  background-color: #fff; /* 흰색 배경 */
}

li:hover {
  transform: translateY(-3px); /* 마우스 오버 시 살짝 위로 이동 (입체감) */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 더 진하게 */
  cursor: pointer; /* 클릭 가능한 모양 */
}

/* 제목과 내용 스타일 */
h3 {
  font-size: 1.3em;
  color: #007bff; /* 제목을 눈에 띄는 파란색으로 */
  margin-top: 0;
  margin-bottom: 8px;
  border-bottom: 1px dashed #eee; /* 제목 아래 점선 구분 */
  padding-bottom: 5px;
}

p {
  color: #555; /* 본문 글자색 */
  line-height: 1.6; /* 가독성을 위한 줄 간격 */
  margin: 5px 0;
}

em {
  color: #dc3545; /* 강조 텍스트는 빨간색 계열로 */
  font-style: normal; /* 기울임꼴 대신 일반 폰트 사용 (더 깔끔) */
  font-weight: bold;
}
</style>
