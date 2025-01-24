const addTaskBtn = document.getElementById('add-task-btn');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskTitle = taskTitleInput.value.trim();
  if (taskTitle === '') {
    alert('Please enter a task.');
    return;
  }

  const taskItem = createTaskElement(taskTitle);
  taskList.appendChild(taskItem);

  saveTaskToLocalStorage(taskTitle);

  taskTitleInput.value = '';
}

function createTaskElement(taskTitle) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    taskText.classList.toggle('completed');
    updateLocalStorage();
  });

  const taskText = document.createElement('span');
  taskText.textContent = taskTitle;
  taskText.addEventListener('dblclick', () => editTask(taskText));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    removeTaskFromLocalStorage(taskTitle);
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);

  return li;
}

function editTask(taskText) {
  const newTaskTitle = prompt('Edit your task:', taskText.textContent);
  if (newTaskTitle && newTaskTitle.trim() !== '') {
    removeTaskFromLocalStorage(taskText.textContent);
    taskText.textContent = newTaskTitle.trim();
    saveTaskToLocalStorage(newTaskTitle.trim());
  }
}

function saveTaskToLocalStorage(taskTitle) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskTitle);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskTitle => {
    const taskItem = createTaskElement(taskTitle);
    taskList.appendChild(taskItem);
  });
}

function removeTaskFromLocalStorage(taskTitle) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskTitle);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item span').forEach(task => {
    tasks.push(task.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
