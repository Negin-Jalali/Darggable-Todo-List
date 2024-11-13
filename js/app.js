// variables
let $ = document;

let task = $.querySelectorAll('.todo');
let addTaskButton = $.getElementById('add_btn')
let closeModalButton = $.getElementById('close_modal')
let modal = $.querySelector('.modal');
let overlay = $.getElementById('overlay');
let taskSubmit = $.getElementById('todo_submit')
let taskInput = $.getElementById('todo_input')
let taskArea = $.getElementById('no_status')
let closeSpan = $.querySelectorAll('.close')
let darkToggle = $.querySelector('.mode-container')
let flicker = $.querySelector('.flicker')


// modal display
addTaskButton.addEventListener('click', addTask);

function addTask(){
    modal.classList.add('active')
    overlay.classList.add('active')
}

// modal hide
closeModalButton.addEventListener('click', modalHide);

function modalHide(){
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//adding task 
taskSubmit.addEventListener('click', function(){
    if(taskInput.value != ''){
        taskMake()
        modalHide()
        taskInput.value = ''
    }
    
})
function taskMake(){
    let todoDiv = $.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('draggable', true);
    todoDiv.innerHTML = taskInput.value;
    let span = $.createElement('span');
    span.className = 'close';
    span.innerHTML = '&times;'
    todoDiv.append(span)
    span.addEventListener('click', taskDelete)

    todoDiv.addEventListener('dragstart', function(event){
        randomNum(event);
        event.dataTransfer.setData('todoElem', event.target.id);
    })
    taskArea.append(todoDiv)
}


//random id for tasks
function randomNum(event){
    //id equals to users task
    let randomNum = Math.trunc(Math.random(Math.floor()) * 100000)
    event.target.setAttribute('id', randomNum)
    console.log(event.target);
} 

// make todo draggable
task.forEach(function(todo){
    todo.addEventListener('dragstart', function(event){
        randomNum(event);
        event.dataTransfer.setData('todoElem', event.target.id);
    })
})

// drop boxes
function dropHandler(event){
    let elemId = event.dataTransfer.getData('todoElem');
    let targetElem = $.getElementById(elemId)

    event.target.append(targetElem)

}

// drag over bann
function dragOverBann(event){
    event.preventDefault()
}

// delet task
closeSpan.forEach(function(close){
    close.addEventListener('click', taskDelete)
})

function taskDelete(event){
    event.target.parentElement.remove()
}

// adding task using Enter
taskInput.addEventListener('keyup', function(event){
    if(event.code === 'Enter'){
        modalHide()
        if(taskInput.value != ''){
            taskMake()
            taskInput.value = ''
        }
    }
})
$.body.addEventListener('keyup', addTask)


// Dark and light mode

darkToggle.addEventListener('click', function(){

    $.body.classList.toggle('dark');
    if($.body.classList.contains('dark')){
        localStorage.setItem('theme', 'dark')
    }else{
        localStorage.setItem('theme', 'light')
    }

})

window.onload = function(){
    let localTheme = localStorage.getItem('theme')
    if (localTheme === 'dark'){
        $.body.classList.add('dark')
    }
}

