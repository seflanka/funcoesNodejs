
//Aqui é onde damos o .length no array para saber o total
const quantidadeDoLength = 10

//Setamos um array vasio para poer adicionar o valor de cada item do array
var arrayLength = []

//Usamos um for para interar cada valor no array vazio
for ( var i = 0; i <= quantidadeDoLength; i++) {
    var criandoArray = arrayLength.unshift(i);
    //Dentro da função do unshifth devemos resgatar os valores passando o camido dos objetos
}

//Usa o metodo reduce((a,b) => a + b), para somar os valores dentro do array.
const somaTotal = arrayLength.reduce((a, b) => a+ b ).toFixed([2]);

console.log(somaTotal)