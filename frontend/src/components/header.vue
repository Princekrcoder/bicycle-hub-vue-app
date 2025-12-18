<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);
const isSticky = ref(false);

// dummy cart (Pinia se replace ho sakta hai)
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
  <header>
    <!-- NAV -->
  <Motion
    tag="nav"
    :class="['navbar', isSticky ? 'navbar--sticky' : 'navbar--absolute']"
    :initial="{ opacity: 0, y: -40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 0.7 } }"
  >
    <div
      :class="[
        'nav-container',
        isSticky ? 'nav-container--sticky' : 'nav-container--normal'
      ]"
    >
      <!-- Logo -->
      <Motion
        tag="h1"
        class="logo"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.2 } }"
      >
        <RouterLink to="/">Bicycle Hub</RouterLink>
      </Motion>

      <!-- Desktop Nav -->
      <Motion
        tag="ul"
        class="nav-links"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.4 } }"
      >
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/products">Bicycle</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>

        <li class="cart">
          <RouterLink to="/cart">🛒</RouterLink>
          <span v-if="totalCartItems" class="cart-badge">
            {{ totalCartItems }}
          </span>
        </li>
      </Motion>

      <!-- Mobile Menu Button -->
      <Motion
        tag="button"
        class="menu-btn"
        @click="toggleMenu"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.6 } }"
      >
        {{ isOpen ? "✕" : "☰" }}
      </Motion>
    </div>
  </Motion>

  <!-- Overlay -->
  <Motion
    v-if="isOpen"
    tag="div"
    class="overlay"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :leave="{ opacity: 0 }"
    @click="toggleMenu"
  />

  <!-- Mobile Drawer -->
  <Motion
    v-if="isOpen"
    tag="div"
    class="drawer"
    :initial="{ x: 300, opacity: 0 }"
    :enter="{ x: 0, opacity: 1, transition: { duration: 0.5 } }"
    :leave="{ x: 300, opacity: 0 }"
  >
    <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
    <RouterLink to="/products" @click="toggleMenu">Bicycle</RouterLink>
    <RouterLink to="/about" @click="toggleMenu">About</RouterLink>
    <RouterLink to="/contact" @click="toggleMenu">Contact</RouterLink>
  </Motion>
  </header>
</template>

<style src="./assets/css/header.css"></style>
