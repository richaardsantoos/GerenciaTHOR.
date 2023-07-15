const localStorageKey = 'to-do-list-RD';

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.some(x => x.name === inputValue);
    return exists;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = ''

    // validação
    if (!input.value) 
    {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista');
    } else if (validateIfExistsNewTask()) {
        alert('Já existe uma tarefa com essa Descrição');
    } else {
        // incrementar o localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button class="btn-ok" id="btn-ok${i}" onclick="removeItem('${values[i]['name']}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg></button></li>`;
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name === data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

showValues();
