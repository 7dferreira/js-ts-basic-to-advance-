class FormValidator {
    constructor() {
        this.form = document.querySelector('.formulario');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {                     // 1 - Criamos o evento submit, com a nossa callback function (esta
            this.handleSubmit(e);                                       //     função será chamada quando o evento de envio for acionado).
        });

    }

    handleSubmit(e) {                                                   
        e.preventDefault();                                             // 2 - prevenimos que o formulário seja enviado automaticamente, para
        const validFields = this.isValidFields();                       //     que possamos primeiro validar os nossos campos.
    }                                                                   // 3   criamos uma variável para que posteriormente possamos criar
                                                                        //     uma estrutura condicional de envio do formulário.
    isValidFields() {
        let valid = true;
        
        for(let errorText of this.form.querySelectorAll('.error-text')) {  // 8 - no momento que submetermos novamente o formulário os erros anteriores vão ser apagados.
            errorText.remove();
        }

        for(let field of this.form.querySelectorAll('.validar')) {      // 4 - criamos um ciclo for para que possamos selecionar os campos
            const label = field.previousElementSibling.innerText;       // 7 - selecionamos o nome do campo que está no label, para aparecer na msg de erro.
            
            if(!field.value) {                                          //     que queremos validar. se for uma string vazia vai validar como falso.
                this.createError(field, `Campo "${label}" não pode estar em branco!`);
                valid = false;
            }
        }                                         
    }

    createError(field, msg) {                                            // 5 - para cada campo em branco vamos querer lançar um erro.
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div)                     // 6 - isto faz com que o erro surja imediatamente após o input.    
        
    }
}

const validate = new FormValidator();