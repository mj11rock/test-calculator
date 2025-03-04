// 📝 Task: Implement todo applicatio

// api url for todos
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

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


  const todoText = todoInput.value.trim(); // Foydalanuvchi kiritgan matn

  if (!todoText) {
    alert('Please enter a todo!'); // Bo‘sh kiritishdan saqlanish
    return;
  }

  addTodoToDOM(todoText); // 2. DOM-ga qo‘shish
  todoInput.value = ''; // 3. Input maydonini tozalash
});

// helper function to add todo to DOM. use it in fetchTodos and addTodo
function addTodoToDOM(todoText) {

  const li = document.createElement('li'); // Yangi `<li>` yaratish

  li.textContent = todoText; // Matn qo‘shish

  //  Qo‘shimcha tugmalar
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '';
  toggleBtn.classList.add('addButton')
  toggleBtn.addEventListener('click', () => toggleTodo(li));
  toggleBtn.classList.toggle('active-btn');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'x';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => deleteTodo(li));

  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);

  todoList.appendChild(li); // Ro‘yxatga qo‘shish


}


// 🔄 Changing status
function toggleTodo(element) {
  if (!element) return; // Xatolikni oldini olish
  element.classList.toggle('completed'); // Completed class qo‘shish/olib tashlash

}


// ❌ Remove todo with id
function deleteTodo(element) {
  /*
   1. Implement DELETE request to remove todo
   2. Show error message if request failed
   3. Remove todo from DOM
  */
  if (!element) return; // Xatolikni oldini olish
  element.remove(); // DOM-dan o‘chirish
}
