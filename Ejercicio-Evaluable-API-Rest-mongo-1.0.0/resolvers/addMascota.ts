import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const addMascota = async (req: Request, res: Response) => {
  try {
    const { name, descripcion, tipo } = req.body;
    if (!name || !descripcion || !tipo) {
      res.status(400).send("Name, descripcion and tipo are required");
      return;
    }

    if (tipo !== "Perro" && tipo !== "Gato" && tipo !== "Serpiente") {
      res.status(400).send("Tipo must be Perro, Gato or Serpiente");
      return;
    }

    const alreadyExists = await MascotaModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Mascota already exists");
      return;
    }

    const newMascota = new MascotaModel({ name, descripcion, tipo });
    await newMascota.save();

    res.status(200).send({
      name: newMascota.name,
      descripcion: newMascota.descripcion,
      tipo: newMascota.tipo,
      id: newMascota._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMascota;
