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
        const passwordValidation = this.isValidPassword();

        if(validFields && passwordValidation) {
            alert('Formulário enviado!')
            this.form.submit();
        }
    }                                                                   // 3   criamos uma variável para que posteriormente possamos criar
                                                                        //     uma estrutura condicional de envio do formulário.
    isValidPassword() {
        let valid = true;

        const password = this.form.querySelector('.senha');
        const repeatPassword = this.form.querySelector('.repetir-senha');

        if(password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'campos senha e repetir senha precisam ser iguais.')
            this.createError(repeatPassword, 'campos senha e repetir senha precisam ser iguais.')
        }

        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'Senha precisa de ter entre 6 e 12 caracteres.')
        }

        return valid;
    }
    
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

            if(field.classList.contains('cpf')) {                       // 9 - com a validação do cpf já pronta, criamos um método
                if(!this.cpfValidation(field)) valid = false;           //     que que muda a flad de valid para false se o cpf não for válido.
            }

            if(field.classList.contains('usuario')) {                   // 11 - a lógica para validar o campo nome vai ser a mesma do cpf.          
                if(!this.userValidation(field)) valid = false;           
            }
        }
        
        return valid;                                                   // 13 - se o utilizador passar por todas estas condições e flag valid
    }                                                                   //      não mudar para false, ele vai retonar verdadeiro no final.

    userValidation(field) {
        const user = field.value;
        let valid = true;
        if(user.length > 12 || user.length < 3) {
            this.createError(field, 'Insira entre 3 e 12 caracteres.'); // 12 - nós neste caso n queremos retornar falso, pq queremos 
            valid = false;
        }                                                               //      validar outros parametros. para resolver criamos novamente uma flag.
        
        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Insira apenas letras ou numeros'); 
            valid = false;
        } 
        
        return valid;
    }

    cpfValidation(field) {                                              // 10 - aqui recebemos como parametro o campo, pois queremos posteriormente
        const cpf = new ValidaCPF(field.value);                         //      despoltar um erro.
        
        if(!cpf.valida()) {                                            
            this.createError(field, 'CPF inválido');
            return false;
        }

        return true;
    }

    createError(field, msg) {                                            // 5 - para cada campo em branco vamos querer lançar um erro.
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div)                     // 6 - isto faz com que o erro surja imediatamente após o input.    
        
    }
}

const validate = new FormValidator();