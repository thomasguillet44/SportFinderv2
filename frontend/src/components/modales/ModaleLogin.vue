<template>
    <div class="bloc-modale">
        <div class="overlay" @click="emitsClose"></div>
        <div class="modale">
            <div class="modale-title">Bienvenu</div>
            <div class="form-wrapper">
                <transition name="slide-up" mode="out-in">
                    <form v-if="!wantToRegister" key="login" @submit.prevent="login">
                        <div class="formGroup">
                            <label for="user_login">Login</label>
                            <input class="custom-input" type="text" id="user_login" v-model="user.name" placeholder="Entrez votre nom d'utilisateur..."/>
                        </div>
                        <div class="formGroup">
                            <label for="user_password">Mot de passe</label>
                            <input class="custom-input" type="password" id="user_password" v-model="user.password" placeholder="Entrez votre mot de passe..."/>
                        </div>
                        <div v-if="errorLoginMessage" class="error-message">
                            {{ errorLoginMessage }}
                        </div>
                        <div class="btn-login-container">
                            <button class="btn btn-primary" type="submit" :disabled="isLoading">
                                {{ isLoading ? 'Connecting...' : 'Valider' }}
                            </button>
                        </div>
                        <button class="btn toggle-register-btn" @click="toggleRegister"> 
                            Vous n'avez pas de compte ? 
                            Enregistrez vous ici !
                        </button>
                    </form>

                    <form v-else key="register" @submit.prevent="register">
                        <div class="formGroup">
                            <label for="reg_username">Nom d'utilisateur</label>
                            <input class="custom-input" type="text" id="reg_username" v-model="newUser.username" />
                        </div>
                        <div class="formGroup">
                            <label for="reg_email">Email</label>
                            <input class="custom-input" type="email" id="reg_email" v-model="newUser.email" />
                        </div>
                        <div class="formGroup">
                            <label for="reg_password">Mot de passe</label>
                            <input class="custom-input" type="password" id="reg_password" v-model="newUser.password" />
                        </div>

                        <div v-if="errorRegisterMessage" class="error-message">
                            {{ errorRegisterMessage }}
                        </div>

                        <div class="btn-login-container">
                            <button class="btn btn-primary" type="submit">Valider</button>
                        </div>

                        <button type="button" class="btn toggle-register-btn" @click="toggleRegister">
                            Retour à la connexion
                        </button>
                    </form>
                </transition>
            </div>                    
        </div>
    </div> 
</template>
<script setup>
import { ref } from 'vue';
import { loginServiceFrontend } from '@/services/loginServiceFrontend.js';
import { registerServiceFrontend } from '@/services/registerServiceFrontend.js';

const emits = defineEmits(['close', 'login-success']);

function emitsClose() {
    emits('close');
}

// PARTIE LOGIN
const user = ref({
    name: '',
    password: ''
});

const errorLoginMessage = ref('');
const errorRegisterMessage = ref('');

const isLoading = ref(false);

const showError = (errorMessage, message) => {
    errorMessage.value = message;

    setTimeout(() => {
        errorMessage.value = '';
    }, 3000); // 3 secondes
}

const login = async () => {
    isLoading.value = true;
    errorLoginMessage.value = '';

    try {
        const loginResult = await loginServiceFrontend(user.value.name, user.value.password);
        if (loginResult.status === 200) {
            const token = loginResult.data.token;
            const username = loginResult.data.user.username;
            const userId = loginResult.data.user.id;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userid', userId);

            emits('login-success', {
                token: token,
                username: username
            });
            
            alert('Connexion réussie !');

            emitsClose();
        } else {
            showError(errorLoginMessage, 'Identifiants incorrects. Veuillez réessayer.');
        }
    } catch (error) {
        showError(errorLoginMessage, 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    } finally {
        isLoading.value = false;
    }
};

//PARTIE REGISTER
const wantToRegister = ref(false);

const newUser = ref({
    username: '',
    email: '',
    password: ''
});

function toggleRegister() {
    wantToRegister.value = !wantToRegister.value;
}

const register = async () => {
    isLoading.value = true;
    errorRegisterMessage.value = '';

    try {
        const registerResult = await registerServiceFrontend(newUser.value.username, newUser.value.email, newUser.value.password);
        if (registerResult.status === 200) {
            const token = registerResult.data.token;
            const username = registerResult.data.user.username;
            const userId = registerResult.data.user.id;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('userid', userId);

            emits('login-success', {
                token: token,
                username: username
            });
            
            alert('Enregistrement du compte réussi !');

            wantToRegister.value = false;

            emitsClose();
        } else {
            showError(errorRegisterMessage, 'Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    } catch (error) {
        showError(errorRegisterMessage, 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
        isLoading.value = false;
    }
};
</script>