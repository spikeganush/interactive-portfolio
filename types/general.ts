import { StaticImageData } from 'next/image';

export type PageComponentProps = {
  id?: string;
};

export type project = {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  url?: string[];
  tags: string[];
};

export type experience = {
  title: string;
  description: string;
  location: string;
  startYear: string;
  endYear?: string;
  icon: string;
};

export type DataState = {
  userId: string | null;
  leftLightBg: string | null;
  rightLightBg: string | null;
  leftDarkBg: string | null;
  rightDarkBg: string | null;
  photo: string | null;
  intro: string | null;
  resumeUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  about: string | null;
  projects: project[] | null;
  skills: string[] | null;
  experiences: experience[] | null;
  email: string | null;
};

export type EditState = {
  photo: Boolean;
  color: Boolean;
  intro: Boolean;
  about: Boolean;
  projects: Boolean;
  skills: Boolean;
  experiences: Boolean;
  email: Boolean;
};

export type EditStateKeys = keyof EditState;
