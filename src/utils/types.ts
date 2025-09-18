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
};

export type TPartner = {
  id: number;
  name: string;
  description: string;
  photo?: string;
};

export type TLector = {
  id: number;
  name: string;
  description: string;
  photo: string;
};

export type TComposerApplication = {
  id: string;
  composer_name: string;
  bio: String;
  photo_url: string;
  experience: string;
  media_materials: string[];
  source_of_discovery: string;
  motivation_letter: string;
  email: string;
  createdAt?: string | FieldValue;
  seen?: boolean;
};

export type TStringQuartetApplication = {
  id: string;
  quartet_name?: string;
  bio: string;
  members: {
    first_violin_name: string;
    second_violin_name: string;
    viola_name: string;
    cello_name: string;
  };
  photo_url: string;
  media_materials: string[];
  source_of_discovery: string;
  motivation_letter: string;
  email: string;
  createdAt?: string | FieldValue;
  seen?: boolean;
};

export type TRegistrationComposerValues = {
  composer_name: string;
  bio: File | null;
  photo_file: File | null;
  experience: string;
  media_materials: string[];
  source_of_discovery: string;
  motivation_letter: File | null;
  email: string;
};

export type TRegistrationStringQuartetValues = {
  quartet_name?: string;
  bio: File | null;
  members: {
    first_violin_name: string;
    second_violin_name: string;
    viola_name: string;
    cello_name: string;
  };
  photo_file: File | null;
  media_materials: string[];
  source_of_discovery: string;
  motivation_letter: File | null;
  email: string;
};

export type TWinner = {
  name?: string;
  id: number;
  photo: string;
  bio: string;
  members?: string[];
};

export type TLection = {
  date: string;
  title: string;
  lector: TLector;
  id: number;
};
