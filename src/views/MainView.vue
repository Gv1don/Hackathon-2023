<template>
  <div class="containerGovna">
    <map-component class="flex-element"></map-component>
    <alert-create-component v-if="isShowAlert"></alert-create-component>
    <item-component v-show="isShowItem" class="flex-element"></item-component>
    <mobile-menu-component class="flex-element"></mobile-menu-component>
  </div>
</template>

<script setup lang="ts">
import MobileMenuComponent from "@/components/MobileMenuComponent.vue";
import MapComponent from "@/components/MapComponent.vue";
import ItemComponent from "@/components/ItemComponent.vue";
import AlertCreateComponent from "@/components/AlertCreateComponent.vue";
import { ref } from "vue";
import { useItemStore } from "@/stores/itemStore";
import { useCreateItemStore } from "@/stores/createItemStore";

let isShowItem = ref(false);
let isShowAlert = ref(false);

const itemStore = useItemStore();
const itemCreateStore = useCreateItemStore();

itemCreateStore.$subscribe(() => {
  isShowAlert.value = itemCreateStore.createPoint;
});

itemStore.$subscribe((x) => {
  isShowItem.value = itemStore.currentItem !== null;
});
</script>

<style>
.containerGovna {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Растягиваем контейнер на всю высоту экрана */
}

.containerGovna div:nth-child(1) {
  flex: 80;
}

.containerGovna div:nth-child(2) {
  flex: 15;
}

.containerGovna div:nth-child(3) {
  flex: 5;
}
</style>
