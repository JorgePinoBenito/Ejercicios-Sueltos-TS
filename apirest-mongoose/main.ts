import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getPerson from "./resolvers/getPerson.ts";
import addPerson from "./resolvers/addPerson.ts";
import updatePerson from "./resolvers/updatePerson.ts";
import deletePerson from "./resolvers/deletePerson.ts";

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
  //http://localhost:3000/getPerson/02734488-H
  .get("/getPerson/:dni", getPerson)

  //http://localhost:3000/addPerson
  //body -> raw -> JSON
  // {
  //   "name": "Juan",
  //   "age": 20,
  //   "dni": "02734488-H"
  // }
  .post("/addPerson", addPerson)

  //http://localhost:3000/updatePerson/02734488-H
  //body -> raw -> JSON
  // {
  //   "name": "Juan",
  //   "age": 20
  // }
  .put("/updatePerson/:dni", updatePerson)

  //http://localhost:3000/deletePerson/02734488-H
  .delete("/deletePerson/:dni", deletePerson);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
