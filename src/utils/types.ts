import { FieldValue } from "firebase/firestore";

export type TBio = {
  paragraph: string;
  id?: string;
  position: number;
};

export type TEvent = {
  date?: string;
  time?: string;
  location?: string;
  title?: string;
  program: string[];
  link?: string;
  id?: string;
  createdAt?: string | FieldValue;
  archived?: boolean;
};

export type TVideo = {
  title: string;
  link: string;
  id?: string;
};

export type TImage = {
  title: string;
  link: string;
  id?: string;
};

export type TContact = {
  icon: string;
  link: string;
  id?: string;
};

export type TUser = {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}