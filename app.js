//Define UI elements

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListener();

function loadEventListener(){
    document.addEventListener('DOMContentLoaded',getTasks);

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask)

    clearBtn.addEventListener('click', clearTasks);

    filter.addEventListener('keyup',filterTasks);
}

function filterTasks(e){
    const text=e.target.value.toLowerCase();

    Array.from(document.querySelector('.collection-item')).forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
}


function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}



function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
       const li=document.createElement('li');
       li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className ='delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);
    });
}


function addTask(e){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const deleteLink = document.createElement('a');
    deleteLink.className = 'delete-item secondary-content';
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(deleteLink);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value="";


    console.log(li);


    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you shure you want to delete the itim?')){
            e.target.parentElement.parentElement.remove();
            
        }
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);

        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

