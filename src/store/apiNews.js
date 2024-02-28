import { defineStore } from "pinia";
import axios from "redaxios";

export const useNewsStore = defineStore("News", {
  state: () => ({
    news: null,
    test: "test",
  }),

  actions: {
    async fetchNews() {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=fr&apiKey=c603dbef27df4af8b3ab80864dbaff7b&pageSize=10"
        );
        this.news = response.data.articles;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
