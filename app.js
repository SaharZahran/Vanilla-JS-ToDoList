//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const form = document.querySelector("form");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function createTodoItem(itemValue){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = itemValue;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class= 'fas fa-check'></i>";
    todoDiv.appendChild(completedButton);
    completedButton.classList.add("complete-btn");
  
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
    todoDiv.appendChild(trashButton);
    trashButton.classList.add("trash-btn");
    todoList.appendChild(todoDiv);
}

function addTodo(event) {
  event.preventDefault();
  createTodoItem(todoInput.value);
  saveLocaleTodos(todoInput.value);
  form.reset();
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "trash-btn") {
    item.parentElement.classList.add("fall");
    item.parentElement.addEventListener("transitionend", (e) => {
      item.parentElement.remove();
      removeLocalTodos(item.parentElement);
    });
  }
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
    addDoneItems(item.parentElement.innerText);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function checkLocalStorage(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function saveLocaleTodos(todo){
    let todos = checkLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos = checkLocalStorage();
    let doneItems = JSON.parse(localStorage.getItem('doneItems'));
    todos.forEach((todo) => {
    createTodoItem(todo);
    });
    const allLis = document.querySelectorAll('li');
    allLis.forEach(li => {
        if(doneItems.includes(li.innerText)){
            li.parentElement.classList.add('completed');
        }
    })
}

function removeLocalTodos(todo){
    let todos = checkLocalStorage();
    todos.forEach(toodoo => {
        if(toodoo === todo.innerText){
            todos.splice(todos.indexOf(toodoo), 1);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    })
}

const arrOfDoneItems = [];
function addDoneItems(done) {
    let todos = checkLocalStorage();
    todos.forEach(todo => {
        if(todo === done){
        arrOfDoneItems.push(done);
        }
        localStorage.setItem('doneItems', JSON.stringify(arrOfDoneItems));
    })
    return arrOfDoneItems;
}





