document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    showAll();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        taskInput.value = "";
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function showAll() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let remainingTasks = 0;
    tasks.forEach(function(task, index) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function() {
            toggleCompleted(index, checkbox.checked);
        });
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(document.createTextNode(task.text));
        taskList.appendChild(taskDiv);
        if (!task.completed) {
            remainingTasks++;
        }
    });
    updateCounter(remainingTasks);
}

function toggleCompleted(index, isChecked) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = isChecked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function clearAll() {
    localStorage.removeItem("tasks");
    loadTasks();
}

function updateCounter(count) {
    const counter = document.getElementById("remainingTasks");
    counter.textContent = count === 1 ? "1 task left" : count + " tasks left";
}

function clearCompleted() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const remainingTasks = tasks.filter(task => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
    loadTasks();
}
function showActive() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let remainingTasks = 0;
    tasks.forEach(function(task, index) {
        if (!task.completed) {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function() {
                toggleCompleted(index, checkbox.checked);
            });
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(document.createTextNode(task.text));
            taskList.appendChild(taskDiv);
            remainingTasks++;
        }
    });
    updateCounter(remainingTasks);
}

function showCompleted() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let remainingTasks = 0;
    tasks.forEach(function(task, index) {
        if (task.completed) {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function() {
                toggleCompleted(index, checkbox.checked);
            });
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(document.createTextNode(task.text));
            taskList.appendChild(taskDiv);
        } else {
            remainingTasks++;
        }
    });
    updateCounter(remainingTasks);
}
