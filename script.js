const taskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");

//add task
addBtn.addEventListener("click",function(){
    const taskText=taskInput.value.trim();
    if(taskText=="") return;
    const li=document.createElement("li");
    li.innerHTML=
      `${taskText} <button class="deleteBtn">Delete</button>`;
    //mark as complete when clicked
    li.addEventListener("click",function(e){
        //avoid marking as complete when clicking delete button
        if(e.target.classList.contains("deleteBtn")) return;
        li.classList.toggle("completed");
    });
    //delete button
    li.querySelector(".deleteBtn").addEventListener("click",function(){
        li.remove();
    });
    taskList.appendChild(li);
    taskInput.value="";
});