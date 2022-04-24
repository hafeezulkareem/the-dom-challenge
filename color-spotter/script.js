class Board {
   constructor(board, score) {
      this.boardElement = document.querySelector(board);
      this.scoreElement = document.querySelector(score);
      this.score = 0;
      this.size = 4;
      this.oddColor = "";
   }

   getRandomColors = () => {
      const ratio = 0.618033988749895;
      const hue = (Math.random() + ratio) % 1;
      const saturation = Math.round(Math.random() * 100) % 85;
      const lightness = Math.round(Math.random() * 100) % 85;

      const color = `hsl(${Math.round(
         360 * hue
      )},${saturation}%,${lightness}%)`;
      const oddColor = `hsl(${Math.round(360 * hue)},${saturation}%,${
         lightness + 5
      }%)`;

      return { color, oddColor };
   };

   getRandomInt = (max) => Math.floor(Math.random() * max);

   reset = () => {
      this.score = 0;
      this.size = 4;
      this.start();
   };

   updateScore = () => {
      this.scoreElement.innerHTML = this.score;
   };

   getRandomCellPosition = () => {
      const row = this.getRandomInt(this.size);
      const col = this.getRandomInt(this.size);
      return { row, col };
   };

   validateAnswer = (event) => {
      const { color } = event.target.dataset;
      if (color && color === this.oddColor) {
         this.score += 1;
         this.size += 1;
      } else {
         this.reset();
      }
      this.updateScore();
      this.paintBoard();
   };

   paintBoard = () => {
      this.boardElement.innerHTML = "";

      const { color, oddColor } = this.getRandomColors();
      this.oddColor = oddColor;

      const cellSize =
         window
            .getComputedStyle(this.boardElement)
            .getPropertyValue("height")
            .slice(0, -2) / this.size;
      const winningCellPosition = this.getRandomCellPosition();

      for (let i = 0; i < this.size; i++) {
         const row = document.createElement("div");
         row.classList.add("row");
         for (let j = 0; j < this.size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;

            if (
               i === winningCellPosition.row &&
               j === winningCellPosition.col
            ) {
               cell.dataset.color = oddColor;
               cell.style.backgroundColor = oddColor;
            } else {
               cell.dataset.color = color;
               cell.style.backgroundColor = color;
            }

            row.appendChild(cell);
         }
         this.boardElement.appendChild(row);
      }
   };

   start = () => {
      this.paintBoard();
      this.boardElement.addEventListener("click", this.validateAnswer);
   };
}
