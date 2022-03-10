function challenge(word)
{
    let words = {};
    let output = "Número de veces que aparece cada palabra: \n\n";
    //word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\r\n|\r|\n/, " ").replace(/\(.+?\)/g, "").replace(/\W/g, " ");

    //word = word.normalize("NFD").replace(/[^a-z0-9\s]+/ig, ''); Esto sería para eliminar acentos, además admite números
    word = word.replace(/[^a-z\sÀ-ÿ-]+/ig, " ").replace(/[\r\n]/g, " ").replace(/\s{2,}/g, ' ').replace(/-{2,4}/g, ' ').toLowerCase().split(' '); //Esto admite acentos, pero no admite números
    // word = word.toLowerCase().split(' ');
    let word_count = 0;
    word.map((item) =>
    {
        if(item != '')
        {    
            if(!(item in words))
            {
                words[item] = 1;
                word_count+=1
            }
            else
            {
                words[item] += 1;
                word_count+=1
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

    let eigthy = Math.floor((word_count)*0.8);
    let pareto = 0;
    let frecuency_count = 0;
    for(key in words)
    {
        if(frecuency_count + words[key]<= eigthy)
        {
            frecuency_count+=words[key];
            pareto++;
        }
        else
        {
            break;
        }
    }

    output+='\nCantidad de palabras distintas: ' + quantity;
    output+='\nSegún el principio de Pareto se necesitaría conocer el 20% de las palabras del texto para entenderlo.\nEl 80% de ' + word_count + ' palabras que tiene el texto es: ' + eigthy + '.\nPor tanto, la cantidad de palabras distintas que tendrías que conocer para llegar al 20% es: ' + (quantity - pareto);
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