import type CommDto from "@/entities/CommDto";

const API_URL = "";

export default {
  getComms(id: number): Promise<CommDto[]> {
    return fetch(API_URL).then((response) => response.json());
  },
};
