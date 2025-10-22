<template>
  <header>
    <h1>Model</h1>
  </header>
  <main>
    <textarea v-bind:rows="rCount" v-model="textAreaInput"></textarea>
    <p v-html="textAreaInput.replace(/\n/g, `<br>`)"></p>
    <br />
    <select v-model="memberType">
      <option value="일반">일반회원</option>
      <option value="이반">이반회원</option>
      <option value="삼반">삼반회원</option>
    </select>
    <p>{{ memberType }}</p>
    <br />
    <section>
      <label><input type="checkbox" v-model="selectOS" value="1" /> macOS</label><br />
      <label><input type="checkbox" v-model="selectOS" value="2" /> windows</label><br />
      <label><input type="checkbox" v-model="selectOS" value="3" /> Linux</label>
    </section>
    <p>{{ selectOS }}</p>
    <br />
    <section>
      <label><input type="radio" name="selectedOS" v-model="selectedOS" value="1" /> macOS</label
      ><br />
      <label><input type="radio" name="selectedOS" v-model="selectedOS" value="2" /> windows</label
      ><br />
      <label><input type="radio" name="selectedOS" v-model="selectedOS" value="3" /> Linux</label
      ><br />
    </section>
    <p>{{ selectedOS }}</p>
  </main>
  <footer></footer>
</template>
<script setup>
import { ref } from "vue";

// new RegExp(), /Test/
// new Array(), []

const textAreaInput = ref("test");
const rCount = ref(5);
const memberType = ref("일반");
const selectOS = ref([]);
const selectedOS = ref([]);
</script>
<style></style>
