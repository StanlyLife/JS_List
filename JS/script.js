//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

const filterOptions = document.querySelector(".filter-todo");
//listeners

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

filterOptions.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);
//functions

function addTodo(event) {
  //stop refresh on submit
  event.preventDefault();

  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //todo list
  const newTodo = document.createElement("li");
  //Get value
  newTodo.innerText = todoInput.value;
  //
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  //completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fa fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //apend todo list
  todoList.appendChild(todoDiv);

  //add to local storage
  saveLocalTodo(todoInput.value);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  //delete todo
  if (item.classList[0] === "trash-btn") {
    //animation
    todo.classList.add("fall");

    //Remove todo from local storage
    removeLocalTodos(todo);

    //eventlistener
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //mark completed
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
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
      case "progress":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    console.log("no local storage");
    todos = [];
  } else {
    console.log("item in local storage");
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    console.log("no local storage");
    todos = [];
  } else {
    console.log("item in local storage");
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    /*dublicate code, clean up*/

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");

    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    /*end duplicate code */
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
