export type Mascota = {
  name: string;
  descripcion: string;
  tipo: PosiblesMascotas;
};

export enum PosiblesMascotas {
  Perro = "Perro",
  Gato = "Gato",
  Serpiente = "Serpiente",
}
