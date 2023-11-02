import { Request, Response } from "npm:express@4.18.2";
import { CocheModel, ConcesionarioModel, ClienteModel } from "../db/schemas.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const venderCocheCliente = async (req: Request, res: Response) => {
  try {
    const { idcliente, idcoche, idconcesionario } = req.params;
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
    const concesionario = await ConcesionarioModel.findById({
      _id: new ObjectId(idconcesionario),
    }).exec();
    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }

    if (concesionario.bloqueado) {
      res.status(400).send("Concesionario blocked");
      return;
    }

    const matriculaExiste = concesionario.coches.some(
      (coche) => coche.matricula === coche.matricula
    );
    if (!matriculaExiste) {
      res.status(400).send("Car does not exist in the concesionario");
      return;
    }

    if (cliente.dinero < coche.precio) {
      res.status(400).send("Cliente does not have enough money");
      return;
    }
    cliente.dinero -= coche.precio;
    cliente.coches.push(coche);
    await cliente.save();

    concesionario.coches.splice(
      concesionario.coches.indexOf(coche._id.toString()),
      1
    );
    await concesionario.save();

    await CocheModel.deleteOne({ _id: new ObjectId(idcoche) }).exec();

    res.status(200).send("Coche vendido");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

const transpasarCocheCliente = async (req: Request, res: Response) => {
  try {
    const { idcliente1, idcliente2, matriculacochevender } = req.params;

    const cliente1 = await ClienteModel.findById({
      _id: new ObjectId(idcliente1),
    }).exec();
    if (!cliente1) {
      res.status(404).send("Cliente not found");
      return;
    }

    const cliente2 = await ClienteModel.findById({
      _id: new ObjectId(idcliente2),
    }).exec();
    if (!cliente2) {
      res.status(404).send("Cliente not found");
      return;
    }

    const coche = cliente1.coches.find(
      (coche) => coche.matricula === matriculacochevender
    );

    if (!coche) {
      res.status(404).send("Coche not found");
      return;
    }

    if (cliente2.dinero < coche.precio) {
      res.status(400).send("New client does not have enough money");
      return;
    }

    cliente1.coches = cliente1.coches.filter(
      (c) => c.matricula !== matriculacochevender
    );
    cliente1.dinero += coche.precio;
    cliente2.coches.push(coche);
    cliente2.dinero -= coche.precio;

    await cliente1.save();
    await cliente2.save();

    res.status(200).send("Coche traspasado al nuevo cliente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addDineroCliente = async (req: Request, res: Response) => {
  try {
    const { idcliente, dinero } = req.params;
    const cliente = await ClienteModel.findById({
      _id: new ObjectId(idcliente),
    }).exec();
    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }

    if (dinero < 0) {
      res.status(400).send("Dinero must be greater than 0");
      return;
    }

    cliente.dinero += parseInt(dinero);
    await cliente.save();

    res.status(200).send("Dinero añadido");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

const bloquearVenta = async (req: Request, res: Response) => {
  try {
    const { idconcesionario } = req.params;
    const concesionario = await ConcesionarioModel.findById({
      _id: new ObjectId(idconcesionario),
    }).exec();
    if (!concesionario) {
      res.status(404).send("Concesionario not found");
      return;
    }

    concesionario.bloqueado = true;
    await concesionario.save();

    res.status(200).send("Concesionario bloqueado");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export {
  venderCocheCliente,
  addDineroCliente,
  transpasarCocheCliente,
  bloquearVenta,
};
