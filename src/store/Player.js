import { defineStore } from "pinia";

export const usePlayerStore = defineStore("Player", {
  state: () => ({
    role: null,
  }),
});
