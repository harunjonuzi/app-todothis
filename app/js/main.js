import { clearElement } from "./clear.js";
import { createList } from "./createList.js";
import { createTask } from "./createTask.js";

const asideListsContainer = document.querySelector("[data-aside-lists]");
const asideNewListForm = document.querySelector("[data-aside-new-list-form]");
const asideNewListFormImg = asideNewListForm.querySelector("img");
const asideNewListFormInput = document.querySelector(
  "[data-aside-new-list-input]"
);
const asideDeleteListButton = document.querySelector(
  "[data-aside-delete-list-button]"
);
const mainTasksDisplayContainer = document.querySelector(
  "[data-main-tasks-display-container]"
);
const mainNewTaskForm = document.querySelector("[data-new-task-form]");
const mainNewTaskInput = document.querySelector("[data-new-task-input]");
const mainClearCompletedTasksButton = document.querySelector(
  "[data-main-clear-complete-tasks-button]"
);
const mainListTitleElement = document.querySelector("[data-main-list-title]");
const mainListCountElement = document.querySelector("[data-main-list-count]");
////////////////////////////////////////////////
const taskHTMLTemplate = document.getElementById("task-template");
const mainTasksWrapper = document.querySelector("[data-tasks-wrapper]");
////////////////////////////////////////////////
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_KEY = "task.selectedListId";
////////////////////////////////////////////////
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
// This is an empty array in the beginning, then we populate it with lists that are objects turned into strings and put into Local Storage.
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_KEY);
// We get the value of the "task.selectedListId"

const svgElementOne = document.querySelector("#svgElement-01");
const svgElementTwo = document.querySelector("#svgElement-02");
const svgElementThree = document.querySelector("#svgElement-03");

const inbox = {
  id: "10",
  name: "Inbox",
  tasks: [],
};
const today = {
  id: "20",
  name: "Today",
  tasks: [],
};
const upcoming = {
  id: "30",
  name: "Upcoming",
  tasks: [],
};

////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!

// 🟢 We create new lists and populate the aside menu
// Click: ENTER
asideNewListForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 01 Phase
  const listName = asideNewListFormInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  // Create an object named list which will populate it with an id, name and tasks [] array.

  // 02 Phase
  asideNewListFormInput.value = null;
  lists.push(list);
  saveAndRender();
});

// Click: IMG BUTTON
asideNewListFormImg.addEventListener("click", function () {
  // 01 Phase
  const listName = asideNewListFormInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  // Create an object named list which will populate it with an id, name and tasks [] array.

  // 02 Phase
  asideNewListFormInput.value = null;
  lists.push(list);
  saveAndRender();
});

////////////////////////////////////////////////////////!

// 🟢 Whichever list we click, we set the value of the data-list-id to the selectedListId
asideListsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    console.log(selectedListId);
    saveAndRender();
  }
});

////////////////////////////////////////////////////////!

// 🟢 Delete lists button
asideDeleteListButton.addEventListener("click", () => {
  if (
    selectedListId === "10" ||
    selectedListId === "20" ||
    selectedListId === "30"
  ) {
    console.log("Cannot delete permanent lists!");
    return;
  } else {
    lists = lists.filter((list) => list.id !== selectedListId);
    selectedListId = "10";
    saveAndRender();
  }
});

////////////////////////////////////////////////////////!

// 🟢 Toggle side menu
const btnHamburger = document.querySelector(".hamburger");
const asideMenu = document.querySelector(".aside");
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

////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!

// 🔖 TASKS 🔖 - We create tasks and put them inside the corresponding selectedList tasks array
mainNewTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e.target);

  const taskName = mainNewTaskInput.value;
  // 1.0 - taskName = 'Buy tomatoes'

  if (taskName == null || taskName === "") return;
  // 2.0 - If taskName is empy, do nothing

  const task = createTask(taskName);
  // 3.0 - task = { id: Date.now().toString(), name: 'Buy tomatoes', complete: false }

  mainNewTaskInput.value = null;
  // 4.0 - We reset the input value

  const selectedList = lists.find((item) => item.id === selectedListId);
  // 5.0 selectedList = {id: '10', name: 'Inbox', tasks: Array(2)}

  selectedList.tasks.push(task);
  // 6.0 We go inside the selectedList object's tasks array and push the newly created task

  // renderTasks(selectedList); // SPUNON TASK RENDERI
  // saveAndRender();
});

////////////////////////////////////////////////
// 🔖 TASKS 🔖 Check and uncheck state of the tasks inside the main container
// Without this the clear completed tasks button will not work
// mainTasksWrapper.addEventListener("click", (e) => {
//   // console.log(e.target);

//   if (e.target.tagName.toLowerCase() === "input") {
//     const selectedList = lists.find((item) => item.id === selectedListId);
//     // selectedList = {id: "10", name: "Inbox", tasks: []}

//     const selectedTask = selectedList.tasks.find(
//       (item) => item.id === e.target.id
//       // selectedTask = {id: "1696599101686", name: "Buy tomatoes", complete: false}
//     );

//     selectedTask.complete = e.target.checked;
//     // We toggle the true and false state of the complete key inside that task (object)

//     save();
//     renderTaskCount(selectedList);
//   }
// });

////////////////////////////////////////////////
// 🔖 TASKS 🔖 - Clear completed tasks
// mainClearCompletedTasksButton.addEventListener("click", (e) => {
//   const selectedList = lists.find((list) => list.id === selectedListId);
//   selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
//   saveAndRender();
// });

////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!

// 🟢
function pushPermanentLists() {
  lists.push(inbox);
  lists.push(today);
  lists.push(upcoming);
}

////////////////////////////////////////////////////////!
// 🟢
function renderLists() {
  lists.forEach((list) => {
    const asideListElement = document.createElement("li");
    asideListElement.dataset.listId = list.id;
    asideListElement.classList.add("aside__list");
    asideListElement.innerText = list.name;

    if (list.id === selectedListId) {
      asideListElement.classList.add("active-list");
    }
    asideListsContainer.appendChild(asideListElement);
  });
}

////////////////////////////////////////////////////////!
//
function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskHTMLTemplate.content, true);

    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    // <input type="checkbox" id="21387918475"></input>

    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);

    mainTasksWrapper.appendChild(taskElement);
  });
}

// function renderTaskCount(selectedList) {
//   const incompleteTaskCount = selectedList.tasks.filter(
//     (item) => !item.complete
//   ).length;
//   const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
//   mainListCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
// }

////////////////////////////////////////////////////////!
// 🟢
function renderGraphics() {
  console.log(lists);

  const selectedList = lists.find((list) => list.id === selectedListId);
  console.log(selectedList);

  if (selectedList.id === "10" && selectedList.tasks.length === 0) {
    svgElementOne.style.display = "block";
  } else {
    svgElementOne.style.display = "none";
  }

  if (selectedList.id === "20" && selectedList.tasks.length === 0) {
    svgElementTwo.style.display = "block";
  } else {
    svgElementTwo.style.display = "none";
  }

  if (selectedList.id === "30" && selectedList.tasks.length === 0) {
    svgElementThree.style.display = "block";
  } else {
    svgElementThree.style.display = "none";
  }
}

////////////////////////////////////////////////////////!
// 🟢
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  // setItem('tasks.lists', [{id: '10', name: 'Inbox', tasks: [] }])

  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_KEY, selectedListId);
  // setItem('tasks.selectedListId', 2138917848932)
}

// 🟢
function render() {
  const selectedLeest = lists.find((item) => item.id === selectedListId);

  // * First Initial Render of the Application
  if (lists.length === 0) {
    // console.log("First Render");

    // 01 Phase
    selectedListId = "10";
    clearElement(asideListsContainer);
    pushPermanentLists();
    save();

    // 02 Phase
    const selectedSheesh = lists.find((item) => (item.id = selectedListId));
    // Return: {id: '10', name: 'Inbox', tasks: Array(0)}
    mainListTitleElement.innerText = selectedSheesh.name;

    renderLists();
    renderGraphics();
    // renderTasks(selectedSheesh);
    // renderTaskCount(selectedList);
  } else {
    // * Every other Render of the Application
    // console.log("Second Render");

    // 01 Phase
    clearElement(asideListsContainer);

    // 02 Phase
    mainListTitleElement.innerText = selectedLeest.name;
    renderLists();
    // renderTasks(selectedLeest);
    renderGraphics();
    // renderTaskCount(selectedList);
  }
}

function saveAndRender() {
  save();
  render();
}

////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!
////////////////////////////////////////////////////////!

// 🚀 RUNNING THE APPLICATION 🚀 //
render();
