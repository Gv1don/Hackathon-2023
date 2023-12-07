import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import type UserDto from "@/entities/UserDto";
import router from "@/router";

export interface UserStoreState {
  isAuthentificated: boolean;
  isErrorAuth: boolean;
  userDto: UserDto;
  isLoading: boolean;
}

export const useUserStore = defineStore({
  id: "users",
  state: (): UserStoreState => {
    return {
      isAuthentificated: (() => document.cookie.indexOf("jwt") !== -1)(),
      isLoading: false,
      userDto: { id: 0, email: "", username: "", password: "" },
      isErrorAuth: false,
    };
  },
  actions: {
    registerUser(user: UserDto) {
      UserService.RegisterUser(user).then((data) => {
        if (data) {
          this.isAuthentificated = true;

        } else {
          this.isErrorAuth = true;
        }
      });
    },

    loginUser(user: UserDto) {
      UserService.LoginUser(user).then((data) => {
        if (data) {
          this.isAuthentificated = true;
        } else {
          this.isErrorAuth = true;
        }
      });
    },
    logout() {
      this.isAuthentificated = false;
    },
  },
});
