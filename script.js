document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website loaded!");
});

let editorMode = false;

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "e") {
    editorMode = !editorMode;
    document.body.classList.toggle("editor-mode", editorMode);
    alert("Editor mode: " + (editorMode ? "ON" : "OFF"));
  }
});

function makeDraggable(el) {
  el.draggable = true;
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("id", el.id);
  });
}

document.addEventListener("dragover", (e) => {
  if (editorMode) e.preventDefault();
});

document.addEventListener("drop", (e) => {
  if (editorMode) {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const draggedEl = document.getElementById(id);
    e.target.closest("section, div")?.appendChild(draggedEl);
    saveLayout();
  }
});

function saveLayout() {
  localStorage.setItem("layout", document.body.innerHTML);
}

function loadLayout() {
  const saved = localStorage.getItem("layout");
  if (saved) {
    document.body.innerHTML = saved;
  }
}

window.onload = () => {
  loadLayout();
  document.querySelectorAll("section, div").forEach((el, i) => {
    if (!el.id) el.id = "draggable-" + i;
    makeDraggable(el);
  });
};
