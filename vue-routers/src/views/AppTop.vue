<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <header>
    <h1>AppTop</h1>
  </header>
  <nav id="breadcrums">
    <ul>
      <li>AppTop</li>
    </ul>
  </nav>
  <section>
    <p>
      <RouterLink v-bind:to="{ name: 'MemberList' }"> To MemberList </RouterLink>
    </p>
  </section>
</template>
