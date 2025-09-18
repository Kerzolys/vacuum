import { TLection } from "./types";
import { lectors } from "./lectorsInfo";

export const lections: TLection[] = [
  {
    date: "20 сентября",
    title:
      "Расширенные техники игры на струнном инструменте. Мультиинструменталист",
    lector: lectors[0],
    id: 1,
  },
  {
    date: "21 сентября",
    title: "Инструментарий электроакустической композиции",
    lector: lectors[2],
    id: 2,
  },
  {
    date: "22 сентября",
    title: "Черные ангелы Джорджа Крама: исследование партитуры",
    lector: lectors[4],
    id: 3,
  },
  {
    date: "23 сентября",
    title: "Основные направления развития классической музыки в ХХ-ХХІ вв.",
    lector: lectors[3],
    id: 4,
  },
  {
    date: "24 сентября",
    title: "Взаимодействие композитора и исполнителя с электроникой",
    lector: lectors[6],
    id: 5,
  },
  {
    date: "25 сентября",
    title: "Время и контекст в современной композиции",
    lector: lectors[5],
    id: 6,
  },
];
