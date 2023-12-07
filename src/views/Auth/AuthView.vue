<template>
  <header>
    <button
      type="button"
      class="btn btn-outline-primary { active: isLoginFormVisible }"
      @click="showLoginForm"
    >
      Авторизация
    </button>
    <button
      type="button"
      class="btn btn-outline-primary { active: !isLoginFormVisible }"
      @click="showRegistrationForm"
    >
      Регистрация
    </button>
  </header>
  <div v-if="isLoginFormVisible">
    <LoginForm />
  </div>
  <div v-else>
    <RegistrationForm />
  </div>
</template>

<script lang="ts">
import LoginForm from "./LoginForm.vue";
import RegistrationForm from "./RegistrationForm.vue";

export default {
  components: {
    LoginForm,
    RegistrationForm,
  },
  data() {
    return {
      isLoginFormVisible: true,
    };
  },
  methods: {
    showLoginForm() {
      this.isLoginFormVisible = true;
    },
    showRegistrationForm() {
      this.isLoginFormVisible = false;
    },
  },
};
</script>

<style scoped>
/*body {*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/

header {
  display: flex;
  max-width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 5vh;
  margin-bottom: 2vh;
  padding-bottom: 3vh;
}

/*.form-group {*/
/*  margin-bottom: 15px;*/
/*}*/
</style>
