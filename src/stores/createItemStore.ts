import { defineStore } from "pinia";
import router from "@/router";
import type Tag from "@/entities/Tag";
import PointService from "@/services/PointService";

export interface CreateItemStore {
  coordX: number;
  coordY: number;
  createPoint: boolean;
  tags: Tag[],
  open: number,
  close: number,
  description: string,
  address: string
}

export const useCreateItemStore = defineStore({
  id: "createItem",
  state: (): CreateItemStore => {
    return {
      coordX: 0,
      coordY: 0,
      createPoint: false,
      tags: [],
      open: 0,
      close: 0,
      description: "",
      address: ""
    };
  },
  actions: {
    createItem(x: number, y: number) {
      this.coordX = x;
      this.coordY = y;
      this.createPoint = true;
      router.push("/new-point");
    },

    pushToDb() {
      PointService.postPoint({
        coordX: this.coordX,
        coordY: this.coordY,
        createPoint: this.createPoint,
        tags: this.tags,
        open: this.open,
        close: this.close,
        description: this.description,
        address: this.address
       }).then(r => {
        this.clear()
         router.push("/")
      });
    },

    updateDescription(value: any) {
      console.log(value)
      this.description = value;
    },
    updateAddress(value: string) {
      this.address = value;
    },

    clear() {
      this.coordX= 0;
      this.coordY= 0;
      this.createPoint= false;
      this.tags= [];
      this.open= 0;
      this.close= 0;
      this.description = "";
      this.address = ""
    },
  },
});
