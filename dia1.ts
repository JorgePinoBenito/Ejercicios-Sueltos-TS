let a: number = 3; //Puedo modificar el valor
const b: string = "hola"; //No puedo modificar el valor, es constante --> Siempre hay que utilizar "const", salvo necesario
let c: boolean = true;

const miArray: number[] = [1, 2, 3];
const miArray2: boolean[] = [true, false];

let d: number | string = 3; //Varios tipos para una misma variable
d = "hola"; //

const miArr: Array<number | string> = [1, "hola"]; //Array de diferentes tipos
const miArr2 = miArr;
const miArr3: Array<number | string> = [1, "hola"]; //Array de diferentes tipos

console.log(miArr2 === miArr); //true
console.log(miArr3 === miArr); //false
// === compara valor y tipo, == compara solo valores

const suma = (a: number, b: number): number => a + b; // Funciones flecha (arrow functions)

const suma2 = (a: number, b: number) => {
  return a + b;
};

const max = (a: number, b: number): number => {
  if (a > b) return a;
  else return b;
};

console.log(suma(3, 43));

//=================================================================
// Función para devolver los números pares de un array de números

// Mi función
const pares = (arr: number[]): number[] => {
  const aux: number[] = [];
  for (let i of arr) {
    if (arr[i] % 2 === 0) {
      aux.push(arr[i]);
    }
  }
  return aux;
};

const arrayEjemplo: number[] = [1, 2, 3, 43, 2, 3, 3, 43, 32, 3];
console.log(pares(arrayEjemplo));

//==================================================================

//forEach
//(parametros) => lo que hace
//El segundo parámetro es el índice, es opcional
arrayEjemplo.forEach((elem: number, index: number) => {
  console.log(elem);
});

arrayEjemplo.forEach((elem: number, index: number) => {
  //Mostrar solo los elementos de índice par
  if (index % 2 === 0) {
    console.log(elem);
  }
});

arrayEjemplo.forEach(
  (elem: number, index: number) => index % 2 === 0 && console.log(elem)
);

//map
const arrayEjemplo2: string[] = ["hola", "que", "haces"];
const longitudes: number[] = arrayEjemplo2.map((elem: string) => {
  return elem.length;
});

const masCuatroLetras: boolean[] = arrayEjemplo2.map((elem: string) => {
  if (elem.length > 4) return true;
  else return false;
});

console.log(masCuatroLetras);

//En TS todas las variables SON referencias MENOS NUMBER, STRING Y BOOLEAN

//filter
const arrayEjemplo3: number[] = [2, 5, 7, 8];
const mayor5: number[] = arrayEjemplo3.filter((e: number) => e > 5);

//Ejercicio: dado un array mostrar por pantalla el doble de los números pares
const arr: number[] = [2, 3, 4, 8];
const arrSolucion: number[] = arr
  .filter((e: number) => e % 2 === 0)
  .map((e: number) => e * 2);
console.log(arrSolucion);

//some
const alguno7: boolean = arrayEjemplo3.some((e) => e === 7);

//find
const arrayEjemplo4: string[][] = [
  ["pedro", "maria"],
  ["luis", "luisa"],
  ["pepe", "pepi"],
];
const pareja = arrayEjemplo4.find((p) => p[0] === "luis" && p[1] === "luisa");

//flatMap
const arrayEjemplo5 = arrayEjemplo4.flatMap((a) => a);

//reduce

// const a = arr.reduce((x, e, i) => {
//      return x+e;
// }, 0)

const arrEjemplo6: number[] = [1, 2, 3, 4];
const aa = arrEjemplo6.reduce((x, e, i) => {
  if (x > e) return x;
  else return e;
}, 0);

//Objetos

type Casa = {
  plantas: number;
  bathrooms: number;
};

type Persona = {
  name: string;
  age: number;
  coche: boolean;
  amigos?: string[];
  casa?: Casa;
};

const yo: Persona = {
  name: "Alberto",
  age: 18,
  coche: true,
  amigos: ["Jose", "Maria"],
};

const p1: Persona = {
  name: "Alberto",
  age: 32,
  coche: true,
};

const p2: Persona = {
  name: "Pepe",
  age: 27,
  coche: false,
};

const p3: Persona = {
  name: "Pablo",
  age: 9,
  coche: false,
};

const p4: Persona = {
  name: "Roberto",
  age: 19,
  coche: true,
};

//Ejercicio: conseguir un array con los nombres de las personas con coche
const personas: Persona[] = [p1, p2, p3, p4];
const tienenCoche: string[] = personas
  .filter((p) => p.coche)
  .map((p) => p.name);

const elPrimeroConCoche: Persona | undefined = personas.find((p) => p.coche);

const todosTienenCoche: boolean = personas.every((p) => p.coche);

const claves = Object.keys(p1); //["name", "edad", "coche"];
claves.forEach((k) => console.log(p1[k as keyof Persona])); //Si en el parametro pusiera solo un string cualquiera, podría no coincidir, de
//esta manera me aseguro de que "k" es una clave de Persona
Object.values(p1);
