import { Request, Response } from "npm:express@4.18.2";
import { CocheModel, ConcesionarioModel, ClienteModel } from "../db/schemas.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const addCoche = async (req: Request, res: Response) => {
  try {
    const { marca, modelo, color, velocidad, matricula, precio } = req.body;
    if (!marca || !modelo || !color || !velocidad) {
      res.status(400).send("Marca, modelo, color and velocidad are required");
      return;
    }

    const coche = await CocheModel.findOne({ matricula: matricula }).exec();
    if (coche) {
      res.status(400).send("Coche already exists");
      return;
    }

    const newCoche = new CocheModel({
      marca,
      modelo,
      color,
      velocidad,
      matricula,
      precio,
    });
    await newCoche.save();

    res.status(200).send({
      marca: newCoche.marca,
      modelo: newCoche.modelo,
      color: newCoche.color,
      velocidad: newCoche.velocidad,
      matricula: newCoche.matricula,
      precio: newCoche.precio,
      id: newCoche._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

const addConcesionario = async (req: Request, res: Response) => {
  try {
    const { nombre, direccion, coches, bloqueado } = req.body;
    if (!nombre || !direccion || !coches) {
      res.status(400).send("Nombre, direccion and coches are required");
      return;
    }

    const concesionario = await ConcesionarioModel.findOne({
      nombre: nombre,
      direccion: direccion,
    }).exec();

    if (concesionario) {
      res.status(400).send("Concesionario already exists");
      return;
    }

    if (coches.length > 10) {
      res.status(400).send("A concesionario can't have more than 10 coches");
      return;
    }

    const newConcesionario = new ConcesionarioModel({
      nombre,
      direccion,
      coches,
      bloqueado,
    });
    await newConcesionario.save();

    res.status(200).send({
      nombre: newConcesionario.nombre,
      direccion: newConcesionario.direccion,
      coches: newConcesionario.coches,
      bloqueado: newConcesionario.bloqueado,
      id: newConcesionario._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

const addCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, dni, coches, dinero } = req.body;
    if (!nombre || !apellidos || !dni || !coches || !dinero) {
      res
        .status(400)
        .send("Nombre, apellidos, dni, coches and dinero are required");
      return;
    }

    const cliente = await ClienteModel.findOne({ dni: dni }).exec();
    if (cliente) {
      res.status(400).send("Cliente already exists");
      return;
    }

    if (dinero < 0) {
      res.status(400).send("Dinero must be greater than 0");
      return;
    }

    const newCliente = new ClienteModel({
      nombre,
      apellidos,
      dni,
      coches,
      dinero,
    });
    await newCliente.save();

    res.status(200).send({
      nombre: newCliente.nombre,
      apellidos: newCliente.apellidos,
      dni: newCliente.dni,
      coches: newCliente.coches,
      dinero: newCliente.dinero,
      id: newCliente._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

const enviarCocheConcesionario = async (req: Request, res: Response) => {
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
    const coches = concesionario.coches.includes(coche._id.toString());
    if (coches) {
      res.status(404).send("Coche already in concesionario");
      return;
    }

    concesionario.coches.push(coche);
    await concesionario.save();

    res.status(200).send("Coche added");
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export { addCoche, addConcesionario, addCliente, enviarCocheConcesionario };
