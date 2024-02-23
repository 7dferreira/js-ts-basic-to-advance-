const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
const uppercase = () => String.fromCharCode(rand(65, 91));
const lowercase = () => String.fromCharCode(rand(97, 123));
const number = () => String.fromCharCode(rand(48, 58));
const symbol = ',.;~^[]{}!@#$%*()_+=-'
const symbols = () => symbol[rand(0, symbol.length)];

export default function passwordGenerator(qt, up, lower, num, symbl) {
    const passwordArray = [];
    qt = Number(qt);

    for (let i = 0; i < qt; i++) {
        up && passwordArray.push(uppercase());                               // 1 - se 'up' que são as letras maiúsculas for verdadeiro 
        lower && passwordArray.push(lowercase());                            //      ele passa para a próxima checkagem.
        num && passwordArray.push(number());                                 // avaliação de curto-circuito
        symbl && passwordArray.push(symbols());
    }

    return passwordArray.join('').slice(0, qt);
}

