/* XMLHttpRequest (XHR) é um objeto JavaScript usado para fazer requisições HTTP para servidores web a fim de 
interagir com eles de forma assíncrona. Ele é frequentemente usado para atualizar partes de uma página da web 
sem a necessidade de recarregá-la completamente.*/

const request = obj => {
    const xhr = new XMLHttpRequest();                                 // 1 - vamos instanciar um novo objeto XMLHttpRequest e atriubui-lo a variável xhr.
    xhr.open(obj.method, obj.url, true);                              // 2 - utilizamos o método open para configurar a requisição.
    xhr.send();

    xhr.addEventListener('load', () => {
        if(xhr.status >= 200 && xhr.status < 300) {
            obj.success(xhr.responseText);
        } else {
            obj.error(xhr.statusText);
        }
    });
};                                     