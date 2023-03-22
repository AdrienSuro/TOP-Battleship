export { displayGrid };

function displayGrid(gridArray, location) {
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i].forEach(() => {
      let cell = document.createElement("div");
      location.appendChild(cell);
    });
  }
}
