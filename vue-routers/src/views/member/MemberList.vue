<script setup>
// import
import { RouterLink } from "vue-router";
import { ref } from "vue";
import axios from "axios";
//
// 반응형 Data
const customers = ref([]);
// inject...
// const memberList = inject("memberList");

// function
axios
  .get("http://localhost:3000/customers")
  .then((resp) => {
    // console.log(resp);
    customers.value = resp.data;
    // console.log(customers.value);
  })
  .catch((error) => console.log(error));
</script>
<template>
  <header>
    <h1>MemberList</h1>
  </header>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">AppTop</RouterLink></li>
      <li>MemberList</li>
    </ul>
  </nav>
  <section>
    <h3>회원리스트</h3>
    <p>신규등록은 <RouterLink v-bind:to="{ name: 'MemberAdd' }">To MemberAdd</RouterLink></p>
    <ul>
      <li v-for="member in customers" v-bind:key="member.id">
        <RouterLink v-bind:to="{ name: 'MemberDetail', params: { id: member.id } }">
          아이디 {{ member.id }} & 유저 {{ member.name }} 님</RouterLink
        >
      </li>
    </ul>
  </section>
</template>
