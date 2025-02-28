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
  let fetchedTodos = []
  fetch(API_URL + "?_limit=10", {
    method: "GET"
  }).then(response => response.json()).then(data => {
    console.log(data)
    if (data.length) {
      const todoListElement = document.getElementById("todo-list")
      for (let i = 0; i < data.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `${data[i].id} <br> ${data[i].title}`
        todoListElement.appendChild(li)
      }
    }
  })
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
  const todoList = document.getElementById("todoList"); // ul,ol
  const li = document.createElement('li');//li yaratish
  li.textContent = todo.title; //todo matn qoyish

  /**
    Created li item is your todo item. todo element has 'completed' class to mark it as completed. 
    You have to inhance to li element with: 
     - Adding 'title' block to show todo title from todo.title
     - Adding 'actions' block to show actions (complete and delete)
   */
  todoList.appendChild(li);//ul ol ichiga qo'shish
}

// 🔄 Changing status
function toggleTodo(id, element) {
  //! do not delete this line
  const todoItem = element.parentElement.parentElement; // Todo elementini olish
  const completed = !element.parentElement.parentElement.classList.contains('completed');
  todoItem.classList.toggle("completed");//UI yangilash
  /**
   * 1. Implement PUT request to update todo status
   * 2. Show error message if request failed
   * 3. Toggle 'completed' class on todo item
   */

  // 1. PUT so‘rov orqali serverda todo statusini yangilash
  fetch(`https://learn.javascript.ru/fetch/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: completed }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log("Todo updated:", data))
    .catch(error => {
      console.error("error:", error);
      alert("Error updating todo status!");

      // 2. Agar xatolik bo‘lsa, 'completed' qaytarib qo‘yamiz
      todoItem.classList.toggle("completed");
    });

}

// ❌ Remove todo with id
function deleteTodo(id, element) {
  /*
   1. Implement DELETE request to remove todo
   2. Show error message if request failed
   3. Remove todo from DOM
  */
  function deleteTodo(id, element) {
    fetch(`https://learn.javascript.ru/fetch/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`error: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        console.log("Todo deleting:", id);
        element.parentElement.parentElement.remove(); // UI-dan olib tashlash
      })
      .catch(error => {
        console.error("error:", error);
        alert("Error deleting Todo!");
      });
  }

}