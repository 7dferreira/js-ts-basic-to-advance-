/* XMLHttpRequest (XHR) é um objeto JavaScript usado para fazer requisições HTTP para servidores web a fim de 
interagir com eles de forma assíncrona. Ele é frequentemente usado para atualizar partes de uma página da web 
sem a necessidade de recarregá-la completamente.*/

const request = obj => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();                                 // 1 - vamos instanciar um novo objeto XMLHttpRequest e atriubui-lo a variável xhr.
        xhr.open(obj.method, obj.url, true);                              // 2 - utilizamos o método open para configurar a requisição.
        xhr.send();                                                       // 3 - este método envia a requisição HTTP ao servidor.
    
        xhr.addEventListener('load', () => {                              // 4 - função definida será executada quando a requisição for concluída e a resposta                                                               
            if(xhr.status >= 200 && xhr.status < 300) {                   //     do servidor estiver disponível.
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        });
    });
};                

document.addEventListener('click', e => {
    const el = e.target;
    const tag = el.tagName.toLowerCase();

    if(tag === 'a') {
        e.preventDefault();
        loadPage(el);
    }
});

async function loadPage(el) {
    const href = el.getAttribute('href');
    
    const objConfig = {                                                     // 5 - aqui vamos definir os valores do objeto request.
        method: 'GET',
        url: href
    };                                                           
    
    try {
        const response = await request(objConfig);
        loadResult(response);
    } catch(e) {
        console.log(e);
    }
    
}

function loadResult(response) {
    const result = document.querySelector('.resultado');
    result.innerHTML = response;
}