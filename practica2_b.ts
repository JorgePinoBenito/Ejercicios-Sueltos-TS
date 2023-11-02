//Ejercicio 1
type Quotes = {
  data: Data[];
};

type Data = {
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
};

async function fetchQuotes() {
  try {
    const numerodequotes: Data[] = [];
    for (let page = 1; page <= 3; page++) {
      const response = await fetch(
        `https://quote-garden.onrender.com/api/v3/quotes?page=${page}`
      );
      if (!response.ok) {
        throw new Error("No se pudo realizar la peticion");
      }
      const data: Quotes = await response.json();

      numerodequotes.push(...data.data);

      data.data.forEach((quote) => {
        console.log(
          `Genero: ${quote.quoteGenre} Autor: ${quote.quoteAuthor} Quote: ${quote.quoteText}`
        );
      });
      console.log(`El numero de quotes es de: ${numerodequotes.length}`);
    }
  } catch (error) {
    console.log(error);
  }
}

//fetchQuotes();

//Ejercicio 2
type PokemonTipos = {
  type: string;
  generation: Generation;
};

type PokemonNombre = {
  name: string;
  types: Type[];
  id: number;
};

type Generation = {
  name: string;
  url: string;
};

type Species = {
  name: string;
  url: string;
};

type Type = {
  slot: number;
  type: Species;
};

async function fetchPokemon() {
  let prueba: number = 0;

  const inputprueba = await prompt("Introduce un numero");

  if (inputprueba !== null) {
    prueba = parseInt(inputprueba);

    if (!isNaN(prueba)) {
      switch (prueba) {
        case 1:
          try {
            const tipo = await prompt(
              "Escribe el tipo de pokemon que quieres buscar"
            );
            const response = await fetch(
              `https://pokeapi.co/api/v2/type/${tipo}`
            );
            if (!response.ok) {
              throw new Error("No se pudo realizar la peticion");
            }
            const data = await response.json();
            const pokemonType: PokemonTipos = {
              type: data.name,

              generation: data.generation.name,
            };
            console.log(`Tipo: ${pokemonType.type}`);
            console.log(`Generacion: ${pokemonType.generation}`);

            //hacer un array con el nombre de los pokemon de ese tipo
            const arrayPokemon: string[] = [];

            for (let i = 0; i < data.pokemon.length; i++) {
              arrayPokemon.push(data.pokemon[i].pokemon.name);
            }

            console.log(arrayPokemon);

            console.log(
              `------------------------------------------------------------------------------`
            );

            //mostrar nombre de los pokemon con ese tipo
            const primerPokemon: string = data.pokemon[0].pokemon.name;
            console.log(primerPokemon);
          } catch (error) {
            console.log(error);
          }
          break;
        case 2:
          try {
            const pokemon = await prompt(
              "Escribe el nombre del pokemon que quieres buscar"
            );
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            );
            if (!response.ok) {
              throw new Error("No se pudo realizar la peticion");
            }
            const data = await response.json();
            const pokemonName: PokemonNombre = {
              name: data.name,
              types: data.types,
              id: data.id,
            };
            console.log(`Nombre: ${pokemonName.name}`);
            pokemonName.types.forEach((type) => {
              console.log(type.type.name);
            });
            console.log(`Id: ${pokemonName.id}`);
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          console.log("Introduce una opcion valida");
      }
    } else {
      console.log("Por favor, introduce un número válido.");
    }
  } else {
    console.log("Entrada nula. Introduce una opción válida.");
  }
}

fetchPokemon();

//Ejericicio 3
type Libro = {
  id: number;
  title: string;
  author: string;
  pages: number;
  genre: string;
};

type Biblioteca = {
  libros: Libro[];
};

const biblioteca: Biblioteca = {
  libros: [],
};

//funcion crear libro
function crearLibro() {
  const id = prompt("Introduce el id del libro");
  const title = prompt("Introduce el titulo del libro");
  const author = prompt("Introduce el autor del libro");
  const pages = prompt("Introduce el numero de paginas del libro");
  const genre = prompt("Introduce el genero del libro");

  if (
    id === null ||
    title === null ||
    author === null ||
    pages === null ||
    genre === null
  ) {
    console.log("No se pueden introducir campos vacios");
  } else {
    const parsedId = parseInt(id);
    const parsedPages = parseInt(pages);

    if (!isNaN(parsedId) && !isNaN(parsedPages)) {
      const libroExistente = biblioteca.libros.find((libro) => {
        return libro.id === parsedId;
      });

      if (libroExistente) {
        console.log("Ya existe un libro con ese id");
      } else {
        const libro: Libro = {
          id: parsedId,
          title: title,
          author: author,
          pages: parsedPages,
          genre: genre,
        };
        biblioteca.libros.push(libro);

        console.log("Libro creado correctamente");
      }
    }
  }
}

//funcion filtrar libro por genero
function filtrarLibro() {
  const genero = prompt("Introduce el genero del libro que quieres buscar");
  const libroFiltrado = biblioteca.libros.filter((libro) => {
    return libro.genre === genero;
  });
  if (libroFiltrado.length === 0) {
    console.log("No hay libros con ese genero");
  } else {
    console.log(libroFiltrado);
  }
}

//funcion borrar libro
function borrarLibro() {
  const id = prompt("Introduce el id del libro que quieres borrar");

  if (id === "" || id === null) {
    console.log("No se pueden introducir campos vacios");
  } else {
    const parsedId = parseInt(id);

    if (!isNaN(parsedId)) {
      const libroBorrado = biblioteca.libros.find((libro) => {
        return libro.id === parsedId;
      });
      if (libroBorrado) {
        const index = biblioteca.libros.indexOf(libroBorrado);
        biblioteca.libros.splice(index, 1);
      } else {
        console.log("No existe un libro con ese id");
      }
    } else {
      console.log("Introduce un id valido");
    }
  }
}

//funcion para salir del programa
function salir() {
  console.log("Saliendo del programa");
}

//funcion para mostrar el menu
function menu() {
  console.log("1 - Crear libro");
  console.log("2 - Filtrar libro por género");
  console.log("3 - Borrar libro");
  console.log("4 - Salir");
}

//funcion para ejecutar el programa
async function ejecutarPrograma() {
  let opcion: number = 0;
  do {
    menu();
    const input = await prompt("Introduce una opcion");

    if (input !== null) {
      opcion = parseInt(input);

      if (!isNaN(opcion)) {
        switch (opcion) {
          case 1:
            crearLibro();
            break;
          case 2:
            filtrarLibro();
            break;
          case 3:
            borrarLibro();
            break;
          case 4:
            salir();
            break;
          default:
            console.log("Introduce una opcion valida");
        }
      } else {
        console.log("Por favor, introduce un número válido.");
      }
    } else {
      console.log("Entrada nula. Introduce una opción válida.");
    }
  } while (opcion !== 4);
}

//ejecutarPrograma();
