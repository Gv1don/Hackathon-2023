import { defineStore } from "pinia";
import type CommDto from "@/entities/CommDto";
import CommService from "@/services/CommService";

export interface CommentStoreState {
  Comments: CommDto[];
}

export const useCommentStore = defineStore({
  id: "comments",
  state: (): CommentStoreState => {
    return {
      Comments: [],
    };
  },
  actions: {
    loadComments(pointId: number) {
      CommService.getComms(pointId).then((x) => (this.Comments = x));
    },
  },
});
