// Changed remote link

const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const clearCompletedTasksButton = document.querySelector(
  "[data-clear-complete-tasks-button]"
);

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
// Returns: an array of objects with id, name and tasks properties or an empty array if there is no data in local storage with the key LOCAL_STORAGE_LIST_KEY which is 'task.lists' in this case and we store it in a variable called lists and we use JSON.parse() method to convert the data from string to array of objects again.
// For example: [{id: "1695574597216", name: "My first list", tasks: []}] or [].

let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
// Returns: a string value of the key in local storage which is a date format with random numbers converted to string using toString() method and we store it in a variable called selectedListId
// For example: 1695574597216

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
// * Functions

// Create Lists
function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

// Create Tasks
function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false, tests: [] };
}

// Save new list and selected list id to local storage
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)); //
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  const selectedListObject = lists.find((list) => list.id === selectedListId);
  clearElement(listsContainer);
  renderLists();

  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";

    if (selectedListObject) {
      listTitleElement.innerText = selectedListObject.name;
    } else {
      return;
    }

    clearElement(tasksContainer);
    renderTaskCount(selectedListObject);
    renderTasks(selectedListObject);
  }
}

function saveAndRender() {
  save();
  render();
}

// Render Lists
function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li"); //
    listElement.dataset.listId = list.id; //
    listElement.classList.add("aside__list"); //
    listElement.innerText = list.name; //
    if (list.id === selectedListId) {
      listElement.classList.add("active-list"); //
    }
    listsContainer.appendChild(listElement); //
  });
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);

    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    // <input type="checkbox" id="21387918475"></input>

    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function clearElement(element) {
  // Clears the element from all its children elements (li) and their children elements (input and label) and their children elements (checkbox and text).
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
// * Event listeners

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});

deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

clearCompletedTasksButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

render();

// Aside menu toggle
const btnHamburger = document.querySelector(".hamburger");
const asideMenu = document.querySelector(".aside");
const mainMenu = document.querySelector(".menu");

let toggleMe = true;

btnHamburger.addEventListener("click", function () {
  if (toggleMe) {
    // asideMenu.style.transform = "translateX(-300px)";
    asideMenu.style.display = "none";
  } else {
    // asideMenu.style.transform = "translateX(0)";
    asideMenu.style.display = "";
  }

  toggleMe = !toggleMe;
});
