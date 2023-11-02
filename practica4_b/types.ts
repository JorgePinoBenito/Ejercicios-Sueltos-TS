export type Coche = {
  marca: string;
  modelo: string;
  color: string;
  velocidad: number;
  matricula: string;
  precio: number;
};

export type Concesionario = {
  nombre: string;
  direccion: string;
  coches: Coche[];
  bloqueado: boolean;
};

export type Cliente = {
  nombre: string;
  apellidos: string;
  dni: string;
  coches: Coche[];
  dinero: number;
};
