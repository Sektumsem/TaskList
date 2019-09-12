//Define UI elements

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListener();

function loadEventListener(){
    form.addEventListener('submit', addTask);
}

function addTask(e){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const deleteLink = document.createElement('a');
    deleteLink.className = 'delete-item secondary-content';
    deleteLink.innerHTML = '<i class="fa-remove"></i>';
    li.appendChild(deleteLink);
    taskList.appendChild(li);


    console.log(li);


    e.preventDefault();
}