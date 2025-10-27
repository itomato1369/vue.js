<script setup>
// import
import { ref, onMounted, provide } from "vue";
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

// data
const posts = ref([]);

// Event hook...
onMounted(async () => {
  // 초기 데이터 로드
  const result = await axios.get("http://localhost:3000/boards");
  // result 배열의 값
  console.log(result.data);
  posts.value = result.data;
});

// function
// 등록
const addPost = async (newPost) => {
  // 새로운 게시물 추가
  const result = await axios.post("http://localhost:3000/board", newPost);
  posts.value.push({ ...newPost, id: result.data.id });
};

// provide...
provide("addPost", addPost);
</script>

<template>
  <div>
    <h1>HomeView 게시판 Board</h1>
    <PostForm />
    <PostList v-bind:posts="posts" />
  </div>
</template>
