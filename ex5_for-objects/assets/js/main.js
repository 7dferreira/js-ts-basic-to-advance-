const elementos = [
    {tag: 'p', texto: 'Frase 1'},
    {tag: 'div', texto: 'Frase 2'},
    {tag: 'footer', texto: 'Frase 3'},
    {tag: 'section', texto: 'Frase 4'}
];

const container = document.querySelector('.container');
const div = document.createElement('div');

for (let i = 0; i < elementos.length; i++) {
    let { tag, texto } = elementos[i];              // Atribuição via desestruturação
    let tagCriada = document.createElement(tag);
    tagCriada.innerText = texto;                    // ou -> let textoCriado = document.CreateTextNode(texto);
    div.appendChild(tagCriada);                     //       tagCriada = textoCriado.appendChild(texto);
}

container.appendChild(div);