import mongoose from "npm:mongoose@7.6.3";
import { Mascota } from "../types.ts";

const Schema = mongoose.Schema;

const mascotaSchema = new Schema(
  {
    name: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipo: {
      type: String,
      required: true,
      enum: ["Perro", "Gato", "Serpiente"],
    },
  },
  { timestamps: true }
);

export type MascotaModelType = Mascota & mongoose.Document;

export default mongoose.model<MascotaModelType>("mascotas", mascotaSchema);
