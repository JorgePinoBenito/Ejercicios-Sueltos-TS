import { Location } from "./types.ts";

export const listLocations = async (page: number): Promise<string[]> => {
  const BASE_URL = "https://rickandmortyapi.com/api/location";
  const url = `${BASE_URL}/?page=${page}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Error al obtener las localizaciones");
  }

  const data = await response.json();

  const locations: string[] = data.results.map((location: Location) => {
    return location.name;
  });

  return locations;
};

const locations: Location[] = [];

export const getLocation = async (id: number): Promise<Location> => {
  if (locations.some((location) => location.id === id)) {
    const location = locations.find((location) => location.id === id);
    if (location) {
      return location;
    }
  }

  const BASE_URL = "https://rickandmortyapi.com/api/location";
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Error al obtener los personajes");
  }

  const data = await response.json();

  const location: Location = {
    id: data.id,
    name: data.name || "Nombre no disponible",
    type: data.type || "Tipo no disponible",
    dimension: data.dimension || "Dimension no disponible",
    created: data.created
      ? new Date(data.created)
      : new Date("Fecha no disponible"),
  };

  locations.push(location);

  return location;
};

export const filterLocationsType = (type: string): Location[] => {
  const filter = locations.filter((location) => {
    return location.type === type;
  });
  return filter;
};

export const filterLocationsDimension = (dimension: string): Location[] => {
  const filter = locations.filter((location) => {
    return location.dimension === dimension;
  });
  return filter;
};

export const filterLocationsTypeAndDimension = (
  type: string,
  dimension: string
): Location[] => {
  const filter = locations.filter((location) => {
    return location.type === type && location.dimension === dimension;
  });
  return filter;
};

export const deleteLocation = (id: number): void => {
  const index = locations.findIndex((location) => location.id === id);
  if (index !== -1) {
    locations.splice(index, 1);
  }
};
