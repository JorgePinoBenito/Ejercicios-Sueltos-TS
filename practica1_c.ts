//ej1
function bubbleSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      const aux = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = aux;
    }
  }
  return bubbleSort(arr.slice(0, -1)).concat(arr[arr.length - 1]);
}

const arrayordenado = bubbleSort([4, 2, 7, 1, 9, 3]);
console.log(arrayordenado);

//ej2
function seguridadContrasena(contrasena: string): number {
  let aux: number = 0;
  const array: string[] = contrasena.split("");
  for (let i = 0; i < array.length; i++) {
    if (
      array[i] === "1" ||
      array[i] === "2" ||
      array[i] === "3" ||
      array[i] === "4" ||
      array[i] === "5" ||
      array[i] === "6" ||
      array[i] === "7" ||
      array[i] === "8" ||
      array[i] === "9" ||
      array[i] === "0"
    ) {
      aux++;
    }
    if (array[i] === array[i + 1] && array[i + 1] === array[i + 2]) {
      aux--;
    }
    if (array.length > 20) {
      aux += 2;
    }
    if (array.length < 10) {
      aux--;
    }
    if (
      array[i] === "!" ||
      array[i] === "@" ||
      array[i] === "#" ||
      array[i] === "$" ||
      array[i] === "%" ||
      array[i] === "&" ||
      array[i] === "*" ||
      array[i] === "(" ||
      array[i] === ")" ||
      array[i] === "-" ||
      array[i] === "_" ||
      array[i] === "=" ||
      array[i] === "+" ||
      array[i] === "[" ||
      array[i] === "]" ||
      array[i] === "{" ||
      array[i] === "}" ||
      array[i] === ";" ||
      array[i] === ":" ||
      array[i] === "'" ||
      array[i] === '"' ||
      array[i] === "," ||
      array[i] === "." ||
      array[i] === "/" ||
      array[i] === "?" ||
      array[i] === "¡" ||
      array[i] === "¿"
    ) {
      aux++;
    }
  }
  return aux;
}

const seguridad = seguridadContrasena("hola123");
console.log(seguridad);

//ej3
function transformarHora(hora: string): string {
  let aux: string = "";
  const array: string[] = hora.split("");
  if (array[8] === "P") {
    if (array[0] === "1" && array[1] === "2") {
      aux = "12";
    } else {
      aux = (parseInt(array[0]) + 1).toString() + (parseInt(array[1]) + 2);
    }
  } else {
    if (array[0] === "1" && array[1] === "2") {
      aux = "00";
    } else {
      aux = array[0] + array[1];
    }
  }
  for (let i = 2; i < 8; i++) {
    aux += array[i];
  }
  return aux;
}

const hora = transformarHora("07:05:45PM");
console.log(hora);
