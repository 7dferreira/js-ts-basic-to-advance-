/* fetch('pessoas.json')                                           // 1 - vamos buscar os dados que estão guardados no ficheiro json.
    .then(response => response.json())                             // 2 - recebemos os dados através da fetch api.
    .then(json => loadElements(json));   */                        // 3 - o próprio json retorna uma nova promise.

axios('pessoas.json')
    .then(response => loadElements(response.data));                // 6 - em vez de utilizarmos fetch api, podemos utilizar axios.

function loadElements(json) {                                   // 4 - criamos uma função que vai carregar os elementos na página através de uma tabela.
    const table = document.createElement('table');
    for(let pessoa of json) {                                   // 5 - percorremos o ficheiro json e vamos buscar as informações que pretendemos.
        const tr = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.innerHTML = pessoa.nome;
        tr.appendChild(td1)

        let td2 = document.createElement('td');
        td2.innerHTML = pessoa.idade;
        tr.appendChild(td2)

       /*  let td3 = document.createElement('td');
        td3.innerHTML = pessoa.salario;
        tr.appendChild(td3) */

        table.appendChild(tr);
    }

    const resultado = document.querySelector('.resultado');
    resultado.appendChild(table);

}