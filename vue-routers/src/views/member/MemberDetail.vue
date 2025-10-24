<script setup>
// import
import { defineProps, ref } from "vue";
import axios from "axios";
//
// 반응형 data
const member = ref({});
// defineProps...
const props = defineProps({ id: Number });
// inject...
// const memberList = inject("memberList");

// //
// const member = memberList.get(props.id);
// function
// axios...
axios
  .get("http://localhost:3000/customers/" + props.id)
  .then((resp) => {
    console.log(resp);
    member.value = resp.data[0];
  })
  .catch((error) => console.log(error));
</script>
<template>
  <header>
    <h1>MEMBER DETAIL</h1>
  </header>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">AppTop</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">MemberList</RouterLink></li>
      <li>MemberDetail</li>
    </ul>
  </nav>
  <section>
    <p><RouterLink v-bind:to="{ name: 'MemberList' }">Back To MemberList</RouterLink></p>
    <h3>Detailed information</h3>
    <dl>
      <dt>Your ID</dt>
      <dd>{{ member.id }}</dd>
      <dt>NAME</dt>
      <dd>{{ member.name }}</dd>
      <dt>E-mail</dt>
      <dd>{{ member.email }}</dd>
      <dt>Points</dt>
      <dd>{{ member.phone }}</dd>
      <dt>비고</dt>
      <dd>{{ member.address }}</dd>
    </dl>
  </section>
</template>
