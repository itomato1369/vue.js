<script setup>
// import
import { ref, inject } from "vue";

// data
const title = ref("");
const content = ref("");
const writer = ref("");

// inject...
const addPost = inject("addPost");

// function
const addPostHandler = async () => {
  if (!title.value || !content.value) {
    alert("Title과 Content를 입력");
    return;
  }
  // 사용자가 입력한 값을 가져옴
  const newPost = {
    title: title.value,
    content: content.value,
    writer: writer.value,
  };
  await addPost(newPost);
  // 폼 초기화
  title.value = "";
  content.value = "";
  writer.value = "";
};
</script>
<template>
  <header>
    <h1>PostForm</h1>
  </header>
  <main>
    <form v-on:submit.prevent="addPostHandler">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" v-model="title" />
      </div>

      <div>
        <label for="content">Content</label>
        <textarea id="content" name="content" v-model="content"></textarea>
      </div>

      <div>
        <label for="writer">Writer</label>
        <input type="text" id="writer" name="writer" v-model="writer" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </main>
</template>
<style scoped>
header {
  padding: 20px;
  background-color: #f0f4f8; /* 연한 블루 계열 배경 */
  border-bottom: 1px solid #cceeff;
}

h1 {
  font-size: 1.8em;
  color: #2c3e50;
  margin: 0;
}

main {
  padding: 30px;
  background-color: #ffffff;
}

form {
  max-width: 600px; /* 폼의 최대 너비를 제한하여 가독성 향상 */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e6ed;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
}

/* ====================================
   2. 입력 필드 그룹 스타일 (Label + Input/Textarea)
   ==================================== */
div {
  margin-bottom: 20px;
}

label {
  display: block; /* 라벨을 블록 레벨로 만들어 입력 필드 위에 배치 */
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  font-size: 0.95em;
}

/* 모든 입력 요소 (input, textarea) 공통 스타일 */
input[type="text"],
input[type="number"], /* 혹시 모를 writer ID 등을 위해 추가 */
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */
  font-size: 1em;
  color: #333;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

/* 입력 필드 포커스 시 강조 효과 */
input:focus,
textarea:focus {
  border-color: #409eff; /* 포커스 색상 (밝은 파랑) */
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1); /* 포커스 아웃라인 */
  outline: none;
}

textarea {
  resize: vertical; /* 세로 방향으로만 크기 조절 허용 */
  min-height: 150px; /* 최소 높이 지정 */
}

/* ====================================
   3. 버튼 스타일
   ==================================== */
button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #007bff; /* 주 강조색 (파란색) */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
}

button[type="submit"]:hover {
  background-color: #0056b3; /* 호버 시 색상 어둡게 */
}

button[type="submit"]:active {
  transform: translateY(1px); /* 클릭 시 살짝 눌리는 효과 */
}
</style>
