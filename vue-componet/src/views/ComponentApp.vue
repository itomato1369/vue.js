<script setup>
//★★ 컴포넌트 ★★
import OneSection from "../components/OneSection.vue";
import { ref } from "vue";
//
// const
const fName = ref("성함");
const fContent = ref("APP START");
const starName = ref("기본값");

const mapData = new Map();
mapData.set(1, { title: "copilot", content: "Auto code" });
mapData.set(2, { title: "gemini", content: "Gem is gold" });
mapData.set(3, { title: "chatgpt", content: "Make money" });

// Data
const starPoint = ref(Math.ceil(Math.random() * 5));

//function
console.log(fName, fContent);
const createStarPoint = (name) => {
  starPoint.value = Math.ceil(Math.random() * 5);
  starName.value = name;
};
</script>
<template>
  <header>
    <h1>Component</h1>
    <p>{{ starName }} > 별점 : {{ starPoint }}</p>
    <button v-on:click="createStarPoint">무작위 값 생성</button>
  </header>
  <body>
    <section>
      <h2>컴포넌트 1개</h2>
      <OneSection title="First" v-on:callStarPoint="createStarPoint" />
    </section>
    <section>
      <h2>컴포넌트 여러개</h2>
      <!-- ★map은 키를 무조건 지정★ -->
      <OneSection
        v-for="[no, item] in mapData"
        v-bind:key="no"
        v-bind:title="item.title"
        v-bind:content="item.content"
        v-on:callStarPoint="createStarPoint"
      />
    </section>
  </body>
</template>
<style>
section {
  border: green 3px solid;
  margin: 10px;
}
</style>
