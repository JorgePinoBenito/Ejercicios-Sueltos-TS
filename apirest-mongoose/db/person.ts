import mongoose from "npm:mongoose@7.6.3";
import { Person } from "../types.ts";

//Schema es una clase de mongoose que permite definir el esquema de una coleccion de mongo
const Schema = mongoose.Schema;

//personSchema es el esquema de la persona en la base de datos de mongo
const personSchema = new Schema(
  {
    name: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

//PersonModelType es un alias de un objeto que extiende de mongoose.Document y que no tiene el campo id (ya que mongoose lo añade por defecto)
export type PersonModelType = mongoose.Document & Omit<Person, "id">;

//exporta el modelo de persona de la base de datos de mongo (que extiende de mongoose.Model<PersonModelType>)
//personas es el nombre de la coleccion en la base de datos de mongo
export default mongoose.model<PersonModelType>("personas", personSchema);
