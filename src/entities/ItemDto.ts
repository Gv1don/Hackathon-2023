import type Tag from "@/entities/Tag";

export default class ItemDto {
  id: number;
  description: string;
  workHours: string;
  lat: number;
  lon: number;
  tags: Tag[];

  constructor(
    lat: number = 0,
    lon: number = 0,
    id: number = 0,
    description: string = "",
    workHours: string = "",
    tags: Tag[] = [],
  ) {
    this.lat = lat;
    this.lon = lon;
    this.id = id;
    this.description = description;
    this.workHours = workHours;
    this.tags = tags;
  }
}
