<template>
  <main>
    <h1>Informations</h1>
    <div class="ChooseRole">
      <Player
        :role="role"
        :image="'/src/assets/img/' + role + '.png'"
        class="player"
      />
      <form @submit.prevent="submit">
        <label for="name">Nom</label>
        <input id="name" type="text" v-model="name" />
        <label for="gender">Civilité</label>
        <select id="gender" type="text" v-model="gender">
          <option value="choisir une option" disabled>Choisir une option</option>
          <option value="Monsieur">Monsieur</option>
          <option value="Madame">Madame</option>
        </select>
        <label for="age">Âge</label>
        <input id="age" type="text" v-model="age" />
        <label for="city">Ville</label>
        <input id="city" type="text" v-model="city" />
        <label for="agencies">Agence</label>
        <select id="agencies" type="text" v-model="agencies">
          <option value="choisir une option" disabled>Choisir une option</option>
          <option value="US ARMY">US ARMY</option>
          <option value="CIA">CIA</option>
        </select>
        <button type="submit">Valider</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Player from "@/components/Player.vue";
import { usePlayerStore } from "@/store/Player";
import axios from "redaxios";

const playerStore = usePlayerStore();
const name = ref("");
const gender = ref("");
const age = ref("");
const city = ref("");
const agencies = ref("");
const role = ref(playerStore.role);

const router = useRouter();

// Function to submit the form
const submit = () => {
  axios
    .post(
      "https://fsfahuwxzvtcnnxnzrtz.supabase.co/rest/v1/characters",
      {
        admin: playerStore.role === "gameMaster" ? true : false,
        name: name.value,
        gender: gender.value,
        age: age.value,
        city: city.value,
        agencies: agencies.value,
        agency_id: 1,
        current_scenario_id: 1,
      },
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ`,
        },
      }
    )
    .then((response) => {
      console.log(response);
      router.push("/scenarios");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped lang="scss">
main {
  background-image: url("@/assets/img/backgroundPlayer.png");
  background-size: cover;
  background-position: center;

  min-height: 100vh;
  width: 100vw;

  .ChooseRole {
    display: flex;
    justify-content: space-around;
    margin-top: 80px;

    .player {
      width: 30%;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 50%;
      input,
      select {
        margin-bottom: 5%;
        background-color: transparent;
        border: #22beef 2px solid;
        height: 45px;
        border-radius: 7px;
        padding-left: 15px;
        color: #fff;
      }
      label {
        margin-bottom: 2%;
        color: #fff;
      }

      button {
        background-color: #22beef;
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 7px;
        cursor: pointer;
        margin-top: 2%;
        margin-bottom: 5%;
      }
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
