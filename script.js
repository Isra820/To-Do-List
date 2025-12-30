class TaskManager {
    constructor(){
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
    addTask({title,priority,dueDate}) {
        const newTask = {
            id: Date.now(),
            title,
            priority,
            dueDate,
            completed: false
        };
        this.tasks = [...this.tasks, newTask];
        this.save();
    }
    removeTask(id) {
        this.tasks=this.tasks.filter(task=>task.id!==id);
        this.save();
    }
    sortByDate() {
        this.tasks.sort(
            (a,b)=>new Date(a.dueDate)-new Date(b.dueDate)
        );
    }
    sortByPriority() {
        const order = {high:1, medium:2, low:3};
        this.tasks.sort(
            (a,b)=>order[a.priority]-order[b.priority]
        );
    }
    save() {
        localStorage.setItem("tasks",JSON.stringify(this.tasks));
    }
}

const manager=new TaskManager();
const list=document.querySelector("#taskList");

const renderTasks=()=>{
    list.innerHTML="";
    manager.tasks.forEach(({id,title,priority,dueDate,})=>{
        const li=document.createElement("li");
        li.innerHTML = `
           <div class="task-info">
              <strong>${title}</strong>
              <span>(${priority}) · ${dueDate}</span>
            </div>
            <button data-id="${id}">✕</button>
        `;

        list.append(li);
    });
};

document.querySelector("#addTask").addEventListener("click", ()=>{
    const title=document.getElementById("title");
    
    const priority=document.querySelector("#priority");
    const dueDate=document.querySelector("#dueDate");
    if (!title || !dueDate) return alert("Missing fields");

    manager.addTask({title:title.value,priority:priority.value,dueDate:dueDate.value});
    renderTasks();
    title.value = "";
    dueDate.value = "";
    priority.value = "medium";
});

list.addEventListener("click", (e)=>{
    if(e.target.tagName=="BUTTON"){
        const id= Number(e.target.dataset.id);
        manager.removeTask(id);
        renderTasks();
    }
});

document.querySelector("#sortDate").addEventListener("click", ()=>{
    manager.sortByDate();
    renderTasks();
});

document.querySelector("#sortPriority").addEventListener("click", ()=>{
    manager.sortByPriority();
    renderTasks();
});

renderTasks();