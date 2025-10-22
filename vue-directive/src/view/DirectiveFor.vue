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
<stlye>

</stlye>
