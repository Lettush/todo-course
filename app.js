// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
/* 
    DOMContentLoaded = html doc is loaded event
    click = on click event
*/
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // prevent the default refresh after submitting
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);

    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    // create event listener for the new button
    completedButton.addEventListener("click", (e) => {
        // get the parent of the button and add completed class
        e.target.parentElement.classList.toggle("completed");
    });
    todoDiv.appendChild(completedButton);

    // CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    // create event listener for the new button
    trashButton.addEventListener("click", (e) => {
        const todo = e.target.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        // after transition from fall class is done, remove the todo
        todo.addEventListener("transitionend", (e) => {
            todo.remove();
        });
    });
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);

    // CLEAR TODO INPUT
    todoInput.value = "";
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        // get the value from the select/dropdown
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
                break;
        }
    });
}

function checkTodos() {
    // returns the contents of todos if it exists in the local storage, else empty array
    if (localStorage.getItem("todos") === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem("todos"));
    }
}

function saveLocalTodos(todo) {
    // Check if exists
    let todos = checkTodos();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    // Check if exists
    let todos = checkTodos();

    // get text of todo, then get the position of the text in the localStorage array to remove it
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // Check if exists
    let todos = checkTodos();

    // recreation of divs
    todos.forEach((todo) => {
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        // create event listener for the new button
        completedButton.addEventListener("click", (e) => {
            // get the parent of the button and add completed class
            e.target.parentElement.classList.toggle("completed");
        });
        todoDiv.appendChild(completedButton);

        // CHECK TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        // create event listener for the new button
        trashButton.addEventListener("click", (e) => {
            const todo = e.target.parentElement;
            // animation
            todo.classList.add("fall");
            removeLocalTodos(todo);
            // after transition from fall class is done, remove the todo
            todo.addEventListener("transitionend", (e) => {
                todo.remove();
            });
        });
        todoDiv.appendChild(trashButton);

        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}
