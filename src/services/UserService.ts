import type UserDto from "@/entities/UserDto";
import * as timers from "timers";

const API_URL = `${new URL(document.URL).origin}/api/v1/public/sign-up`;

export default {
  async LoginUser(user: UserDto): Promise<boolean> {
    let response = await fetch(`${new URL(document.URL).origin}/api/v1/public/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      credentials: "include",
    });

    let json = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  },

  async RegisterUser(user: UserDto): Promise<boolean> {
    let response = await fetch(`${new URL(document.URL).origin}/api/v1/public/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
      }),
      credentials: "include",
    });



    let json = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  },

  Logout() {
    document.cookie = "";
  },
};

function convertMicrosecondsToExpires(microseconds: number) {
  // Преобразование микросекунд в миллисекунд

  // Прибавление времени к текущей дате
  var date = new Date();
  date.setTime(date.getTime() + microseconds);

  // Форматирование даты в формат expires
  var expires = date.toUTCString();

  return expires;
}


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
