import { Request, Response } from "npm:express@4.18.2";
import { CocheModel, ConcesionarioModel, ClienteModel } from "../db/schemas.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const deleteCocheConcesionario = async (req: Request, res: Response) => {
  try {
    const { idconcesionario, idcoche } = req.params;
    const concesionario = await ConcesionarioModel.findById({
      _id: new ObjectId(idconcesionario),
    }).exec();
    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }
    const coche = await CocheModel.findById({
      _id: new ObjectId(idcoche),
    }).exec();
    if (!coche) {
      res.status(404).send("Coche not found");
      return;
    }

    const coches = concesionario.coches.some(
      (coche) => coche.matricula === coche.matricula
    );

    if (!coches) {
      res.status(404).send("Coche not found");
      return;
    }
    concesionario.coches.splice(
      concesionario.coches.indexOf(coche._id.toString()),
      1
    );
    await concesionario.save();

    res.status(200).send("Coche deleted");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

const deleteCocheCliente = async (req: Request, res: Response) => {
  try {
    const { idcliente, idcoche } = req.params;
    const cliente = await ClienteModel.findById({
      _id: new ObjectId(idcliente),
    }).exec();
    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }
    const coche = await CocheModel.findById({
      _id: new ObjectId(idcoche),
    }).exec();
    if (!coche) {
      res.status(404).send("Coche not found");
      return;
    }
    const coches = cliente.coches.includes(coche._id.toString());
    if (!coches) {
      res.status(404).send("Coche not found");
      return;
    }
    cliente.coches.splice(cliente.coches.indexOf(coche._id.toString()), 1);
    await cliente.save();

    res.status(200).send("Coche deleted");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export { deleteCocheConcesionario, deleteCocheCliente };
