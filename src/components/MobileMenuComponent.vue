<template>
  <div class="menu">
    <button @click="findNear">
      <img :src="mapIcon" /><br />
      Найти ближайший
    </button>
    <router-link
      to="/auth"
      class="no-custom-styles"
      v-if="!userStore.isAuthentificated"
      ><img :src="loginIcon" height="30" /><br />
      Войти
    </router-link>
    <button
      @click="createPoint"
      v-if="userStore.isAuthentificated && !isCloseMode"
    >
      <img :src="addButton" /><br />
      Добавить точку
    </button>
    <button
      @click="closeMode"
      v-if="userStore.isAuthentificated && isCloseMode"
    >
      <img :src="addButton" /><br />
      Закрыть режим
    </button>
  </div>
</template>

<script setup lang="ts">
import mapIcon from "@/assets/mapIcon.svg";
import loginIcon from "@/assets/loginIcon.svg";
import { useUserStore } from "@/stores/userStore";
import { useItemStore } from "@/stores/itemStore";
import addButton from "@/assets/addButton.svg";
import { useCreateItemStore } from "@/stores/createItemStore";
import { ref } from "vue";

const itemStore = useItemStore();
const userStore = useUserStore();
const createItemStore = useCreateItemStore();

const isCloseMode = ref(false);

const closeMode = () => {
  isCloseMode.value = false;
  createItemStore.createPoint = false;
};

const createPoint = () => {
  isCloseMode.value = true;
  createItemStore.createPoint = true;
};

const findNear = () => {
  itemStore.findNear = true;
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.menu {
  /*border: 1px black solid;*/
  border-radius: 20px;
  position: absolute;
  bottom: 2vh;
  width: 95vw;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
}

button {
  background-color: rgba(0, 0, 0, 0);
  padding: 5px;
  border: none;
  border-radius: 10px;
  color: white;
  min-width: 25vw;
}

.no-custom-styles {
  background-color: rgba(0, 0, 0, 0);
  padding: 5px;
  border: none;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  min-width: 25vw;
  /* Другие свойства по умолчанию, которые вы хотите сбросить */
}
.no-custom-styles:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

button:active {
  background-color: rgba(0, 0, 0, 0);
  padding: 5px;
  border: none;
  border-radius: 10px;
  color: white;
}
</style>
