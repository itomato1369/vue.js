<template>
  <BoardForm>
    <template v-slot:no>
      <input class="form-control" type="text" v-model="boardInfo.no" readonly />
    </template>
    <template v-slot:title>
      <input class="form-control" type="text" v-model="boardInfo.title" />
    </template>
    <template v-slot:writer>
      <input class="form-control" type="text" v-model="boardInfo.writer" />
    </template>
    <template v-slot:content>
      <textarea class="form-control" v-model="boardInfo.content"></textarea>
    </template>
    <template v-slot:created_date>
      <input class="form-control" type="date" v-model="formattedDate" readonly />
    </template>
    <template v-slot:button>
      <button class="btn btn-info" @click="modifyBoard">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
// ----import----
import BoardForm from "@/components/BoardForm.vue";
import dateFormat from "@/utils/dateFormat";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const route = useRoute();

let boardUpdate = ref([]);
const getBoardUpdate = async (bno) => {
  // boardInfo의 값을 그대로 가져와서 일단 필드에 입력
  let result = await axios.get(`/api/boards/${bno}`).catch((err) => console.log(err));
  boardUpdate.value = result.data;
};

onBeforeMount(() => {
  const boardNo = route.query.no;
  getBoardUpdate(boardNo);
});

//const modifyBoard = //  DB UPDATE
</script>
