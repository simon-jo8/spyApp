<script setup>
import { ref, onMounted } from "vue";
import { useNewsStore } from "@/store/apiNews";

const newsStore = useNewsStore();

const fetchNews = () => {
  console.log("Fetching news...");
  newsStore.fetchNews();
};

</script>

<template>
  <main>
    <button @click="fetchNews" :disabled="newsStore.loadingState === 1">Fetch News</button>
    <div class="loading-bar-container" v-if="newsStore.loadingState > 0 && newsStore.loadingState < 5">
      <div class="loading-bar" :style="{ width: (newsStore.loadingState * 20) + '%' }"></div>
    </div>  </main>
</template>

<style>
.loading-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 10px 0;
}
.loading-bar {
  height: 20px;
  background-color: #007bff;
  border-radius: 4px;
  transition: width 0.5s ease-in-out;
}
</style>
