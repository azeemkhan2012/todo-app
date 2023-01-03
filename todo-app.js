const todoArea = ({ x, y }) => {
  return ` <div class="TaskItems" id='todoitem${y}'>
    <div class="TaskItems-text">
        ${x}
    </div>
    <div class="TaskItems-Button">
         <button class="edit-button" onclick = "handleModify(${y});"><i class="fas fa-edit"></i></button>
         <button class="delete-button" onclick = "handleRemove(${y});"> <i class="fas fa-trash-alt"></i></button>
    </div>
</div>`;  
};
const showList = () => {
  localStorage.setItem(key, JSON.stringify(listItems));
  let innerElements = "";
  let Elementtobeshown = document.getElementById("to-do");
  for (let index = 0; index < listItems.length; index++) {
    innerElements += todoArea({ x: listItems[index], y: index });
  }
  Elementtobeshown.innerHTML = innerElements;
};
const key = "todoList";
const localList = JSON.parse(localStorage.getItem(key)) || [];
let listItems = [...localList];
showList();
const handleInclude = (event) => {
  event.preventDefault();
  const EnteredValue = document.getElementById("enteredValue");
  if (EnteredValue.value.trim()) {
    listItems.push(EnteredValue.value);
    EnteredValue.value = "";
    showList();
  } else {
    alert("Please Enter Task");
  }
};

const deleteItem = (index) => {
  listItems.splice(index, 1);
  showList();
};

const handleRemove = (index) => {
  const confirmation = confirm("Are You Sure To delete this Item");
  confirmation && deleteItem(index);
};

const handleModify = (index) => {
  const listToModify = listItems[index];

  const modifyArea = document.getElementById(`todoitem${index}`);
  modifyArea.innerHTML = placeHtml({ listToModify, index });
};

const placeHtml = ({ listToModify, index }) => {
  return `<div class="addtodo-container">
      <form class = "formParent" onsubmit="handleReserve(event, ${index});">
      <input value ="${listToModify}" type="text" class="inputfeild" placeholder=" Task to be Done" required="required" id="PuttingValue">
      <button type="submit" class="save-button"> <i class="fa fa-save fa-xl"> </i> </button>
      </form>
      </div> `;
};

const handleReserve = (event, index) => {
  event.preventDefault();
  let newValue = document.getElementById("PuttingValue").value;
  newValue = newValue.trim();
  if (newValue === "") {
    alert("Please Enter Task");
  } else {
    listItems[index] = newValue;
  }
  showList();
};
