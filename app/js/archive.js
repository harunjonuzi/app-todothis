// const inputBox = document.getElementById("input-box");
// const listContainer = document.getElementById("list-container");

// function addTask() {
//   if (inputBox.value === "") {
//     alert("You must write something!");
//   } else {
//     let li = document.createElement("li");
//     li.innerHTML = inputBox.value;
//     listContainer.appendChild(li);
//     let span = document.createElement("span");
//     span.innerHTML = "\u00d7";
//     li.appendChild(span);
//   }
//   inputBox.value = "";
//   saveData();
// }

// listContainer.addEventListener("click", function (e) {
//   if (e.target.tagName === "LI") {
//     e.target.classList.toggle("checked");
//     saveData();
//   } else if (e.target.tagName == "SPAN") {
//     // We remove the parent element of span, which is LI itself
//     e.target.parentElement.remove();
//     saveData();
//   }
// });

// function saveData() {
//   localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask() {
//   listContainer.innerHTML = localStorage.getItem("data");
// }

// showTask();
// const listsContainer = document.querySelector("[data-lists]");

// let lists = [];

// function render() {
//   <li class="sidebar-list">Inbox</li>;
//   clearElement(listsContainer);
// }