import { Request, Response } from "npm:express@4.18.2";
import { CocheModel, ConcesionarioModel, ClienteModel } from "../db/schemas.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const getCochesConcesionario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const concesionario = await ConcesionarioModel.findById({
      _id: new ObjectId(id),
    }).exec();
    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }
    const coches = concesionario.coches;
    res.status(200).send(coches);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

const getCochesCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await ClienteModel.findById({
      _id: new ObjectId(id),
    }).exec();
    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }
    const coches = cliente.coches;
    res.status(200).send(coches);
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export { getCochesConcesionario, getCochesCliente };
