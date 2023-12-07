<template>
  <form class="registration" @submit.prevent="registration">
    <div class="form-group">
      <div class="registration-field">
        <label for="registration">E-mail:</label>
        <input
          type="text"
          id="email"
          v-model="registrationForm.email"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        />
      </div>
    </div>
    <div class="form-group">
      <div class="registration-field">
        <label for="registration">Имя пользователя:</label>
        <input
          type="text"
          id="registration"
          v-model="registrationForm.username"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <div class="password-field">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="registrationForm.password"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <div class="password-repeat-field">
        <label for="password-repeat">Подтверждение пароля:</label>
        <input
          type="password"
          id="password-repeat"
          v-model="registrationForm.passwordrepeat"
          required
        />
      </div>
    </div>
    <button
      class="btn btn-primary"
      type="submit"
      @submit="registration"
      style="margin-right: 20vw; margin-left: 20vw; margin-bottom: 2vh"
    >
      Регистрация
    </button>
    <img :src="MainLogo" alt="ToiletFinder" />
  </form>
</template>

<script setup lang="ts">
import MainLogo from "@/assets/mainLogo.png"
import { useUserStore } from "@/stores/userStore";
import type UserDto from "@/entities/UserDto";
import router from "@/router";
import { onMounted } from "vue";

const registrationForm = {
  username: "",
  email: "",
  password: "",
  passwordrepeat: "",
};

const store = useUserStore();

onMounted(() => {
  if (store.isAuthentificated == true) {
    router.push("/");
  }
});

store.$subscribe((x) => {
  if (store.isAuthentificated === true) {
    router.push("/");
  }
});

const registration = () => {
  const newUser: UserDto = {
    id: 0,
    username: registrationForm.username,
    email: registrationForm.email,
    password: registrationForm.password,
  };

  store.registerUser(newUser);

  checkPasswords(registrationForm.password, registrationForm.passwordrepeat);
};

const checkPasswords = (password: string, passwordRepeat: string) => {
  if (password === passwordRepeat) {
    return;
  } else {
    throw new Error("Passwords error");
  }
};
</script>

<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  align-items: space-around;
  max-width: 100%;
}

.form-group {
  margin-left: 6vw;
  margin-right: 6vw;
}

.registration-field {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5vh;
}

.password-field {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5vh;
}

.password-repeat-field {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5vh;
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

.subm-reg {
  padding: 4vw;
}
</style>
