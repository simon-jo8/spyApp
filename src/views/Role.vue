<template>
  <main>
    <h1>Votre Rôle</h1>
    <div class="ChooseRole">
      <Player
        role="Joueur"
        image="/src/assets/img/player.png"
        class="player"
        @click="choosePlayer('player')"
      />
      <Player
        role="gameMaster"
        image="/src/assets/img/gameMaster.png"
        class="player"
        @click="choosePlayer('gameMaster')"
      />
    </div>
  </main>
</template>

<script setup>
import Player from "@/components/Player.vue";
import { usePlayerStore } from "@/store/Player";
import { useRouter } from "vue-router";

const playerStore = usePlayerStore();
const router = useRouter();

const choosePlayer = (role) => {
  playerStore.role = role;
  router.push("/informations");
};
</script>

<style scoped lang="scss">
main {
  background-image: url("@/assets/img/backgroundPlayer.png");
  background-size: cover;
  background-position: center;

  height: 100vh;
  width: 100vw;

  .ChooseRole {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;

    .player {
      cursor: pointer;
    }
  }
}

h1 {
  font-family: "Orbitron", sans-serif;
  font-size: 3rem;
  text-align: center;
  padding-top: 3rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
}
</style>
