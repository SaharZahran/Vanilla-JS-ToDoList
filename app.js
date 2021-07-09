//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('form');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
    
//Functions
function addTodo(event){
    event.preventDefault();
    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class= 'fas fa-check'></i>";
    todoDiv.appendChild(completedButton);
    completedButton.classList.add('complete-btn');

    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
    todoDiv.appendChild(trashButton);
    trashButton.classList.add('trash-btn');
    todoList.appendChild(todoDiv);
    form.reset();
}

function deleteCheck(event){
    const item = event.target;

    if(item.classList[0] === 'trash-btn'){
        item.parentElement.classList.add('fall');
        item.parentElement.addEventListener('transitionend', (e) => {
            item.parentElement.remove();
        })
    }
    if(item.classList[0] === 'complete-btn'){
      item.parentElement.classList.toggle('completed');
    }
}































