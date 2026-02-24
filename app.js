const grid = document.getElementById("world-grid");
const placedCount = document.getElementById("placed-count");
const currentMaterial = document.getElementById("current-material");
const paletteButtons = document.querySelectorAll(".palette__button");
const clearButton = document.getElementById("clear-grid");
const gridToggle = document.getElementById("grid-toggle");

const state = {
  material: "grass",
  placed: 0,
};

const materials = {
  grass: "Grass",
  dirt: "Dirt",
  stone: "Stone",
  sand: "Sand",
  water: "Water",
  wood: "Wood",
};

const gridSize = 12 * 10;

const updateStats = () => {
  placedCount.textContent = state.placed;
  currentMaterial.textContent = materials[state.material];
};

const createCell = (index) => {
  const cell = document.createElement("button");
  cell.type = "button";
  cell.className = "cell";
  cell.setAttribute("role", "gridcell");
  cell.setAttribute("aria-label", `Block ${index + 1}`);

  cell.addEventListener("click", () => placeBlock(cell));
  cell.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    removeBlock(cell);
  });

  return cell;
};

const placeBlock = (cell) => {
  if (!cell.dataset.material) {
    state.placed += 1;
  }
  cell.dataset.material = state.material;
  renderBlock(cell);
  updateStats();
};

const removeBlock = (cell) => {
  if (cell.dataset.material) {
    delete cell.dataset.material;
    cell.innerHTML = "";
    state.placed = Math.max(0, state.placed - 1);
    updateStats();
  }
};

const renderBlock = (cell) => {
  cell.innerHTML = "";
  if (cell.dataset.material) {
    const block = document.createElement("span");
    block.className = "cell__block";
    cell.appendChild(block);
  }
};

const initGrid = () => {
  grid.innerHTML = "";
  for (let i = 0; i < gridSize; i += 1) {
    grid.appendChild(createCell(i));
  }
  grid.classList.toggle("has-grid", gridToggle.checked);
};

paletteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    paletteButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-checked", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-checked", "true");
    state.material = button.dataset.material;
    updateStats();
  });
});

clearButton.addEventListener("click", () => {
  state.placed = 0;
  initGrid();
  updateStats();
});

gridToggle.addEventListener("change", () => {
  grid.classList.toggle("has-grid", gridToggle.checked);
});

initGrid();
updateStats();
