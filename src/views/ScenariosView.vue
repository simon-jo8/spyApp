<template>
  <div class="about">
    <img
      src="../assets/img-scenario/budapest/floor-plan.jpg"
      class="image-container"
      style="right: 35vw; top: 32vh"
      @click="openModal(0)"
    />
    <img
      src="../assets/img-scenario/tour-eiffel/floor-plan.png"
      class="image-container"
      style="left: 42vw; top: 32vh"
      @click="openModal(1)"
    />
    <img
      src="../assets/img-scenario/siege-cia/floor-plan.png"
      class="image-container"
      style="left: 17vw; top: 35vh"
      @click="openModal(2)"
    />
    <img
      src="../assets/img-scenario/renault/floor-plan.png"
      class="image-container"
      style="left: 47vw; top: 75vh"
      @click="openModal(4)"
    />
  </div>

  <!-- Modal -->
  <div class="modal" v-if="modalOpen">
    <img src="../assets/images/Character.png" class="character-right" />

    <!-- Modal Scenario Intro -->
    <div v-if="currentModal === 1" class="modal-content">
      <div class="modal-header">
        <div class="location">
          <span class="icon-location">&loz;</span>
          <h2>San Francisco</h2>
        </div>
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <div class="modal-container">
        <p class="mission-name">
          <span>Intitulé de la mission</span>
          : {{ title }}
        </p>
        <p class="teammate-name">
          <span>Coéquipier(e)</span>
          : Kimberley
        </p>
        <div class="mission-description">
          <p>
            <span>Description : </span>
            {{ description }}
          </p>
          <img :src="imgBattlePlanMission" />
        </div>
      </div>
      <button class="button-next" @click="nextModal">Suivant</button>
    </div>

    <!-- Modal List of Suspects -->
    <div v-else-if="currentModal === 2" class="modal-content">
      <div class="modal-header">
        <h1>Liste des suspects</h1>
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <ul class="suspects-list">
        <li>
          <div class="suspect-image-container">
            <img src="../assets/images/suspect1.png" />
          </div>
          <p>
            <span>Kevin Roberts</span> : Kevin est un entrepreneur en
            construction bien établi, spécialisé dans les projets immobiliers de
            grande envergure. Il est connu pour son tempérament colérique et son
            mécontentement envers le gouvernement et les entreprises. Certains
            pensent qu'il aurait pu planifier l'explosion de la banque comme un
            acte de rébellion contre le système financier.
          </p>
        </li>
        <li>
          <div class="suspect-image-container">
            <img src="../assets/images/suspect1.png" />
          </div>
          <p>
            <span>Kevin Roberts</span> : Kevin est un entrepreneur en
            construction bien établi, spécialisé dans les projets immobiliers de
            grande envergure. Il est connu pour son tempérament colérique et son
            mécontentement envers le gouvernement et les entreprises. Certains
            pensent qu'il aurait pu planifier l'explosion de la banque comme un
            acte de rébellion contre le système financier.
          </p>
        </li>
        <li>
          <div class="suspect-image-container">
            <img src="../assets/images/suspect1.png" />
          </div>
          <p>
            <span>Kevin Roberts</span> : Kevin est un entrepreneur en
            construction bien établi, spécialisé dans les projets immobiliers de
            grande envergure. Il est connu pour son tempérament colérique et son
            mécontentement envers le gouvernement et les entreprises. Certains
            pensent qu'il aurait pu planifier l'explosion de la banque comme un
            acte de rébellion contre le système financier.
          </p>
        </li>
        <li>
          <div class="suspect-image-container">
            <img src="../assets/images/suspect1.png" />
          </div>
          <p>
            <span>Kevin Roberts</span> : Kevin est un entrepreneur en
            construction bien établi, spécialisé dans les projets immobiliers de
            grande envergure. Il est connu pour son tempérament colérique et son
            mécontentement envers le gouvernement et les entreprises. Certains
            pensent qu'il aurait pu planifier l'explosion de la banque comme un
            acte de rébellion contre le système financier.
          </p>
        </li>
      </ul>
      <button class="button-next" @click="nextModal">Suivant</button>
    </div>

    <!-- Modal Scenario Locations -->
    <div v-else-if="currentModal === 3" class="modal-content">
      <div class="modal-header">
        <h1>Lieux d'intervention</h1>
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <img src="../assets/images/city-locations.png" class="city-locations" />
      <button class="button-next" @click="nextModal">Suivant</button>
    </div>

    <!-- Modal Start Scenario -->
    <div v-else-if="currentModal === 4" class="modal-content">
      <div class="modal-header-empty">
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <div class="centered-content">
        <button class="start-button" @click="startScenario">Commencer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "redaxios";
import tourEiffel from "../assets/img-scenario/tour-eiffel/battle-plan.png";
import siegeCia from "../assets/img-scenario/siege-cia/battle-plan.png";
import renault from "../assets/img-scenario/renault/battle-plan.png";
import budapest from "../assets/img-scenario/budapest/battle-plan.png";

export default {
  data() {
    return {
      modalOpen: false,
      currentModal: 1,
      mission: [],
      description: "",
      title: "",
      imgBattlePlan: [],
      imgBattlePlanMission: "",
    };
  },

  mounted() {
    this.fetchMissions();
    this.battleplan();
  },
  methods: {
    battleplan() {
      this.imgBattlePlan = [budapest, tourEiffel, siegeCia, , renault];
    },

    fetchMissions() {
      axios
        .get("https://fsfahuwxzvtcnnxnzrtz.supabase.co/rest/v1/scenarios", {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.mission = response.data;
          console.log(this.mission);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(id) {
      console.log(this.mission);
      this.modalOpen = true;
      this.description = this.mission[id].description;
      this.title = this.mission[id].title;
      this.imgBattlePlanMission = this.imgBattlePlan[id];
    },
    closeModal() {
      this.modalOpen = false;
      this.currentModal = 1;
    },
    nextModal() {
      if (this.currentModal < 4) {
        this.currentModal++;
      }
    },
    startScenario() {
      alert("Paye si tu veux jouer 😀😀😀😀");
    },
  },
};
</script>

<!-- CSS Map -->
<style scoped>
.about {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/world-map.jpg");
  background-size: cover;
  background-position: center;
}

.image-container {
  position: absolute;
  width: 10%;
  height: 12%;
  object-fit: cover;
  border: 2px solid white;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

img.image-container:hover {
  transform: scale(1.5);
}
</style>

<!-- CSS Modal -->
<style scoped>
.character-right {
  position: absolute;
  left: -2vw;
  bottom: 0;
  height: 80%;
  z-index: 1;
}

.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.modal-content {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 15px 30px 30px 30px;
  width: 52vw;
  height: 65vh;
  z-index: 0;
  border: 5px solid #22beef;
  border-top: 5px dashed #22beef;
  border-left: 5px dashed #22beef;
  outline: 5px solid #22beef;
  outline-offset: -17px;
  border-radius: 30px;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  width: 46vw;
}

.modal-container,
.suspects-list,
.city-locations {
  overflow: scroll;
  height: 50vh;
  margin-top: 9vh;
}

.button-next {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  bottom: 8vw;
  right: 21%;
  border: 5px dashed #22beef;
  border-radius: 300px;
  background: black;
  font-size: 18px;
  font-weight: bolder;
  color: #22beef;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

.button-next:hover,
.button-next:focus {
  background: #092731;
}

.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #22beef;
  text-decoration: none;
  cursor: pointer;
}
</style>

<!-- CSS Modal Scenario Intro -->
<style scoped>
.modal-header h1 {
  font-size: 35px;
  margin: 5px 0 0 5px;
}

span.icon-location {
  color: white;
  font-size: 30px;
  font-weight: bold;
  margin-top: 2px;
}

.location {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  background: #d9d9d949;
  border-radius: 10px;
  margin-top: 15px;
}

.location span {
  color: white;
}

.location h2 {
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
}

.modal-content .mission-name,
.teammate-name,
.mission-description {
  margin-top: 15px;
  font-size: 18px;
}

.mission-name span {
  font-weight: bolder;
}

.teammate-name span {
  font-weight: bolder;
}

.mission-description {
  display: flex;
  flex-direction: row;
  align-items: start;
}

.mission-description p {
  max-width: 60%;
}

.mission-description p span {
  font-size: 18px;
  font-weight: bolder;
}

.mission-description img {
  max-width: 45%;
  max-height: 45%;
  margin-left: 30px;
  object-fit: cover;
  border: 3px solid transparent;
  border-image: linear-gradient(to bottom right, #22beef, #ffffff) 1;
}
</style>

<!-- CSS Modal List of Suspects -->
<style scoped>
.suspects-list {
  list-style: none;
}

.suspects-list li {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
}

.suspects-list li .suspect-image-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 100px;
  min-height: 100px;
  border: 2px solid #22beef;
  border-radius: 300px;
}

.suspects-list li .suspect-image-container img {
  width: 80px;
  margin-bottom: 2px;
}

.suspects-list li p {
  margin-left: 20px;
  font-size: 15px;
}

.suspects-list li p span {
  font-weight: bold;
}
</style>

<!-- CSS Modal City Locations -->
<style scoped>
.city-locations {
  width: 100%;
}
</style>

<!-- CSS Modal Start Scenario -->
<style scoped>
.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px);
}

.centered-content button {
  background: black;
  border: 5px solid transparent;
  font-size: 40px;
  font-weight: bolder;
  padding: 10px 70px;
  color: #22beef;
  border-image: linear-gradient(to right, #22beef, #ffffff) 1;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
}

.centered-content button:hover {
  transform: scale(1.2);
}
</style>
