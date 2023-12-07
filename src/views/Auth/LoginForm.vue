<template>
  <form class="login" @submit.prevent="login">
    <div class="form-group">
      <div class="login-field">
        <label for="login">E-mail:</label>
        <input
          type="text"
          id="login"
          v-model="loginForm.email"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="password-field">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="loginForm.password"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <input
        type="checkbox"
        id="saveData"
        v-model="loginForm.saveData"
        style="margin-right: 1vh"
      />
      <label for="saveData">Запомнить меня</label>
    </div>
    <button
      class="btn btn-primary"
      type="submit"
      @submit="login"
      style="margin-right: 20vw; margin-left: 20vw; margin-top: 5vh"
    >
      Войти
    </button>
    <div class="img-container">
      <img class="logo" :src="TFlong" alt="ToiletFinder" />
    </div>
  </form>
</template>

<script setup lang="ts">
import TFlong from "@/assets/TFlong.png"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import type UserDto from "@/entities/UserDto";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import router from "@/router";

const loginForm = ref({
  email: "",
  password: "",
  saveData: false,
});

const store = useUserStore();

onMounted(() => {
  if (store.isAuthentificated == true) {
    router.push("/");
  }
});

const login = () => {
  const newUser: UserDto = {
    id: 0,
    username: "",
    password: loginForm.value.password,
    email: loginForm.value.email,
  };

  store.loginUser(newUser);
};

store.$subscribe((x) => {
  if (store.isAuthentificated == true) {
    router.push("/");
  }
});
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: space-between;
}

.form-group {
  margin-left: 6vw;
  margin-right: 6vw;
}

.login-field {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2vh;
}

.password-field {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.img-container {
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  width: 100%;
}

input[type="text"],
input[type="password"],
input[type="password-repeat"] {
  display: flex;
  padding: 8px;
  font-size: 16px;
  border: 0.1vh solid #ccc;
  border-radius: 1vh;
}

.logo {
  max-width: 80vw;
  max-height: 80vh;
}

.subm-reg {
  padding: 4vw;
}
</style>
