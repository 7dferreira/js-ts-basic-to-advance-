const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi(){               // 6 - Esta função só vai ter como objetivo criar um elemento na nossa lista.
    const li = document.createElement('li');
    return li;                     // 7 - As constantes li estão separadas uma da outra, pois encontram-se em escopos diferentes.
}

inputTask.addEventListener('keypress', function(e){ // 8 - função que cria uma nova tarefa clicando no botão enter.
    if(e.keyCode === 13){
        if(!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function clearInput(){            // 9 - Limpa o valor que estiver no input.
    inputTask.value = '';
    inputTask.focus();            // 10 - evento de focus permite que o cursor continue a piscar.
}

function deleteButton(li){        // 12 - função que cria um btn para apagar uma tarefa e recebe o elemento li (sitio onde vou add o btn).
    li.innerText += ' ';
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Apagar';
    // deleteBtn.classList.add('apagar'); 14 - podiamos criar a classe 'apagar' desta maneira.
    deleteBtn.setAttribute('class', 'apagar'); // 15 - ou então assim onde podemos escolher o atributo que queremos adicionar.
    deleteBtn.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(deleteBtn);
}

function createTask(textInput){   // 3 - Esta função cria 'alguma coisa' com o texto que vai ser inserido no input.
    const li = createLi();        // 4 - De seguida vamos criar um elemento (li), que faça parte da nossa lista (ul), já criada no html.
    li.innerText = textInput;     // 5 - para não colocar tudo na mesma função, vamos criar uma outra função que cria o elemento (li).
    tasks.appendChild(li);
    clearInput();                 // 11 - É importante que a função clearInput() seja chamada depois de criar a tarefa.
    deleteButton(li);             // 13 - A função apagar (deleteBtn()) é chamada após a tarefa já ter sido criada.
    saveTasks();                  // 19 - o que nos falta é salvar a tarefa criada, para isso criamos esta função.
}


btnTask.addEventListener('click', function(){       
    if(!inputTask.value) return; // 1 - Esta condição evita que o utilizador insira uma nova tarefa em branco.
    createTask(inputTask.value); // 2 - Cria uma função que vai receber o texto inserido pelo user.                
});

document.addEventListener('click', function(e){ // 16 - Aqui adicionamos o evento ao botão apagar.
    const el = e.target;                        // 17 - como criámos o btn apagar através do js, vamos ter que receber o evento (e).
    
    if(el.classList.contains('apagar')){
        el.parentElement.remove();              // 18 - desta forma o elemento pai do meu elemento será removido.
        saveTasks();                            // 27 - quando apagamos as tarefas, ele atualiza o localstorage também.
    }
})

function saveTasks(){                           // 20 - criamos um array para guardar as nossas tarefas. 
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];
    
    for(let task of liTasks){                   // 21 - criamos um ciclo for of para podermos iterar sobre os valores do nosso objeto. 
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim(); // 22 - para não salvarmos o texto + apagar, substituimos apagar por nada.
        taskList.push(taskText);                  // 23 - neste momento utilizamos o nosso array para guardar as nossas tarefas.
    }
    const tasksJSON = JSON.stringify(taskList);   // 24 - neste momento vamos guardar as nossas tarefas em formato json numa unica string.
    localStorage.setItem('tasks', tasksJSON);     // 25 - no localstorage só podemos guardar informação em strings, por isso tivemos que converter o nosso json.
                                                  // 26 - quando apagamos a tarefa queremos que ela tmb seja apagada do localstorage.                       
}

function addSaveTasks(){
    const tasks = localStorage.getItem('tasks');  // 27 - se fecharmos e voltarmos ao browser queremos que a nossa lista de tarefas volte para o array.
    const taskList = JSON.parse(tasks);

    for(let task of taskList) {
        createTask(task);
    }
}
