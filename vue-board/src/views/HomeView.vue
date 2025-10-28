<script setup>
// import
import { ref, onMounted, provide } from "vue";
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

// data
const posts = ref([]);

// function
// 게시글 목록 불러오는 함수 분리
const fetchPosts = async () => {
  try {
    const result = await axios.get("http://localhost:3000/boards");
    posts.value = result.data;
  } catch (err) {
    console.error("게시글 로드 실패:", err.message);
  }
};

// 등록 후 목록을 다시 불러오기
const addPost = async (newPost) => {
  try {
    // 1. 새로운 게시물 등록
    await axios.post("http://localhost:3000/board", newPost);
    // 2. 등록 성공후 DB에서 최신 목록 전체 불러오기
    await fetchPosts();
  } catch (err) {
    console.error("게시글 등록 실패:", err.message);
  }
};

// Event hook
onMounted(() => {
  fetchPosts();
});

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
