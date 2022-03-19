import http from 'http';
import {Readable} from 'stream';
import {randomUUID} from 'crypto';

/* - Generator Function (Padrão de função sob demanda)
    Asterisco (*) significa que não é para esperar processar a função inteira, mas sim, a medida que vai processando, já vai retornando os dados.

    Asterisco (*) significa que vai ser um generator.
    yield significa que vai ser um iterator.
    *** Ou ao contrário, verificar a ordem correta ??? ***
*/
function* run(){
    for(let i = 0; i <= 99; i++){
        const data = {
            id: randomUUID(),
            name: `dado=${i}`
        }
        yield data;// retorna o dado para o chamador, não fica esperando o for terminar.
    }
}
 
function handler(req, res) {
    // Sempre trabalha protocolo string, q será transformada em Buffer
    // Buffer é um outro tipo de dado, research ???
    // Request é uma Readable string, a fonte de dados é o input do client
    // Response é uma Writable string, vai retornar p client o que aconteceu
    const readable = new Readable({
        // gerar os dados
        read(){
            for(const data of run()){
                console.log('Sending: ', data);
                this.push(JSON.stringify(data) + '\n'); // Passar para o pipe como string
            }
            // para informar que os dados acabaram
            this.push(null);
        }
    });

    /* - Um pipe para cada processo, é o pipe q vai gerenciar os dados.
        Ex: pipe receber, pipe filtrar, pipe transformar, pipe retornar.

        Se fosse com função, estariamos guardando os dados em memória.
        Chama uma função que processa, armazena na memória e chama próxima função, e assim por diante...Isso seria ruim.

        Com pipe, o dado vai sendo processado e passado adiante.
    */

    // Um pipe pode ser uma Writeable, e o Response é uma Writeable.
    // Tudo que chegar aqui vai ser enviado p cliente final (response).
    readable.pipe(res);
}

http.createServer(handler)
.listen(3000)
.on('listening', () => console.log('server running at 3000'));
