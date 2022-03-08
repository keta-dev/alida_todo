document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('.collection').addEventListener('click', handleDelete);

// Event Handlers
function handleSubmitForm(e) {
  e.preventDefault();
  let input = document.querySelector('input');

   // Store in LS
   storeTaskInLocalStorage(input.value);

  if(input.value !== '') {
    addTodo(input.value);
    input.value = '';
  }
}

function handleDelete(e) {
  if (e.target.name == 'deleteButton') {
    deleteTodo(e);
  }
}

// Helper Function
function addTodo(todo) {
  let ul = document.querySelector('.collection');
  let li = document.createElement('li');

  li.innerHTML = `
    <input type="checkbox" name="checkButton" />
    <span class="todo-item">${todo}</span>
    <i class= "fa fa-pencil"></i>
    <button name="deleteButton"><i class="fa fa-trash"></i></button>
  `;

  li.classList.add('todo-list-item');
  ul.appendChild(li);
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('deleteButton')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTodo(e) {
  let item = e.target.parentNode;
  
  item.addEventListener('transitioned', function () {
      item.remove(); 
  });

  item.classList.add('todo-list-item-fall');
}