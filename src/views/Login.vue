<template>
    <div class="login-main  px-16 py-10 ">
        <Header />
        <div class="flex justify-between">
            <div class="w-3/12 mt-5">
                <h1>Identification</h1>
                <p class="mt-5">Bon retour, agent. Veuillez saisir vos informations d'identification ci-dessous.</p>
                <div class="mt-10">
                    <div>
                        <label for="email">Identifiant (mail)</label>
                        <input class="block mt-4 border-b-2 w-full mb-10 border-b-highlight bg-transparent focus:outline-none pb-2" id="email" type="email" v-model="email" />
                    </div>
                    <div>
                        <label for="password">Mot de passe</label>
                        <input class="block mt-4 border-b-2 w-full mb-10 border-b-highlight bg-transparent focus:outline-none pb-2" id="password" type="password" v-model="password" />
                    </div>
                    <Button @click="signIn()" class="mt-10">Je me connecte</Button>
                </div>
                <div class="w-full text-center mt-8">
                    <router-link class=" underline underline-offset-1" to="/register">Rejoindre l'agence</router-link>
                </div>
            </div>
            <div class="w-5/12 pb-10">
                <DescBox />
            </div>
        </div>
    </div>

</template>

<script setup>
    import DescBox from '../components/DescBox.vue';
    import Header from '../components/Header.vue';
    import Button from '../components/Button.vue';

    import { ref } from "vue";
    import { supabase } from "../lib/supabaseClient";
    import { useRouter } from "vue-router";

    const email = ref("");
    const password = ref("");
    const router = useRouter();

    async function signIn() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            alert("Error logging in : " + error.message);
        } else {
            router.push("/role");
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
.login-main{
    background-image: url("@/assets/img/backgroundPlayer.png");
    background-size: cover;
    background-position: center;
    font-size: 14px;
    text-align: justify;
    color: white;
    scroll-behavior: smooth;
    font-family: "Lato", sans-serif;
    height: 100vh;
    overflow: hidden;
}

h1, h2, h3, h4, h5, h6, label, .subtitle{
    font-family: "Oswald", sans-serif;
}


h1{
    font-size: 3em;
}

h5{
    font-size: 16px;
}

.descBox{
    scroll-margin: 15px 30px;
}

input:focus, button:focus{
    outline: none;
}
</style>