/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
   const getRandomColor = () => {
      let maxVal = 0xffffff;
      let randomNumber = Math.random() * maxVal;
      randomNumber = Math.floor(randomNumber);
      randomNumber = randomNumber.toString(16);
      let randColor = randomNumber.padStart(6, 0);
      return `#${randColor.toUpperCase()}`;
   };

   const fillColor = getRandomColor();
   let shouldFillOnMouseMove = false;
   const addCellColorWithEvent = (event) => {
      const element = event.target;
      const { row, col } = element.dataset;
      if (row && col) {
         fillCell(row, col, fillColor);
      }
   };

   const fillCell = (row, col, color) => {
      const cell = document.querySelector(`#cell${row}${col}`);
      cell.style.backgroundColor = color;
   };

   const fillRowWithRandomColors = (rowIndex) => {
      for (let i = 0; i < cols; i++) {
         fillCell(rowIndex, i, getRandomColor());
      }
   };

   const addCellColorOnMouseMove = (event) => {
      if (shouldFillOnMouseMove) {
         addCellColorWithEvent(event);
      }
   };

   const onMousedown = () => {
      shouldFillOnMouseMove = true;
   };

   const onMouseup = () => {
      shouldFillOnMouseMove = false;
   };

   const getRowElement = (rowIndex) => {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let i = 0; i < cols; i++) {
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.setAttribute("id", `cell${rowIndex}${i}`);
         cell.dataset.row = rowIndex;
         cell.dataset.col = i;
         cell.addEventListener("mouseover", addCellColorOnMouseMove);
         cell.addEventListener("mousedown", addCellColorWithEvent);
         row.appendChild(cell);
      }
      return row;
   };

   const grid = document.querySelector(el);
   const gridRows = document.createDocumentFragment();
   for (let i = 0; i < rows; i++) {
      gridRows.append(getRowElement(i));
   }
   gridRows.append(getRowElement(10));
   grid.appendChild(gridRows);
   fillRowWithRandomColors(10);

   grid.addEventListener("click", addCellColorWithEvent);
   grid.addEventListener("mousedown", onMousedown);
   grid.addEventListener("mouseup", onMouseup);
}
