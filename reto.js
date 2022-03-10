function challenge(word)
{
    let words = {};
    let output = "Número de veces que aparece cada palabra: \n\n";
    //word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\r\n|\r|\n/, " ").replace(/\(.+?\)/g, "").replace(/\W/g, " ");

    //word = word.normalize("NFD").replace(/[^a-z0-9\s]+/ig, ''); Esto sería para eliminar acentos, además admite números
    word = word.replace(/[^a-z\sÀ-ÿ-]+/ig, " ").replace(/[\r\n]/g, " ").replace(/\s{2,}/g, ' ').replace(/-{2,4}/g, ' ').toLowerCase().split(' '); //Esto admite acentos, pero no admite números
    word = word.toLowerCase().split(' ');
    word.map((item) =>
    {
        if(item != '')
        {    
            if(!(item in words))
            {
                words[item] = 1;
                // words.push([item, words[item]])
            }
            else
            {
                words[item] += 1;
            }
        }
    })

    let words_array = [];
    for(key in words)
    {
        words_array.push([key, words[key]]);
    }

    words_array.sort((a, b) =>
    {
        return b[1] - a[1];
    })
    words = {};
    words_array.map((item) =>
    {
        words[item[0]] = item[1]
    })
    //Montaje del output

    for(key in words)
    {
        output += key + '  -> ' + words[key] + '\n';
    }
    let quantity = Object.keys(words).length

    let twenty = Math.floor((quantity)*0.2);

    output+='\nCantidad de palabras distintas: ' + quantity;
    output+='\nSegún el principio de Pareto se necesitaría conocer el 20% de las palabras del texto para entenderlo.\nEl 20% de ' + quantity + ' es: ' + twenty;
    return output;
}

const fs = require('fs')

fs.readFile('./text.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(challenge(data));
})