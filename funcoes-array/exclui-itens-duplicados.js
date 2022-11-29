

const arr = ['Fernanda', 'Guilherme', 'Daniele', 'Guilherme', 'Marcos', 'Daniele', 'Guilherme']

    for(i = 0; i < arr.length; i++) {
        // ..se o índice do valor atual "indexOf(arr[i])"
        // for diferente do índice corrente "i"
        // retornamos "true"
        const newArray = []

        if(arr.indexOf(arr[i]) == i) {
            newArray.unshift(arr[i] )
        };

        console.log(newArray)
    }
    // Se não houver repetido
    // retornamos false
    return console.log(false);

