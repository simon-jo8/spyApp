<template>
  <div class="player">
    <h2>{{ role }}</h2>
    <img :src="image" alt="role" />
  </div>
</template>

<script setup>
const props = defineProps({
  role: String,
  image: String,
});
</script>

<style scoped lang="scss">
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    display: flex;
    justify-content: center;
    color: #fff;
    font-family: "Orbitron", sans-serif;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  img {
    width: 75%;
    display: flex;
    justify-content: center;
    transition: .3s all ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
  }
}
</style>
