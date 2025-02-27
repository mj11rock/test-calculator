// 📝 Task: Implement todo applicatio

// api url for todos
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 📥 Fetching initial todo when page loaded
window.addEventListener('DOMContentLoaded', fetchTodos);

// Get initial todos from API
function fetchTodos() {
  /*
    1. read about fetch https://learn.javascript.ru/fetch
    2. limit the number of tasks to 10
    3. show error message if fetch failed
  */
  // fetch template -> fetch(url, options)
}

// ➕ Adding new todo
todoForm.addEventListener('submit', event => {
  //! do not delete this line
  event.preventDefault();

  /*
    1. Implement POST request to add new todo
    2. Add new todo to DOM
    3. Clear input field
    4. Show error message if request failed
  */
});

// helper function to add todo to DOM. use it in fetchTodos and addTodo
function addTodoToDOM(todo) {
  //! do not delete this line
  const li = document.createElement('li');
  /**
    Created li item is your todo item. todo element has 'completed' class to mark it as completed. 
    You have to inhance to li element with: 
     - Adding 'title' block to show todo title from todo.title
     - Adding 'actions' block to show actions (complete and delete)
   */
  todoList.appendChild(li);
}

// 🔄 Changing status
function toggleTodo(id, element) {
  //! do not delete this line
  const completed = !element.parentElement.parentElement.classList.contains('completed');

  /**
   * 1. Implement PUT request to update todo status
   * 2. Show error message if request failed
   * 3. Toggle 'completed' class on todo item
   */
}

// ❌ Remove todo with id
function deleteTodo(id, element) {
  /*
   1. Implement DELETE request to remove todo
   2. Show error message if request failed
   3. Remove todo from DOM
  */
}