const contentContainer = [document.querySelector(".content-container")]
const input = document.querySelector("#input");
var taskIndex = 1;

var tasks = [];

function createTaskInLocalStorage(index, title, checked){

  tasks = getStorageData()

  let taskArray = []

  taskArray[0] = index
  taskArray[1] = title
  taskArray[2] = checked

  tasks.push(taskArray);
  localStorage.tasksArr = JSON.stringify(tasks);
}

function limpar (i){
  
  tasks = getStorageData()

  console.log(tasks[i])

  tasks.splice(tasks[i], 1)

  //tasks = []//

  localStorage.tasksArr = JSON.stringify(tasks)
}

function createHtmlElement (index, title){

  let element = `
  <div class="content" value='${index}'>
    <div class="title-container">
      <button onclick='checkTask(value)' value='${index}' class="checkbox" id="check-button">&#10003;</button>
      <p id='title' class="title">${title}</p>
    </div>
    <div class="button-container">
      <button onclick='deleteTask(value)' value='${index}' class="button" id="remove-button">&#128465;</button>
    </div>
  </div>
`

  return element
}

function CreateTask(){
  let title = input.value;
  let checked = false;

  if(input.value == ''){
    alert('Insira um título para a tarefa!')
  }else{
    contentContainer[0].innerHTML += createHtmlElement(taskIndex, title);
    createTaskInLocalStorage(taskIndex, title, checked)
  }

  taskIndex++;
  input.value = '';
}

function deleteTask(value){
  var remove = document.querySelectorAll('#remove-button')
  var content = document.querySelectorAll('.content')

  for(let i =0; i<remove.length; i++){
    if(content[i].getAttribute('value') === value){
      content[i].parentNode.removeChild(content[i])
      limpar(i)
    }
  }

}

function getStorageData(){
  if (localStorage.tasksArr){
    tasks = JSON.parse(localStorage.getItem('tasksArr'));
  };

  return tasks;
}

function carregarTasks(){

  let tasks = getStorageData();

  for(let i =0; i<tasks.length; i++){
    contentContainer[0].innerHTML += createHtmlElement(i, tasks[i][1])
  }

  for(let i =0; i<tasks.length; i++){
    if(tasks[i][2] == true){
      addChecked(i)
    }
  }

  taskIndex = tasks.length
  
}

function checkTask(value){
  var tasks = document.querySelectorAll('#check-button')
  var title = document.querySelectorAll('#title')
  var content = document.querySelectorAll('.content')

  tasksList = getStorageData()

  for(let i =0; i<tasks.length; i++){
    if(content[i].getAttribute('value') === value){
      if(!title[i].classList.contains('text-checked') && tasksList[i][2] === false){
        addChecked(i)
        tasksList[i][2] = true
      }else {
        removeChecked(i)
        tasksList[i][2] = false
      }
    }
  }

  localStorage.tasksArr = JSON.stringify(tasksList)
}

function addChecked(i){
  var tasks = document.querySelectorAll('#check-button')
  var title = document.querySelectorAll('#title')
  
  title[i].classList.add('text-checked')
  tasks[i].classList.add('button-checked')
}

function removeChecked(i){
  var tasks = document.querySelectorAll('#check-button')
  var title = document.querySelectorAll('#title')
  
  title[i].classList.remove('text-checked')
  tasks[i].classList.remove('button-checked')
}

window.onload = carregarTasks()

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      CreateTask();
  }
});