function timer(){
    function  getTimeFromSeconds(seconds) {
        const data = new Date(seconds * 1000);
        return data.toLocaleTimeString('pt-PT', {
            hour12: false,
            timeZone: 'UTC'
        });
    }

    const relogio = document.querySelector('.relogio');
    //const iniciar = document.querySelector('.iniciar');
    //const pausar = document.querySelector('.pausar');
    //const zerar = document.querySelector('.zerar');
    let seconds = 0;
    let timer;

    function startTimer(){
        timer = setInterval(function(){
            seconds++;
            relogio.innerHTML = getTimeFromSeconds(seconds);
        }, 1000);
    }

    document.addEventListener('click', function(e){
        const el = e.target;

        if(el.classList.contains('iniciar')){
            relogio.classList.remove('pausado');
            clearInterval(timer);
            startTimer();
        }

        if(el.classList.contains('pausar')){
            clearInterval(timer);
            relogio.classList.add('pausado');   
        }

        if(el.classList.contains('zerar')){
            clearInterval(timer);
            relogio.innerHTML = '00:00:00';
            relogio.classList.remove('pausado');
            seconds = 0;  
        }
    });
}

timer();

/*

iniciar.addEventListener('click', function(e){
    relogio.classList.remove('pausado');
    clearInterval(timer);
    startTimer();
});

pausar.addEventListener('click', function(e){
    clearInterval(timer);
    relogio.classList.add('pausado');
});

zerar.addEventListener('click', function(e){
    clearInterval(timer);
    relogio.innerHTML = '00:00:00';
    relogio.classList.remove('pausado');
    seconds = 0;
});

*/
