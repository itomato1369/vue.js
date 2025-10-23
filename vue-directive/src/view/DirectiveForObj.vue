<template>
  <header>
    <h1>ForObj</h1>
  </header>
  <main>
    <p>이름 : <input type="text" v-model="fName" /></p>
    <p>나이 : <input type="number" v-model.number="fAge" /></p>
    <p><button v-on:click="addFriend">친구추가</button></p>
    <br />
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="friend in friends" v-bind:key="friend.name">
          <td>{{ friend.name }}</td>
          <td>{{ friend.age }}</td>
        </tr>
      </tbody>
    </table>
    
  </main>
</template>
<script setup>
import { ref, reactive } from "vue";
//
// reactive: 객체나 배열을 반응형으로 만듭니다. 주로 복잡하거나 구조적인 데이터를 다룰 때 사용됩니다.
// Data
const friends = reactive([
  { name: "Nissan", age: 20 },
  { name: "KIA", age: 21 },
]);
let fName = ref("");
let fAge = ref(20);
// const fInfo = reactive({
//   name: "",
//   age: 20,
// });

// Function
const addFriend = () => {
  const newFriend = {
    name: fName.value.trim(),
    age: fAge.value,
  };
  friends.push(newFriend);
  fName.value = null;
  fAge.value = null;
};
</script>
<style>
/* 1. 기본 스타일 재설정 */
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7; /* 배경색 */
  margin: 0;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

/* 2. 주 컨테이너 (main) 스타일 */
main {
  width: 100%;
  max-width: 500px; /* 최대 너비 제한 */
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 3. 헤더 (h1) 스타일 */
header h1 {
  background-color: #42b883; /* VueJS 녹색 */
  color: white;
  padding: 15px 0;
  margin: -30px -30px 20px -30px; /* main 내부에서 상단 여백 제거 */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
}

/* 4. 입력 필드와 버튼 */
p {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

input[type="text"],
input[type="number"] {
  flex-grow: 1; /* 남은 공간을 채우도록 확장 */
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #42b883; /* 포커스 시 색상 변경 */
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #35495e; /* VueJS 짙은 색 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2c3e50;
}

/* 5. 테이블 스타일 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
}

thead {
  background-color: #eee;
}

th {
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  color: #35495e;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

/* 마지막 행 하단 선 제거 */
tbody tr:last-child td {
  border-bottom: none;
}
</style>
