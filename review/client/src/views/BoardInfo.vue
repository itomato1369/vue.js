<template>
  <div class="container">
    <table class="table">
      <tbody>
        <tr>
          <th class="text-right">번호</th>
          <td class="text-center">{{ boardInfo.no }}</td>
        </tr>
        <tr>
          <th class="text-right">작성일</th>
          <td class="text-center">{{ dateFormat(boardInfo.created_dt, "yyyy-MM-dd") }}</td>
        </tr>
        <tr>
          <th class="text-right">제목</th>
          <td class="text-center">{{ boardInfo.title }}</td>
        </tr>
        <tr>
          <th class="text-right">이름</th>
          <td class="text-center">{{ boardInfo.writer }}</td>
        </tr>
        <tr>
          <th class="text-right">내용</th>
          <td class="text-center">{{ boardInfo.content }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="btn btn-primary" @click="goToboardUpdate">수정</button>
    </div>
    <hr />
  </div>
  <CommentComponent v-bind:no="no" />
</template>

<script setup>
// ----import----
import CommentComponent from "../components/CommentComponent.vue";
import dateFormat from "@/utils/dateFormat.js";
// 값을 받을 때 Route 값을 전달할 때 userRouter
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();

let boardInfo = ref([]);
const getBoardInfo = async (bno) => {
  // 단건조회   http://localhost:3000/boards/100
  let result = await axios.get(`/api/boards/${bno}`).catch((err) => console.log(err));
  boardInfo.value = result.data;
};

// 수정 버튼 누르면 BoardUpdate.vue페이지로 이동
const goToboardUpdate = async () => {
  router.push({ name: "boardUpdate", query: {} });
};

onBeforeMount(() => {
  const boardNo = route.query.no;
  getBoardInfo(boardNo);
});
</script>
