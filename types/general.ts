import { StaticImageData } from 'next/image';

export type PageComponentProps = {
  id?: string;
};

export type project = {
  _id?: string;
  id: string;
  position: number;
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  url?: string[];
  tags: string[];
};

export type experience = {
  id: string;
  title: string;
  description: string;
  location: string;
  startYear: string;
  endYear?: string;
  icon: string;
  position: number;
};

export type userId = { userId: string | null };

export type DataState = {
  _id?: string;
  leftLightBg: string | null;
  rightLightBg: string | null;
  leftDarkBg: string | null;
  rightDarkBg: string | null;
  photo: string | null;
  intro: string | null;
  resume: string | null;
  linkedin: string | null;
  github: string | null;
  about: string | null;
  projects: project[] | null;
  skills: string[] | null;
  experiences: experience[] | null;
  email: string | null;
  customUrl: string | null;
} & userId;

export type SupabaseFields = {
  creator: string;
} & DataState;

export type EditState = {
  photo: boolean;
  color: boolean;
  intro: boolean;
  buttons: boolean;
  about: boolean;
  projects: boolean;
  project: Record<string, boolean>;
  skills: boolean;
  experiences: boolean;
  experience: Record<string, boolean>;
  email: boolean;
  customUrl: boolean;
};

export type EditStateKeys = keyof EditState;

export type ForceEditKeys = keyof SupabaseFields;
