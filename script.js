
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;

showTasks();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("inputbox").value.trim();
  if (input === "") return;

  tasks.push({ text: input, done: false });
  document.getElementById("inputbox").value = "";

  saveTasks();
  showTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  showTasks();
}

function editTask(index) {
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    showTasks();
  }
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    showTasks();
  }
}

function showTasks() {
  let tasklist = document.getElementById("tasklist");
  tasklist.innerHTML = "";

  tasks.forEach((task, index) => {
    let div = document.createElement("div");
    div.className = "task";

    let span = document.createElement("span");
    span.innerText = task.text;
    span.className = task.done ? "completed" : "";
    span.onclick = () => toggleTask(index);

    let btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => editTask(index);

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.className = "remove";
    removeBtn.onclick = () => removeTask(index);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(removeBtn);

    div.appendChild(span);
    div.appendChild(btnGroup);

    tasklist.appendChild(div);
  });
}

function toggleTheme() {
  if (document.body.classList.contains("dark")) {
    document.body.className = "light";
    localStorage.setItem("theme", "light");
  } else {
    document.body.className = "dark";
    localStorage.setItem("theme", "dark");
  }
}
