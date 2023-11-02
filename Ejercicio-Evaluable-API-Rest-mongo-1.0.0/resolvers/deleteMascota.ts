import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const deleteMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //const stringId = id.toString();
    const mascota = await MascotaModel.findOneAndDelete({
      _id: new ObjectId(id),
    }).exec();
    if (!mascota) {
      res.status(404).send("Mascota not found");
      return;
    }
    res.status(200).send("Mascota deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMascota;
