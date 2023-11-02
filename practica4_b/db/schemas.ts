import mongoose from "npm:mongoose@7.6.3";
import { Coche, Concesionario, Cliente } from "../types.ts";

const Schema = mongoose.Schema;

const CocheSchema = new Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    color: { type: String, required: true },
    velocidad: { type: Number, required: true },
    matricula: { type: String, required: true },
    precio: { type: Number, required: true },
  },
  { timestamps: true }
);

const ConcesionarioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    coches: [CocheSchema],
    bloqueado: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const ClienteSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    dni: { type: String, required: true },
    coches: [CocheSchema],
    dinero: { type: Number, required: true },
  },
  { timestamps: true }
);

export type CocheModelType = Coche & mongoose.Document;
export type ConcesionarioModelType = Concesionario & mongoose.Document;
export type ClienteModelType = Cliente & mongoose.Document;

export const CocheModel = mongoose.model<CocheModelType>("coches", CocheSchema);
export const ConcesionarioModel = mongoose.model<ConcesionarioModelType>(
  "concesionarios",
  ConcesionarioSchema
);
export const ClienteModel = mongoose.model<ClienteModelType>(
  "clientes",
  ClienteSchema
);
