<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);
const isSticky = ref(false);

// dummy cart (Pinia replaceable)
const cartItems = ref([{ qty: 2 }, { qty: 1 }]);

const totalCartItems = computed(() =>
  cartItems.value.reduce((t, i) => t + i.qty, 0)
);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleScroll = () => {
  isSticky.value = window.scrollY > 100;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <!-- NAV -->
  
</template>
