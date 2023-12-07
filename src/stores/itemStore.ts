import { defineStore } from "pinia";
import ItemService, { type ResponseItemDto } from "@/services/ItemService";

export interface itemStoreState {
  currentItem: ResponseItemDto | null;
  findNear: boolean;
}

export const useItemStore = defineStore({
  id: "map",
  state: (): itemStoreState => ({
    currentItem: null,
    findNear: false,
  }),
  actions: {
    startFindNear() {
      this.findNear = true;
    },
    loadItem(id: number) {
      ItemService.getItemById(id)
        .then((x) => (this.currentItem = x))
        .catch((err) => console.log("Возникла ошибка: " + err));
    },
    unloadItem() {
      this.currentItem = null;
    },
  },
});
