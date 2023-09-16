// const listItem = document.querySelectorAll("li");

// function removeChecked() {
//   listItem.forEach((li) => {
//     li.classList.remove("checked");
//   });
// }

// removeChecked();

// listItem.forEach((li) => {
//   li.addEventListener("click", function () {
//     li.classList.toggle("checked");
//   });
// });

const inputBox = document.querySelector("input-box");
const listContainer = document.querySelector("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
  }
}
