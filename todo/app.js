// 📝 Task: Implement todo applicatio

// api url for todos
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// function addTask() {
//   if (todoInput.value === '') {
//     alert("you must write something!")
//   }
//   else {
//     let li = document.createElement("li");
//     li.innerHTML = todoInput.value;
//     todoList.appendChild(li);
//     let span = document.createElement("span");
//     span.innerHTML = "\u00d7";
//     li.appendChild(span);
//   }
//   todoInput.value = "";
//   saveData();
// }
// todoList.addEventListener("click", function (e) {
//   if (e.target.tagName === "LI") {
//     e.target.classList.toggle("checked");
//   }
//   else if (e.target.tagName === "SPAN") {
//     e.target.parentElement.remove();
//     saveData();
//   }
// }, false);
// function saveData() {
//   localStorage.setItem("data", todoList.innerHTML);
// }
// function showTask() {
//   todoList.innerHTML = localStorage.getItem("data");
// }
// showTask()





// 📥 Fetching initial todo when page loaded
window.addEventListener('DOMContentLoaded', fetchTodos);

// Get initial todos from API
function fetchTodos() {
  /*
    1. read about fetch https://learn.javascript.ru/fetch
    2. limit the number of tasks to 10
    3. show error message if fetch failed
  */
  fetch(API_URL + "?_limit=10", {
    method: "GET"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.length) {
        const todoListElement = document.getElementById("todo-list");
        todoListElement.innerHTML = ""; // Eski todo'larni o'chirish

        for (let i = 0; i < data.length; i++) {
          const todo = data[i]; // `todo` o‘zgaruvchisini yaratish

          let li = document.createElement("li");
          li.classList.add("todo-item");
         

          li.innerHTML = `${todo.id}   ${todo.title}`;

          // Checkbox yaratish
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("todo-checkbox");
          checkbox.checked = todo.completed;

          // Checkbox orqali todo-ni completed qilish
          checkbox.addEventListener("change", () => {
            li.classList.toggle("completed", checkbox.checked);
          });

          // Agar todo tugallangan bo‘lsa, completed class qo‘shish
          if (todo.completed) {
            li.classList.add("completed");
          }

          // O‘chirish tugmasi yaratish
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "x";
          deleteBtn.classList.add("delete-button");

          // O‘chirish tugmasi bosilganda todo-ni o‘chirish
          deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Tasodifan o‘zgarmasligi uchun
            deleteTodo(todo.id, li);
          });

          // `li` ga checkbox va delete tugmasini qo‘shish
          li.prepend(checkbox);
          li.appendChild(deleteBtn);
          todoListElement.appendChild(li); // To‘g‘ri elementga qo'shish
        }
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert("An error occurred while retrieving data!");
    });
}


// ➕ Adding new todo
todoForm.addEventListener('submit', async event => {
  //! do not delete this line
  event.preventDefault();

  /*
    1. Implement POST request to add new todo
    2. Add new todo to DOM
    3. Clear input field
    4. Show error message if request failed
  */

  const title = todoInput.value.trim(); // Input maydonidagi qiymatni olish

  if (!title) return; // Bo'sh input bo'lsa, hech narsa qilmaymiz

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    });

    if (!response.ok) throw new Error('Error adding todo');

    const newTodo = await response.json();
    addTodoToDOM(newTodo);
    todoInput.value = '';
  } catch (error) {
    console.error('Error:', error);
    alert('Error adding todo!');
  }
});

// helper function to add todo to DOM. use it in fetchTodos and addTodo
function addTodoToDOM(todo) {
  //! do not delete this line
  const li = document.createElement('li');
  li.textContent = todo.title;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo-checkbox');



  // Agar todo avval tugallangan bo‘lsa, checkbox ni belgilash
  checkbox.checked = todo.completed;

  if (todo.completed) {
    li.classList.add('completed');
  }

  // Matnni bosganda "completed" sinfini qo‘shish yoki olib tashlash
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const actions = document.createElement('div');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'x';
  deleteBtn.classList.add('delete-button');

  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Todo'ni bosganda tasodifan o‘zgarmasligi uchun
    deleteTodo(todo.id, li);
  });


  li.appendChild(checkbox);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);
  todoList.appendChild(li);



  /**
    Created li item is your todo item. todo element has 'completed' class to mark it as completed. 
    You have to inhance to li element with: 
     - Adding 'title' block to show todo title from todo.title
     - Adding 'actions' block to show actions (complete and delete)
   */

}

// 🔄 Changing status
async function toggleTodo(id, element) {
  //! do not delete this line
  let isCompleted = element.classList.contains('completed');
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !isCompleted })
    });
    if (!response.ok) throw new Error('Error updating todo status');

    element.classList.toggle('completed');
  } catch (error) {
    console.error('Error:', error);
    alert('Error updating todo status!');
  }
} /**
   * 1. Implement PUT request to update todo status
   * 2. Show error message if request failed
   * 3. Toggle 'completed' class on todo item
   */





//  Remove todo with id
async function deleteTodo(id, element) {
  /*
   1. Implement DELETE request to remove todo
   2. Show error message if request failed
   3. Remove todo from DOM
  */
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting todo');

    element.remove();
  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting todo!');
  }
}