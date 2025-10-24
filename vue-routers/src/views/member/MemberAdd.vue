<script setup>
// import
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
//
// 기초 Data
// router 객체
const router = useRouter();
// 반응형 Data
const member = reactive({
  id: 0,
  name: "",
  email: "",
  points: 0,
  note: "",
});
// inject...
// const memberList = inject("memberList");

// function
// const onAdd = () => {
//   // 추가
//   memberList.set(member.id, member);
//   // 목록이동 push
//   router.push({ name: "MemberList" });
// };
const onAdd = async () => {
  try {
    // member 객체의 사본
    const dataToSend = {
      name: member.name,
      email: member.email,
      phone: member.points,
      address: member.note,
    };
    // 전송
    const response = await axios.post("http://localhost:3000/customer", dataToSend);
    console.log(response.data);
    // push 페이지 이동
    router.push({ name: "MemberList" });
  } catch (error) {
    console.error("실패", error);
  }
};
</script>
<template>
  <header>
    <h1>MEMBER Add</h1>
  </header>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">AppTop</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">MemberList</RouterLink></li>
      <li>MemberAdd</li>
    </ul>
  </nav>
  <section>
    <p><RouterLink v-bind:to="{ name: 'MemberList' }">Back To MemberList</RouterLink></p>
    <h3>Add Member List</h3>
    <p>회원정보를 입력하고 추가 버튼을 누르세요</p>
    <form v-on:submit.prevent="onAdd">
      <dl>
        <dt><label for="">ID</label></dt>
        <dd><input type="number" v-model.number="member.id" /></dd>

        <dt><label for="">NAME</label></dt>
        <dd><input type="text" v-model="member.name" /></dd>

        <dt><label for="">E-mail</label></dt>
        <dd><input type="text" v-model="member.email" /></dd>

        <dt><label for="">Points</label></dt>
        <dd><input type="number" v-model.number="member.points" /></dd>

        <dt><label for="">비고</label></dt>
        <dd><input type="text" v-model="member.note" /></dd>
      </dl>
      <button type="submit">ADD button</button>
    </form>
  </section>
</template>
