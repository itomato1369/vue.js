<script setup>
import { ref, reactive } from "vue";
// const
const no = ref(0);
const name = ref("");
const phone = ref("010-0000-0000");

// Data
// Map => 키를 지정(중복이 안된다) - 값을 반환
const map = new Map();
// map.set(1, "HER");
// map.set(2, "HIS");
// map.set(3, "ITS");
map.set(1, { name: "ABC", phone: "010-1234-5678"});
map.set(2, { name: "ZXE", phone: "010-9876-5678"});
map.set(3, { name: "JKL", phone: "010-5565-5678"});
// 2번 key값을 지운다
map.delete(2);

const mapRef = reactive(map);

// Function 
const addNewElement = () => {
//   Map 과 set  키와 값 모두 있어야함
  if (!no.value || !name.value) {
    alert("번호-이름 둘 다 입력하세요");
    return;
    //유효성 검사 조건부 실행:
  }
  
  mapRef.set(Number(no.value), name.value.trim());

  no.value = null;
  name.value = "";
};

// 
</script>
<template>
  <header>
    <h1>Map</h1>
  </header>
  <body>
    <div>
      NO: <input type="number" v-model="no"><br />
      이름: <input type="text" v-model="name"><br />
      연락처: <input type="text" v-model="phone"><br />
      <br />
      <button v-on:click="addNewElement">추가</button>
    </div>
    <br />
    <div>
        <p v-for="[no, person] in mapRef" v-bind:key="person">
            키({{ no }}), 값: {{ person.name }}, 연락처: {{ person.phone }}
        </p>
    </div>
  </body>
  
</template>
<style></style>