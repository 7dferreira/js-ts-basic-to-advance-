const h1 = document.querySelector('.container h1');
const date = new Date();

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}

function getFullDay(day) {
    switch (day) {
        case 0: return 'Domingo'
        case 1: return 'Segunda-feira'
        case 2: return 'Terça-feira'
        case 3: return 'Quarta-feira'
        case 4: return 'Quinta-feira'
        case 5: return 'Sexta-feira'
        case 6: return 'Sábado'
    }
}

function getFullMonth(month) {
    //#obs# Tática rápida para substituir o switch case
    //_ crie um array com as opções e retone a possíção no indíce, que equivale ao argumento mes.
    //_ const mesesAno = ['Janeiro','Fevereiro','Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto'
    //_ ,'Setembro', 'Outubro','Novembro', 'Dezembro'];
    //_ return mesesAno[mes];

    switch (month) {
        case 0: return 'Janeiro'
        case 1: return 'Fevereiro'
        case 2: return 'Março'
        case 3: return 'Abril'
        case 4: return 'Maio'
        case 5: return 'Junho'
        case 6: return 'Julho'
        case 7: return 'Agosto'
        case 8: return 'Setembro'
        case 9: return 'Outubro'
        case 10: return 'Novembro'
        case 11: return 'Dezembro'
    }
}

function formatedDate(date){
    const weekDay = date.getDay();
    const day = addZero(date.getDate());
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());

    const dayInText = getFullDay(weekDay);
    const monthInText = getFullMonth(month);

    const result = `${dayInText}, ${day} de ${monthInText} de ${year} ${hour}:${minutes}`;
    return h1.innerHTML = result;
}

formatedDate(date);

/*
##########################################################################################################################################


const h1 = document.querySelector('.container h1');
const date = new Date();
h1.innerHTML = date.toLocaleDateString('pt-PT', {dateStyle: 'full'});

*/

