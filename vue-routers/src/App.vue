<script setup>
// import
import { RouterView } from "vue-router";
import { provide, reactive } from "vue";
import axios from "axios";
// 외부 모듈 axios

// 기초 Data
const memberList = new Map();
memberList.set(123, {
  id: 123,
  name: "TRANSFORMERS",
  email: "movie@email.com",
  points: 99,
  note: "CG best",
});
memberList.set(456, {
  id: 456,
  name: "IRON MAN",
  email: "marvel@email.com",
  points: 100,
  note: "Actor best",
});

// function
// 요청서버: http://localhost:5173
// 제공서버: http://localhost:3000
axios
  .get("http://localhost:3000/customers")
  .then((resp) => console.log(resp))
  .catch((error) => console.log(error));

// provide...
provide("memberList", reactive(memberList));
</script>

<template>
  <header>
    <h1>App.vue</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  border: blue 1px solid;
  padding: 10px;
}

#breadcrums ul li {
  display: inline;
  list-style: none;
}

#breadcrums {
  margin-left: 0;
}

#breadcrums ul {
  padding-left: 0;
}

#breadcrums ul .current {
  color: red;
}

#breadcrums ul li:before {
  content: " > ";
}

#breadcrums ul li:first-child:before {
  content: none;
}
</style>
