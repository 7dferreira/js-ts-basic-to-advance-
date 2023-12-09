
const form = document.querySelector('.form');

form.addEventListener ('submit', function (e) {
    e.preventDefault();
    const inputWeight = e.target.querySelector('#weight');
    const inputHeight = e.target.querySelector('#height');

    const weight = Number(inputWeight.value);
    const height = Number(inputHeight.value);

    if (!weight) {
        setResult('Peso inválido!', false);
        return;
    }

    if (!height) {
        setResult('Altura inválida!', false);
        return;
    }

    const imc = getImc(weight, height);
    const imcLevel = getImcLevel(imc);

    const msg = `O seu IMC é ${imc} (${imcLevel}).`;

    setResult(msg, true);

});

function getImcLevel(imc) {
    const level = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obsidade grau 1', 'Obsidade grau 2', 'Obsidade grau 3'];

    if (imc >= 39.9) return level[5];
    if (imc >= 34.9) return level[4];
    if (imc >= 29.9) return level[3];    
    if (imc >= 24.9) return level[2];
    if (imc >= 18.5) return level[1];
    if (imc < 18.5) return level[0];
}

function getImc(weight, height) {
    const imc = weight / height ** 2;
    return imc.toFixed(2);
}

function createP() {
    const p = document.createElement('p');
    return p;
}

function setResult(msg, isValid) {
    const result = document.querySelector('.result');
    result.innerHTML = '';

    const p = createP();

    if (isValid) {
        p.classList.add('paragraph-result');
    } else {
        p.classList.add('isInvalid');
    }
    
    p.innerHTML = msg;
    result.appendChild(p);
}



