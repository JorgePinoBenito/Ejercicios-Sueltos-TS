import express, { Request, Response } from "npm:express@4.18.2";
import {
  listLocations,
  getLocation,
  filterLocationsType,
  filterLocationsDimension,
  filterLocationsTypeAndDimension,
  deleteLocation,
} from "./Location.ts";
import {
  listCharacters,
  getCharacter,
  filterCharactersStatus,
  filterCharactersGender,
  filterCharactersStatusAndGender,
  deleteCharacter,
} from "./Character.ts";

const app = express();

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/characters?page=1
app.get("/characters", async (req: Request, res: Response) => {
  try {
    const page = req.query.page;
    const characters = await listCharacters(parseInt(page));
    res.status(200).send(characters);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/characters/1
app.get("/characters/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const character = await getCharacter(parseInt(id));
    res.status(200).send(character);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/characters/filter/status?status=Alive
app.get("/characters/filter/status", (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    const filter = filterCharactersStatus(status);
    res.status(200).send(filter);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/characters/filter/gender?gender=Female
app.get("/characters/filter/gender", (req: Request, res: Response) => {
  try {
    const gender = req.query.gender;
    const filter = filterCharactersGender(gender);
    res.status(200).send(filter);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations/filter?status=Alive&gender=Female
app.get("/characters/filter", (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    const gender = req.query.gender;
    const filter = filterCharactersStatusAndGender(status, gender);
    res.status(200).send(filter);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/characters/delete/1
app.delete("/characters/delete/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    deleteCharacter(id);
    res.status(200).send("Character deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations?page=1
app.get("/locations", async (req: Request, res: Response) => {
  try {
    const page = req.query.page;
    const locations = await listLocations(parseInt(page));
    res.status(200).send(locations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations/1
app.get("/locations/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const location = await getLocation(parseInt(id));
    res.status(200).send(location);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations/filter/type?type=Planet
app.get("/locations/filter/type", (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    const filter = filterLocationsType(type);
    res.status(200).send(filter);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations/filter/dimension?dimension=Dimension C-137
app.get("/locations/filter/dimension", (req: Request, res: Response) => {
  try {
    const dimension = req.query.dimension;
    const filter = filterLocationsDimension(dimension);
    res.status(200).send(filter);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations/filter?type=Planet&dimension=Dimension C-137
app.get("/locations/filter", (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    const dimension = req.query.dimension;
    const filter = filterLocationsTypeAndDimension(type, dimension);
    res.status(200).send(filter);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//ejemplo de ruta con parámetro con localhost
//http://localhost:3000/locations/delete/1
app.delete("/locations/delete/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    deleteLocation(id);
    res.status(200).send("Location deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
