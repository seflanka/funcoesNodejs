
const total = 72
const array = [
    {
    cadastrados: 5,
    porcentRealacaoTotal: null
    },
    {
    cadastrados: 32,
    porcentRealacaoTotal: null
    },
    {
    cadastrados: 25,
    porcentRealacaoTotal: null
    },
    {
    cadastrados: 10,
    porcentRealacaoTotal: null
    },
]

for(var i = 0; i < array.length; i++) {
    array[i].porcentRealacaoTotal = Number((array[i].cadastrados * 100 / total).toFixed(2))
}



console.log(array)



