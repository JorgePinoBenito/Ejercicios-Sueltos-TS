export type Character = {
  info: Info;
  results: Result[];
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type Result = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  origin: Location;
  location: Location;
  created: Date;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  created: Date;
};

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
