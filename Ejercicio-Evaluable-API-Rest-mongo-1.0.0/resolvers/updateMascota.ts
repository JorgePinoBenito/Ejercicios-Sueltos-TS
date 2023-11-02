import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const updateMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //const stringId = id.toString();
    const { name, descripcion, tipo } = req.body;
    if (!name || !descripcion || !tipo) {
      res.status(400).send("Name, descripcion and tipo are required");
      return;
    }

    if (tipo !== "Perro" && tipo !== "Gato" && tipo !== "Serpiente") {
      res.status(400).send("Tipo must be Perro, Gato or Serpiente");
      return;
    }

    const updatedMascota = await MascotaModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { name, descripcion, tipo },
      { new: true }
    ).exec();

    if (!updatedMascota) {
      res.status(404).send("Mascota not found");
      return;
    }

    res.status(200).send({
      name: updatedMascota.name,
      descripcion: updatedMascota.descripcion,
      tipo: updatedMascota.tipo,
      id: updatedMascota._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMascota;
