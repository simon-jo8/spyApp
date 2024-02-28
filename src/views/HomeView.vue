<script setup>
import { ref, onMounted } from "vue";
import { useNewsStore } from "@/store/apiNews";

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.fetchNews();
});
</script>

<template>
  <main>
    {{ newsStore.news }}
  </main>
</template>
