<template>
<div>
  <header />
    <HelloWorld />
    <router-view />

</div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue';
import { RouterView } from 'vue-router';
import header from './components/header.vue';
</script>


