const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

////////////////////////////////////
////////////////////////////////////
// * Add classlist of active list from a function down below
listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

////////////////////////////////////
////////////////////////////////////

////////////////////////////////////
////////////////////////////////////

////////////////////////////////////
////////////////////////////////////

////////////////////////////////////
////////////////////////////////////
// * Delete list function
deleteListButton.addEventListener("click", (e) => {
  // Create a new list with all the list items that don't contain a selectedListId
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

////////////////////////////////////
////////////////////////////////////
// * Add new categories
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1.0 Get the value of the input
  const listName = newListInput.value;

  // 2.0 Check if the input is empty
  if (!listName) {
    alert("You have to type something");
    return;
  }

  // 3.0 Create a new list with the value of the input
  const list = createList(listName);
  newListInput.value = null;

  // 4.0 Push the new list to lists array
  lists.push(list);
  saveAndRender();
});

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

////////////////////////////////////
////////////////////////////////////
// * Clear all lists and prepare to load new lists
function render() {
  clearElement(listsContainer);
  lists.forEach((list) => {
    // 1.0 Create list element
    const listElement = document.createElement("li");

    // 2.0 Add data-list-id to list element with an that we got from createList function
    listElement.dataset.listId = list.id;

    // 3.0 Add class to list element
    listElement.classList.add("sidebar-list");

    // 4.0 Add inner text to list element
    listElement.innerText = list.name;

    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    // 5.0 Append list element to listsContainer
    listsContainer.appendChild(listElement);
    // console.log(listElement);
  });
}
render();

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}

////////////////////////////////////
////////////////////////////////////
