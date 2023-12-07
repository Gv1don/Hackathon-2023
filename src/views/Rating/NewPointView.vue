<template>
  <div>
    <div class="header">
      <button type="button" class="btn" @click="toggleComponent">
        <img :src="closeButton" height="10" />
      </button>
      <span style="margin-left: 6vh"
        >Добавление точки</span
      >
    </div>
    <div class="content">
      <NewPointFirstComponent></NewPointFirstComponent>
    </div>
      <input v-model="store.description" placeholder="Описание">
      <input v-model="store.address" placeholder="Адрес (название)">
      <button @click="addButton">
          Добавить точку
      </button>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import closeButton from "@/assets/closeButton.svg";
import { onMounted } from "vue";
import NewPointFirstComponent from "@/views/Rating/NewPointFirstComponent.vue";
import {useCreateItemStore} from "@/stores/createItemStore";
import router from "@/router";

const store = useCreateItemStore();


const addButton = () => {
  store.pushToDb();
}

const toggleComponent = () => {
    store.clear();
    router.push("/")
}

</script>

<style>
.header {
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 2vh;
  border-bottom: 0.1vh solid black;
  border-bottom-left-radius: 3vh;
  border-bottom-right-radius: 3vh;
}

.content {
  background-color: #eee;
}
</style>
