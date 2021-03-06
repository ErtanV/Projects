"use strict";
document.addEventListener("DOMContentLoaded", () => {
  class TaskView {
    constructor() {
      this.input = document.createElement("input");
      this.btn = document.createElement("button");
      this.btnShow = document.createElement("button");
      this.mainblock = document.querySelector("#app");
    }
    initRender() {
      this.mainblock.append(this.input, this.btn, this.btnShow);
      this.input.style.width = "20%";
      this.btn.id = "addBtn";
      this.btn.innerText = "Add";
      this.btnShow.id = "addBtn";
      this.btnShow.innerText = "Show";
    }
    renderTask() {
      // const item = document.createElement("li");
      // item.innerHTML = task;
      // this.taskList.appendChild(item);
      this.input.value = "";
    }
  }

  class TaskController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      this.addData = this.addData.bind(this);
    }
    addData() {
      let value = this.view.input.value;
      if (value === "" || value === " ") return;
      this.model.addTask(value);
      this.view.renderTask(value);
    }
    addHandle() {
      this.view.btn.addEventListener("click", this.addData);
      this.view.btnShow.addEventListener("click", initShow);
    }
  }
  // --------------------second page--------------------
  class TaskModel {
    constructor() {
      this.tasks = [];
      this.getLocalStorage();
    }
    addTask(data) {
      this.tasks.push(data);
      this.setLocalStorage();
    }
    setLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    getLocalStorage() {
      const data = JSON.parse(localStorage.getItem("tasks"));
      if (!data) return;
      this.tasks = data;
    }
  }

  class ShowView {
    constructor() {
      this.mainblock = document.querySelector("#app");
      this.taskList = document.createElement("ul");
      this.btnEdit = document.createElement("button");
      this.btnHome = document.createElement("button");
    }
    showTask(task) {
      task.forEach((element) => {
        const item = document.createElement("li");
        item.innerHTML = element;

        item.appendChild(this.btnEdit);

        this.editButton();
        this.taskList.appendChild(item);
      });
    }
    showRender() {
      this.mainblock.append(this.taskList, this.btnHome);

      this.btnHome.innerText = "Home";
      this.btnHome.id = "addBtn";
    }
    editButton() {
      console.log(this.btnEdit);
      this.btnEdit.classList.add("editButton");
      let imgEdit = document.createElement("img");
      imgEdit.src = "images/pen.svg";
      imgEdit.alt = "icon_alter";
      this.btnEdit.appendChild(imgEdit);
      console.log("in2");
    }
  }
  class ShowController {
    constructor(model, view) {
      this.model = model;
      this.view = view;
    }
    showData() {
      let value = this.model.tasks;
      this.view.showTask(value);
    }
    addShowHandle() {
      this.view.btnHome.addEventListener("click", initV2);
    }
  }
  // ---------------function declaration---------------
  let view, model, controler;

  function init() {
    view = new TaskView();
    model = new TaskModel();
    controler = new TaskController(model, view);
    view.initRender();
    controler.addHandle();
  }
  init();

  function initShow() {
    view.input.remove();
    view.btn.remove();
    view.btnShow.remove();
    view = new ShowView();
    controler = new ShowController(model, view);
    view.showRender();
    controler.showData();
    controler.addShowHandle();
    model.getLocalStorage();
  }

  function initV2() {
    view.taskList.remove();
    view.btnHome.remove();
    init();
  }
});
