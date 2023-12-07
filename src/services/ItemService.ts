import type ItemDto from "@/entities/ItemDto"; // Подставьте путь к вашему ItemDto

const API_URL = `${new URL(document.URL).origin}/api/v1/public/point?id=`; // Замените на реальный URL API

export interface ResponseItemDto {
  message: string;
  point: {
    coordinates: [];
    address: string;
    description: string;
    open: number;
    close: number;
    creator: {
      id: string;
      email: string;
      username: string;
    };
    tags: [];
  };
}

export default {
  // Создать новый объект ItemDto
  createItem(item: ItemDto): Promise<ItemDto> {
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((response) => response.json());
  },

  // Получить все объекты ItemDto
  getAllItems(): Promise<ItemDto[]> {
    return fetch(API_URL).then((response) => response.json());
  },

  // Получить объект ItemDto по его ID
  getItemById(id: number | undefined): Promise<ResponseItemDto> {
    return fetch(`${API_URL}${id}`).then((response) => {
      return response.json();
    });
  },

  // Обновить объект ItemDto
  updateItem(item: ItemDto): Promise<ItemDto> {
    return fetch(`${API_URL}/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((response) => response.json());
  },

  // Удалить объект ItemDto по его ID
  deleteItem(id: number): Promise<Response> {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
