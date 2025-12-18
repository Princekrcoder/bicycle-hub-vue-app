<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800">
        Welcome to Bicycle Hub 🚲
      </h1>

      <p class="mt-4 text-gray-600 text-lg">
        Your home page is working correctly.
      </p>

      <RouterLink
        to="/"
        class="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go Home
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
