<template>
  <nav
    :class="[
      'w-full flex justify-center py-4 z-50 transition-all duration-500',
      isSticky ? 'fixed top-0 bg-black shadow-md' : 'absolute'
    ]"
  >
    <div
      :class="[
        'bg-black py-4 flex items-center justify-between space-x-8 transition-all duration-500',
        isSticky
          ? 'w-full max-w-[1280px] px-6 rounded-none'
          : 'w-[95%] md:w-[90%] px-8 rounded-full'
      ]"
    >
      <!-- Logo -->
      <Motion
        tag="h1"
        class="text-white md:text-2xl font-bold"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <RouterLink to="/">Bicycle Hub</RouterLink>
      </Motion>

      <!-- Desktop Menu -->
      <Motion
        tag="ul"
        class="hidden md:flex items-center space-x-6"
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="text-white font-semibold hover:text-gray-300 transition"
          >
            {{ link.label }}
          </RouterLink>
        </li>

        <!-- Cart -->
        <li class="relative">
          <RouterLink to="/cart" class="text-green-500">
            <ShoppingCart class="w-5 h-5" />
          </RouterLink>
          <span
            v-if="totalItems > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ totalItems }}
          </span>
        </li>
      </Motion>

      <!-- Mobile Cart -->
      <div class="relative md:hidden">
        <RouterLink to="/cart" class="text-green-500">
          <ShoppingCart class="w-5 h-5" />
        </RouterLink>
        <span
          v-if="totalItems > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full"
        >
          {{ totalItems }}
        </span>
      </div>

      <!-- Mobile Toggle -->
      <div class="md:hidden text-white text-2xl cursor-pointer" @click="toggle">
        <X v-if="isOpen" />
        <Menu v-else />
      </div>
    </div>

    <!-- Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
      @click="toggle"
    />

    <!-- Mobile Drawer -->
    <div
      class="fixed top-0 right-0 h-full w-[75%] bg-black text-white p-8 flex flex-col gap-6 z-[999]
             transition-transform duration-500"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <button class="self-end text-3xl" @click="toggle">
        <X />
      </button>

      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-semibold hover:text-gray-300"
        @click="toggle"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { Menu, X, ShoppingCart } from "lucide-vue-next";
import { Motion } from "@vueuse/motion";

const isOpen = ref(false);
const isSticky = ref(false);

const cart = useCartStore();
const totalItems = computed(() => cart.totalItems);

const toggle = () => (isOpen.value = !isOpen.value);

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Bicycle" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/signup", label: "Sign Up" }
];

const handleScroll = () => {
  isSticky.value = window.scrollY > 100;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>
