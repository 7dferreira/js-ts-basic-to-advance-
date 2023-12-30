// outra maneira de programar uma calculadora é utilizar uma função construtora.
// neste exemplo vamos tentar usar os recursos mais modernos da linguagem (arrow functions).

function Calculator() {
    this.display = document.querySelector('.display');

    this.start = () => {
        this.clickBtn();
        this.pressEnter();
    };

    this.pressEnter = () => {
        this.display.addEventListener('keypress', e => {
            if(e.keyCode === 13) {
            this.makeAcc();
            }
        });
    };

    this.clickBtn = () => {
        document.addEventListener('click', event => {
            const el = event.target;
            if(el.classList.contains('btn-num')) this.addNumberToDisplay(el);
            if(el.classList.contains('btn-clear')) this.clearDisplay();
            if(el.classList.contains('btn-del')) this.deleteDisplay();
            if(el.classList.contains('btn-equal')) this.makeAcc(); 
        });
    };

    this.addNumberToDisplay = el => {
        this.display.value += el.innerText;   // 1 - adiciona um novo valor áquele que já está no display.
        this.display.focus();
    };

    this.clearDisplay = () => this.display.value = '';
    this.deleteDisplay = () => this.display.value = this.display.value.slice(0, -1);

    this.makeAcc = () => {
        let acc = this.display.value;

        try {
            acc = eval(acc);

            if(!acc) {
                alert('conta inválida');
                return;
            }
        }catch(e) {
            alert('conta inválida');
            return;
        }
        this.display.value = String(acc);
    };
}

const calculator = new Calculator(); // 1 - a calculator é o objeto com que vamos trabalhar.
calculator.start();

/* Neste exercicio vamos utilizar factory function apenas para praticar. Como só vamos criar 1 calculadora 
que corresponde a um objecto, não precisariamos da factory function. Factory function é útil quando trabalhos com 
mais do que um objeto. */

/*

function createCalculator() {
    return {                                            // 1 - como é uma factory function, vai retornar um objeto.
        display : document.querySelector('.display'),   // 3 - para organizar melhor o código, tudo o que são métodos fica em baixo
                                                        //     atributos, que são as váriáveis dentro do objeto ficam em cima.
        start() {                                       // 2 - é o método start que vai desencadear todos os outros métodos.
            this.clickBtn();
            this.pressEnter();
        },

        pressEnter() {
            this.display.addEventListener('keyup', e => {
                if(e.keyCode === 13) {
                    this.makeAcc();
                }
            });
        },

         makeAcc() {
            let acc = this.display.value;

            try {
                acc = eval(acc);                                        // 7 - dependendo do contexto o método eval, pode trazer falhas de segurança.

                if(!acc) {
                    alert('conta inválida!');
                    return;
                }

                this.display.value = String(acc);
            }catch(e) {
                alert('conta inválida!');
            }
        },

        clearDisplay() {
            this.display.value = '';
        },
                                                                        // 4 - sempre que precisamos de referenciar uma chave dentro do nosso objeto 
        deleteOne() {                                                   //     utilizamos a palavra (this) que é = calculator.
            this.display.value = this.display.value.slice(0, -1);
        },
                                                        
        clickBtn() {
            document.addEventListener('click', function(e) {
                const el = e.target;

                if(el.classList.contains('btn-num')) {
                    this.btnToDisplay(el.innerText);            
                }

                if(el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }

                if(el.classList.contains('btn-del')) {
                    this.deleteOne();
                }

                if(el.classList.contains('btn-equal')) {
                    this.makeAcc();
                }                                       // 5 - nesta linha, o this passou a ser outra coisa, quem chama esta função n
                                                        //     é a calculadora e por isso dá-nos um erro. this é document. Para mudar
            }.bind(this));                              //     o comportamento detes this e deixar de estar liagado ao document.
        },                                              //     utilizamos o método bind que aponta novamente para a calculadora. 
                                                        //     se utilizarmos uma arrow function n precisamos do this.
        btnToDisplay(value) {
            this.display.value += value;                // 6 - aqui vamos concatenar os valores que aparecem no display.

        }
    };
}

const calculator = createCalculator();
calculator.start();                                 

*/