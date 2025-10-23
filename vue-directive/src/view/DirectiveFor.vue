<template>
  <header>
    <h1>FOR</h1>
    <ul>
      <li>
        <p v-for="item in iList" v-bind:key="item">{{ item }}</p>
      </li>
    </ul>
  </header>
  <main>
    친구이름: <input type="text" v-model="newFriend" v-on:change="addNewFriend" />
    <h3>친구목록</h3>
    <ul>
      <li>
        <p v-for="name in friends" v-bind:key="name">{{ name }}</p>
      </li>
    </ul>
    <br />
    <p v-for="num in 3" v-bind:key="num">3 * {{ num }} = {{ 3 * num }}</p>
  </main>
</template>
<script setup>
import { ref } from "vue";

// Data
const ary = ["ke1", "book", "pen", "phone"];
const iList = ref(ary);
const friends = ref(["Hyundai", "KIA"]);
let newFriend = ref("Toyota");

// Function
const addNewFriend = () => {
  friends.value.push(newFriend.value.trim());
  newFriend = ref("");
};
</script>
<style>
/* 1. 기본 설정 및 컨테이너 */
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f7f6; /* 아주 밝은 배경 */
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

header,
main {
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 20px 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

header {
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #e0e0e0;
}

main {
  border-radius: 0 0 8px 8px;
  padding-top: 10px;
}

/* 2. 제목 스타일 */
h1 {
  font-size: 1.8em;
  color: #333;
  border-bottom: 2px solid #5d6e7e; /* 단조로운 포인트 색상 */
  padding-bottom: 5px;
  margin-top: 0;
}

h3 {
  color: #5d6e7e;
  margin-top: 25px;
  border-left: 5px solid #c9d2d8;
  padding-left: 10px;
  font-size: 1.2em;
}

/* 3. 입력 필드 스타일 */
input[type="text"] {
  width: 70%; /* 입력 필드 너비 조정 */
  padding: 8px 12px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}

input[type="text"]:focus {
  border-color: #5d6e7e;
  outline: none;
}

/* 4. 리스트 스타일 (단조롭고 깔끔하게) */
ul {
  list-style: none; /* 기본 불릿 제거 */
  padding: 0;
  margin: 15px 0;
}

ul li {
  padding: 0;
  margin: 0;
}

/* 리스트 내부의 <p> 태그 (각 항목) 스타일 */
ul li p {
  padding: 8px 15px;
  margin-bottom: 4px;
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  text-align: left;
  color: #333;
}

/* iList (상단 목록) 강조 */
header ul li p {
  background-color: #eff3f7;
  border-left: 5px solid #5d6e7e;
  font-weight: 600;
  color: #2c3e50;
}

/* 5. 구구단 출력 스타일 */
main > p {
  margin: 4px 0;
  padding: 5px 0;
  font-size: 1.1em;
  color: #666;
  text-align: left;
  border-top: 1px dotted #ccc;
}

main > p:last-of-type {
  border-bottom: 1px dotted #ccc;
}

main > p strong {
  color: #333;
  font-weight: bold;
}
</style>
