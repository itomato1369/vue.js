<script setup>
// import
import { onBeforeMount, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import { usePostStore } from "@/stores/post.js";

// useRoute... useRouter...
const route = useRoute();
const router = useRouter(); // router 인스턴스 접근
// usePostStore...
const postStore = usePostStore();
// state, getter 사용

const post = computed(() => postStore.getPostById);

// data
const writeDate = computed(() => {
  return new Date().toLocaleString();
});
// function
// Event Hook
// onMounted(async () => {
//   const result = await axios.get(`http://localhost:3000/board/${route.params.id}`);
//   console.log("post data:", result.data);
//   post.value = result.data[0];
// });

onBeforeMount(async () => {
  // 게시글 목록을 미리 가져옴
  await postStore.fetchPosts();
});

// 삭제
const deletePostHandler = async () => {
  const postId = route.params.id;
  await postStore.deletePost(postId);
  // 목록으로 이동
  router.push({ name: "HomeView" });
};
</script>
<template>
  <div class="post-view-container">
    <header>
      <h1>상세화면, PostView</h1>
    </header>
    <main>
      <div>
        <h3>Title: {{ post.title }}</h3>
        <p>Content: {{ post.content }}</p>
        <p>
          <em>Writer: {{ post.writer }}</em>
        </p>
        <p>Date: {{ writeDate }}</p>
      </div>
      <p><button v-on:click="deletePostHandler">Delete</button></p>
    </main>
    <section>
      <RouterLink to="/">Back to List</RouterLink>
    </section>
  </div>
</template>
<style scoped>
header {
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 3px solid #007bff; /* 메인 색상으로 강조된 하단 선 */
  background-color: #f8f9fa; /* 아주 연한 배경색 */
}

h1 {
  font-size: 2em;
  color: #2c3e50;
  text-align: center;
  margin: 0;
}

main {
  max-width: 800px; /* 본문 최대 너비 제한으로 가독성 향상 */
  margin: 0 auto;
  padding: 20px;
}

/* ====================================
   2. 게시글 내용 스타일
   ==================================== */
div {
  padding: 30px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
  margin-bottom: 25px;
}

h3 {
  font-size: 1.8em;
  color: #343a40; /* 진한 제목 색 */
  margin-top: 0;
  padding-bottom: 15px;
  border-bottom: 1px solid #adb5bd; /* 제목 아래 구분선 */
}

p {
  color: #495057; /* 본문 색상 */
  line-height: 1.8; /* 가독성을 위한 줄 간격 */
  margin: 15px 0;
  font-size: 1.1em;
}

/* 작성자 정보 (Writer/Date) 스타일 */
em {
  display: block; /* 줄 바꿈 */
  color: #6c757d; /* 회색 톤으로 보조 정보 강조 */
  font-style: normal;
  font-weight: 500;
  margin-top: 10px;
  font-size: 0.9em;
}

/* ====================================
   3. 버튼 및 링크 스타일
   ==================================== */

/* 삭제 버튼 스타일 */
button {
  padding: 10px 20px;
  background-color: #dc3545; /* 위험/경고를 나타내는 빨간색 */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}

button:hover {
  background-color: #c82333;
}

/* 목록으로 돌아가기 섹션 */
section {
  max-width: 800px;
  margin: 20px auto;
  text-align: right;
  padding: 0 20px;
}

.router-link-active,
.router-link-exact-active,
a {
  color: #007bff; /* 파란색 링크 */
  text-decoration: none;
  font-weight: 600;
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: all 0.3s;
}

a:hover {
  background-color: #007bff;
  color: white;
}
</style>
