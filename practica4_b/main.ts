import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { getCochesConcesionario, getCochesCliente } from "./resolvers/get.ts";
import {
  addCoche,
  addConcesionario,
  addCliente,
  enviarCocheConcesionario,
} from "./resolvers/add.ts";
import {
  venderCocheCliente,
  addDineroCliente,
  bloquearVenta,
  transpasarCocheCliente,
} from "./resolvers/update.ts";
import {
  deleteCocheConcesionario,
  deleteCocheCliente,
} from "./resolvers/delete.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/getCochesConcesionario/:id", getCochesConcesionario)
  .get("/getCochesCliente/:id", getCochesCliente)
  .post("/addCoche", addCoche)
  .post("/addConcesionario", addConcesionario)
  .post("/addCliente", addCliente)
  .post(
    "/enviarCocheConcesionario/:idconcesionario/:idcoche",
    enviarCocheConcesionario
  )
  .put(
    "/venderCocheCliente/:idcliente/:idcoche/:idconcesionario",
    venderCocheCliente
  )
  .put(
    "/transpasarCocheCliente/:idcliente1/:idcliente2/:matricula",
    transpasarCocheCliente
  )
  .put("/addDineroCliente/:idcliente/:dinero", addDineroCliente)
  .put("/bloquearVenta/:idconcesionario", bloquearVenta)
  .delete(
    "/deleteCocheConcesionario/:idconcesionario/:idcoche",
    deleteCocheConcesionario
  )
  .delete("/deleteCocheCliente/:idcliente/:idcoche", deleteCocheCliente);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
