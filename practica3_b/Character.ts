import { Result } from "./types.ts";

export const listCharacters = async (page: number): Promise<string[]> => {
  const BASE_URL = "https://rickandmortyapi.com/api/character";
  const url = `${BASE_URL}/?page=${page}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Error al obtener los personajes");
  }

  const data = await response.json();

  const characters: string[] = data.results.map((character: Result) => {
    return character.name;
  });

  return characters;
};

const characters: Result[] = [];

export const getCharacter = async (id: number): Promise<Result> => {
  if (characters.some((character) => character.id === id)) {
    const character = characters.find((character) => character.id === id);
    if (character) {
      return character;
    }
  }

  const BASE_URL = "https://rickandmortyapi.com/api/character";
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Error al obtener los personajes");
  }

  const data = await response.json();

  const character: Result = {
    id: data.id,
    name: data.name || "Nombre no disponible",
    status: data.status || "Estado no disponible",
    species: data.species || "Especie no disponible",
    gender: data.gender || "Genero no disponible",
    origin: data.origin || "Origen no disponible",
    location: data.location || "Localizacion no disponible",
    created: data.created
      ? new Date(data.created)
      : new Date("Fecha no disponible"),
  };

  characters.push(character);

  return character;
};

export const filterCharactersStatus = (status: string): Result[] => {
  const filter = characters.filter((character) => {
    return character.status === status;
  });
  return filter;
};

export const filterCharactersGender = (gender: string): Result[] => {
  const filter = characters.filter((character) => {
    return character.gender === gender;
  });
  return filter;
};

export const filterCharactersStatusAndGender = (
  status: string,
  gender: string
): Result[] => {
  const filter = characters.filter((character) => {
    return character.gender === gender && character.status === status;
  });
  return filter;
};

export const deleteCharacter = (id: number): void => {
  const index = characters.findIndex((character) => character.id === id);
  if (index !== -1) {
    characters.splice(index, 1);
  }
};
