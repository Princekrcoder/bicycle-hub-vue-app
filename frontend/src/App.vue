<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}

</script>

<template>
<div>
    <HelloWorld />
    <router-view />

</div>
</template>
