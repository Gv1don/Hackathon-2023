<template>
  <div id="card-layout">
    <div class="card-header">
      <h1>{{ itemDto?.point?.address }}</h1>
      <img height="30" :src="closeButton" id="close-button" @click="close" />
    </div>
    <div class="card-content">
      <p>{{ itemDto?.point?.description }}</p>
      <h2>Часы работы</h2>
      {{ hoursFromMilliseconds(itemDto?.point?.open) }}:00 -
      {{ hoursFromMilliseconds(itemDto?.point?.close) }}:00
        <h2>Особенности</h2>
        <p v-for="tag in itemDto?.point.tags"> {{ tag.name}}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { useItemStore } from "@/stores/itemStore";
import type { ResponseItemDto } from "@/services/ItemService";
import { hoursFromMilliseconds } from "@/utils/timeConverter";
import closeButton from "@/assets/closeButton.svg";
const itemDto: Ref<ResponseItemDto | null> = ref(null);
const itemStore = useItemStore();

itemStore.$subscribe((x) => (itemDto.value = itemStore.currentItem));

const workHours = computed(() => {
  return;
});

const close = () => {
  itemStore.unloadItem();
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid;
}

.card-content {
  padding: 16px;
}

img:hover {
  cursor: pointer;
}

#card-layout {
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.75);
  color: white;
  text-shadow: black;
  border-radius: 20px;
  width: 95vw;
  height: 75vh;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -35%);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

* {
  z-index: 10000;
}
</style>
