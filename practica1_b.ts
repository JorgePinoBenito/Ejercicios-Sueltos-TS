//ej 1
function quicksort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return quicksort(left).concat(pivot, quicksort(right));
}

const arrayordenado = quicksort([4, 2, 7, 1, 9, 3]);
console.log(arrayordenado);

//ej 2
function multiplos3y5(a: number): number[] {
  const aux: number[] = [];
  for (let i = 0; i < a; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      aux.push(i);
    }
  }
  return aux;
}

const multiplos = multiplos3y5(45);
console.log(multiplos);

//ej 3
function ordenaralfabeticamente(arr: string[]): string {
  const ordenado = arr.sort();
  const primer = ordenado[0];
  const separado = primer.split("");

  return separado.join(" ");
}

const ordenado = ordenaralfabeticamente(["aaa", "bbb", "ccc"]);
console.log(ordenado);
