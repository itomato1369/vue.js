// import
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRoute } from "vue-router";

// export
export const usePostStore = defineStore("post", () => {
  // state 값 저장
  const posts = ref([]);

  // getter: 가공된 state 반환
  const getPostById = computed(() => {
    // route 파라미터에서 id 가져오기
    const id = parseInt(useRoute().params.id);
    return posts.value.find((post) => post.id === id);
  });

  // action : 데이터 변경
  const addPost = async (newPost) => {
    try {
      const result = await axios.post("http://localhost:3000/board", { param: newPost });
      posts.value.push({ ...newPost, id: result.data.insertId });
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    // DB에서 삭제
    await axios.delete(`http://localhost:3000/board/${id}`);
    // 로컬 상태에서 삭제
    posts.value = posts.value.filter((post) => post.id !== id);
  };

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    posts.value = response.data;
  };

  return { posts, getPostById, addPost, deletePost, fetchPosts };
});
