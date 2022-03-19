/* 
    node streams são diferentes das webs streams.
    O fetch trabalha com a especificação da web.

    O client vai colher dados sob demanda.
*/
import axios from 'axios';
import {Transform, Writable} from 'stream';
/* -------- Diferença do pipeline para o pipe 
    Esse pipeline é uma promise, pode usar await
    Vantagem, se alguém no fluxo der problema, ele fecha todos os eventos q estão escutando.
    Desvantagem, se precisar criar stream q possa ser interrompida no meio, não vai funcionar.

        Ex: Cliente apertou play para ouvir a transmissão da rádio na web e fechou o browser no meio da transmissão, aí o servidor quebra. Porque o pipeline como promise supõe que a transmissão será realizada até o final, até finalizar.
    
    Outra desvantagem, é que as funções de manipulação de erros não limpam alguns objetos da memória quando uma stream quebra. Ou seja, pode acontecer vazamento de memória.
*/
import {pipeline} from 'stream/promises';

const url = 'http://localhost:3000';

async function consume(){
    const res = await axios({
        method: 'get',
        url,
        responseType: 'stream'// Não precisa aguardar o request terminar
        // A medida que dado vai chegando, vai passando adiante.
    });
    return res.data; // retorna um readable stream
}

const stream = await consume();

stream
    .pipe(
        new Transform({
            transform(chunk/*entrada*/, encoding/*formato*/, callback){
                const item = JSON.parse(chunk);//entrada, Converts JSON string into an object.
                // console.log({item});
                const myNumber = /\d+/.exec(item.name)[0]; // Regex
                // console.log(myNumber)

                let name = myNumber;
                if(name % 2 === 0) name = name.concat(' é par');
                else name = name.concat(' é ímpar');
                item.name = name;

                console.log({item});
                callback(null, JSON.stringify(item));//termina o processamento
                // 1º parametro: erro, se não tem erro, é null
                // 2º parametro: data como string
            }
        })
    )
    // Podemos ter vários pipes para processar os dados, como uma corrente. 
    .pipe(
        new Transform({
            transform(chunk, encoding, callback){
                callback(null, chunk.toString().toUpperCase());
            }
        })
    )
    .pipe(
        new Writable({
            write(chunk, encoding, callback){
                console.log('Receiving Buffer: ', chunk); // Pedaço em Buffer
                console.log('Receiving String: ', chunk.toString());
                callback(null, chunk.toString());//termina o processamento
            }
        })
    )
