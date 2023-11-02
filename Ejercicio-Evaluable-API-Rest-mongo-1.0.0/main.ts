import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { getMascotas, getMascotaById } from "./resolvers/getMascota.ts";
import addMascota from "./resolvers/addMascota.ts";
import updateMascota from "./resolvers/updateMascota.ts";
import deleteMascota from "./resolvers/deleteMascota.ts";

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
  .get("/api/mascotas", getMascotas)
  .get("/api/mascotas/:id", getMascotaById)
  .post("/api/mascotas", addMascota)
  .put("/api/mascotas/:id", updateMascota)
  .delete("/api/mascotas/:id", deleteMascota);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
