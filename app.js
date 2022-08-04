document.addEventListener("DOMContentLoaded", (ev) => {
  const unassignedItemsElement = document.querySelector("#unassignedItemsElement");
  const addNewItem = document.querySelector("#addNewItem");
  const form = document.querySelector("#form");
  const lists = document.querySelectorAll(".parent");

  let dragEl = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addUnassignedElement(addNewItem.value);
    addNewItem.value = "";
  });

  function addUnassignedElement(element) {
    const id = `${element}-${Math.floor(Math.random() * 100) + 1}`;
    unassignedItemsElement.innerHTML += `
      <div class="card shadow-sm rounded my-1 draggable border-0" draggable="true" id="${id}">
          <div class="card-body d-flex justify-content-between">
            <span>
                ${element}
            </span>
            <button type="button" class="btn btn-sm btn-outline-danger rounded-circle remove-btn">
                <i class="bi bi-x"></i>
            </button>
          </div>
      </div>`;
    loopListItems();
  }

  function onDragStart(event) {
    dragEl = this;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("node", this.id);
    return false;
  }

  function onDragOver(event) {
    if (event.preventDefault()) {
      event.preventDefault();
    }

    event.dataTransfer.dropEffect = "move";
    return false;
  }

  function onDrop(event) {
    if (event.stopPropagation()) {
      event.stopPropagation();
    }

    if (dragEl !== this) {
      dragEl = this;
      if (this.parentNode !== unassignedItemsElement) {
        this.parentNode.insertBefore(document.getElementById(event.dataTransfer.getData("node")), this.nextSibling);
      }
    }

    dragEl = null;
    return false;
  }

  function removeItem(event) {
    this.parentNode.parentNode.remove()
  }

  function loopListItems() {
    lists.forEach((list) => {
      const listItems = list.querySelectorAll(".draggable");
      listItems.forEach((item) => {
        item.addEventListener("dragstart", onDragStart, false);
        item.addEventListener("dragover", onDragOver, false);
        item.addEventListener("drop", onDrop, false);
        item.querySelector(".remove-btn").addEventListener("click", removeItem);
      });
    });
  }

  loopListItems();
});
