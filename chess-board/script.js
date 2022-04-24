/*
 * Creates chess board
 * @param el DOM Element
 * @param size size of chess board
 */
function ChessBoard(el, size) {
   const chessBoard = document.querySelector(el);
   for (let i = 0; i < size; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      const startWithWhite = i % 2 === 0 ? true : false;
      for (let j = 0; j < size; j++) {
         const cell = document.createElement("div");
         cell.classList.add("cell");
         if (j % 2 === 0) {
            cell.style.backgroundColor = startWithWhite ? "white" : "black";
         } else {
            cell.style.backgroundColor = startWithWhite ? "black" : "white";
         }
         cell.setAttribute("id", `cell${i}${j}`);
         cell.dataset.row = i;
         cell.dataset.col = j;
         row.appendChild(cell);
      }
      chessBoard.appendChild(row);
   }

   const fillCell = (row, col) => {
      const cell = document.querySelector(`#cell${row}${col}`);
      cell.style.backgroundColor = "crimson";
   };

   const highlightDiagonals = (event) => {
      let { row, col } = event.target.dataset;
      if (row && col) {
         row = Number.parseInt(row);
         col = Number.parseInt(col);
         let i = row,
            j = col;
         while (i >= 0 && j >= 0) {
            fillCell(i, j);
            i -= 1;
            j -= 1;
         }
         i = row + 1;
         j = col + 1;
         while (i < size && j < size) {
            fillCell(i, j);
            i += 1;
            j += 1;
         }
         i = row + 1;
         j = col - 1;
         while (i < size && j >= 0) {
            fillCell(i, j);
            i += 1;
            j -= 1;
         }
         i = row - 1;
         j = col + 1;
         while (i >= 0 && j < size) {
            fillCell(i, j);
            i -= 1;
            j += 1;
         }
      }
   };

   chessBoard.addEventListener("click", highlightDiagonals);
}
