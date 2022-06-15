const inputBox = document.querySelector(".inputField input");
const btnAdd = document.querySelector(".inputField button");
const todoBody = document.querySelector(".todoBody");
const clearAllBtn = document.querySelector(".footer .clearTasks");
const pendingNumber =document.querySelector('.footer .pendingNumber');

//create h4 tag
const h4Tag = document.createElement("h4");
h4Tag.innerText = `Today's Task`;
todoBody.appendChild(h4Tag);
//create ul tag
const listsTodo = document.createElement("ul");
listsTodo.classList.add("todoList");
todoBody.appendChild(listsTodo);

//create pending Number
pendingNumber.innerHTML=countPendingTask();

//add event click check complete task
document.addEventListener("click", completeTasks);
//add event click trashbin
document.addEventListener("click", deleteTasks);
//add event load page
document.addEventListener("DOMContentLoaded", showTask);
// document.addEventListener("DOMContentLoaded",countPendingTask);
//add event keyup for inputbox
inputBox.addEventListener("keyup", logKey);

//add event click for clearall button
function logKey(e) {
  let userEnterValue = inputBox.value;
  if (userEnterValue.trim() != 0) {
    btnAdd.classList.add("active");
  }
}
btnAdd.addEventListener("click", addTodo);
function addTodo(e) {
  let userEnterValue = inputBox.value;
  if (userEnterValue) {
    //create li tag
    const todoItems = document.createElement("li");
    todoItems.innerText = userEnterValue;
    //create button complete child of li
    const completedBtn = document.createElement("i");
    completedBtn.classList.add("fas");
    completedBtn.classList.add("fa-check");
    todoItems.appendChild(completedBtn);
    //create button trash child of li
    const trashBtn = document.createElement("i");
    trashBtn.classList.add("fas");
    trashBtn.classList.add("fa-trash");
    todoItems.appendChild(trashBtn);
    addTask(userEnterValue);

    //add child html
    listsTodo.appendChild(todoItems);
    inputBox.value = "";
    btnAdd.classList.remove("active");

    clearAllBtn.classList.add("active");
    pendingNumber.innerText=countPendingTask();
    clearallbtnActive();
  }
}

function addTask(tasks) {
  let listTasks;
  let getLocalStoreage = localStorage.getItem("NewTodo");
  if (getLocalStoreage === null) {
    listTasks = [];
  } else {
    listTasks = JSON.parse(getLocalStoreage);
  }
  listTasks.push({
    taskItem: tasks,
    completed: false,
  });
  localStorage.setItem("NewTodo", JSON.stringify(listTasks));

}
function clearallbtnActive(){
  let listTasks;
  let getLocalStoreage = localStorage.getItem("NewTodo");
  if(getLocalStoreage ===null){
    listTasks =[];
  }
  else{
    listTasks=JSON.parse(getLocalStoreage);
  }
  if(listTasks.length>0){
    clearAllBtn.classList.add('active');
  }
  else{
    clearAllBtn.classList.remove('active');
  }
}
function countPendingTask(){
  let pendingTaskNumber=0;
  let listTasks;
  let getLocalStoreage=localStorage.getItem("NewTodo");
  if(getLocalStoreage===null){
    listTasks=[];
  }
  else{
    listTasks=JSON.parse(getLocalStoreage);
  }
  listTasks.forEach((task)=>{
    if(task.completed===true){
      
    }
    else{
      pendingTaskNumber=pendingTaskNumber+1;
    }
  })
  return pendingTaskNumber;
}
function showTask() {
  let listTasks;
  let getLocalStoreage = localStorage.getItem("NewTodo");
  if (getLocalStoreage === null) {
    listTasks = [];
  } else {
    listTasks = JSON.parse(getLocalStoreage);
  }
  if (listTasks.length > 0) {
    clearAllBtn.classList.add('active');
    listTasks.forEach((task, index) => {
      const todoItems = document.createElement("li");
      todoItems.innerText = task.taskItem;
      //create button complete child of li
      const completedBtn = document.createElement("i");
      completedBtn.classList.add("fas");
      completedBtn.classList.add("fa-check");
      todoItems.appendChild(completedBtn);
      //create button trash child of li
      const trashBtn = document.createElement("i");
      trashBtn.classList.add("fas");
      trashBtn.classList.add("fa-trash");
      // trashBtn.setAttribute('onclick',`deltete(${index})`);
      todoItems.appendChild(trashBtn);

      listsTodo.appendChild(todoItems);

      if (task.completed === true) {
        todoItems.classList.add("completed");
      }
    });
    pendingNumber.innerText=countPendingTask();
  }
  clearallbtnActive();
}

//call event deleteTasks
function deleteTasks(e) {
  const item = e.target;
  if (item.classList[1] === "fa-trash") {
    const task = item.parentElement;
    task.remove();
    deleteTaskStoreage(task);
    pendingNumber.innerText=countPendingTask();
    clearallbtnActive();
  }
}
//delete task in local storeage
function deleteTaskStoreage(tasks) {
  let listTasks;
  let getLocalStoreage = localStorage.getItem("NewTodo");
  if (getLocalStoreage === null) {
    listTasks = [];
  } else {
    listTasks = JSON.parse(getLocalStoreage);
  }
  const taskIndex = tasks.innerText;
  const index = listTasks.findIndex((task) => task.taskItem === taskIndex);
  listTasks.splice(index, 1);
  localStorage.setItem("NewTodo", JSON.stringify(listTasks));
}
//call event click check complete
function completeTasks(e) {
  const item = e.target;
  if (item.classList[1] === "fa-check") {
    const task = item.parentElement;
    task.classList.toggle("completed");
    updateTaskStoreage(task);
    pendingNumber.innerText=countPendingTask();
  }
}
// update task completed in local storeage
function updateTaskStoreage(tasks) {
  let listTasks;
  let getLocalStoreage = localStorage.getItem("NewTodo");
  if (getLocalStoreage === null) {
    listTasks = [];
  } else {
    listTasks = JSON.parse(getLocalStoreage);
  }
  const taskIndex = tasks.innerText;
  const indexTask = listTasks.findIndex((task) => task.taskItem === taskIndex);
  if (listTasks.length > 0) {
    listTasks.forEach((task, index) => {
      if(index===indexTask){
        task.completed = true;
      }
      
    });
    localStorage.setItem("NewTodo", JSON.stringify(listTasks));
  }
}

//clear all task
function clearAllTask() {
  let listTasks;
  let getLocalStoreage = localStorage.getItem('NewTodo');
  if(getLocalStoreage===null){
    listTasks=[];
  }
  else{
    listTasks=JSON.parse(getLocalStoreage);
  }
  listTasks.forEach((task)=>{
    let elemtLi=document.querySelector('.todoList li')
    const todoItems = elemtLi.remove();
  })
  if(getLocalStoreage!=null){
    listTasks=[];
  }
  localStorage.setItem('NewTodo',JSON.stringify(listTasks));
  pendingNumber.innerText=countPendingTask();
  // listsTodo.appendChild(todoItems);

}
clearAllBtn.onclick = ()=>{
  clearAllTask();
}