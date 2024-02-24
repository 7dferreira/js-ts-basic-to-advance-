const fs = require('fs').promises;                        // 1 - quando pedimos ao programa para ler que pastas existem no diretório ou para ler
const path = require('path');                             //     arquivos, ele vai levar um certo tempo. para o programa não retornar o valor
                                                          //     final sem terminar de ler os arquivos, utilizamos promises.
async function readdir(rooDir) {
    rooDir = rooDir || path.resolve(__dirname);           //     se a rootDir for enviada usamos a mesma senão utilizamos o caminho absoluto.
    const files = await fs.readdir(rooDir);
    walk(files, rooDir);
}

async function walk(files, rooDir) {
    for(let file of files) {
        const fileFullPath = path.resolve(rooDir, file);      // rootDir e file, vai-nos devolver os nomes dos arquivos que estão dentro do diretório.
        const stats = await fs.stat(fileFullPath)             // stat vai-nos dar informações sobre os diretórios, para isso precisamos do caminho completo.
                                                              // stat vai-nos retornar uma promessa, foi por isso que usámos async/await.
        if(/\.git/g.test(fileFullPath)) continue;             // se houver .git no path, o programa continua e n mostra na consola.

        if(stats.isDirectory()) {                             // 2 - se no momento do loop o arquivo for um diretório, o programa volta 
            readdir(fileFullPath);                            //     à função readdir e lista os arquivos do respetivo diretório.
            continue;                                         //     neste caso utilizamos recursão mútua. 
        }

        if(                                                   // tudo o que for diferente de css e html ele n mostra.
            !/\.html$/g.test(fileFullPath)
        ) continue;

        console.log(fileFullPath);
    }
}

readdir('/CursoJS/');

