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
  <div>
    <!-- NAV -->
  <Motion
    tag="nav"
    :initial="{ opacity: 0, y: -40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 0.7 } }"
    :class="[
      'w-full flex justify-center py-4 z-50',
      isSticky ? 'fixed top-0 bg-black shadow-md' : 'absolute'
    ]"
  >
    <div
      :class="[
        'bg-black py-4 flex justify-between items-center transition-all duration-500',
        isSticky ? 'w-full max-w-[1280px] px-6' : 'w-[90%] px-8 rounded-full'
      ]"
    >
      <!-- Logo Motion -->
      <Motion
        tag="h1"
        class="text-white text-xl font-bold"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.2 } }"
      >
        <RouterLink to="/">Bicycle Hub</RouterLink>
      </Motion>

      <!-- Desktop Nav Motion -->
      <Motion
        tag="ul"
        class="hidden md:flex gap-6 text-white"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.4 } }"
      >
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/products">Bicycle</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>

        <li class="relative">
          <RouterLink to="/cart" class="text-green-500">🛒</RouterLink>
          <span
            v-if="totalCartItems"
            class="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ totalCartItems }}
          </span>
        </li>
      </Motion>

      <!-- Mobile Menu Icon -->
      <Motion
        tag="button"
        class="md:hidden text-white text-2xl"
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
    class="fixed inset-0 bg-black/50 z-[998]"
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :leave="{ opacity: 0 }"
    @click="toggleMenu"
  />

  <!-- Mobile Drawer -->
  <Motion
    v-if="isOpen"
    tag="div"
    class="fixed top-0 right-0 h-full w-[70%] bg-black text-white p-8 z-[999]"
    :initial="{ x: 300, opacity: 0 }"
    :enter="{ x: 0, opacity: 1, transition: { duration: 0.5 } }"
    :leave="{ x: 300, opacity: 0 }"
  >
    <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
    <RouterLink to="/products" @click="toggleMenu">Bicycle</RouterLink>
    <RouterLink to="/about" @click="toggleMenu">About</RouterLink>
    <RouterLink to="/contact" @click="toggleMenu">Contact</RouterLink>
  </Motion>
  </div>
</template>
