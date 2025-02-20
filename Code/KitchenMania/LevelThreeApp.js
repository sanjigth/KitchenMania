document.addEventListener("DOMContentLoaded", () => {
  
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const moveDisplay = document.getElementById("moves");
    const width = 8;
    const squares = [];
    var numOfMoves = 0;
    let score = 0;
    let foodTypes = [];

    function startPage() {
      thirdLevel();
    }

    //create your board
    
    function thirdLevel() {
      foodTypes = [
        "url(images/ramen.png)",
        "url(images/taco.png)",
        "url(images/falafel.png)",
        "url(images/spaghetti.png)",
        "url(images/poultry.png)",
        "url(images/curry.png)",
      ];
      for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        square.setAttribute("draggable", true);
        square.setAttribute("id", i);
        let randomColor = Math.floor(Math.random() * foodTypes.length);
        square.style.backgroundImage = foodTypes[randomColor];
        grid.appendChild(square);
        squares.push(square);
      }
    }
    function winGame(){
        location.replace("GameWinner.html")
    }
    startPage();


    // Dragging the Candy
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach((square) =>
      square.addEventListener("dragstart", dragStart)
    );
    squares.forEach((square) => square.addEventListener("dragend", dragEnd));
    squares.forEach((square) => square.addEventListener("dragover", dragOver));
    squares.forEach((square) =>square.addEventListener("dragenter", dragEnter));
    squares.forEach((square) =>
      square.addEventListener("drageleave", dragLeave)
    );
    squares.forEach((square) => square.addEventListener("drop", dragDrop));

    function dragStart() {
      colorBeingDragged = this.style.backgroundImage;
      squareIdBeingDragged = parseInt(this.id);
      // this.style.backgroundImage = ''
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function dragEnter(e) {
      e.preventDefault();
    }

    function dragLeave() {
      this.style.backgroundImage = "";
    }

    function dragDrop() {
      colorBeingReplaced = this.style.backgroundImage;
      squareIdBeingReplaced = parseInt(this.id);
      this.style.backgroundImage = colorBeingDragged;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd() {
      //What is a valid move?
      let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width,
      ];
      let validMove = validMoves.includes(squareIdBeingReplaced);
      if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null;
        numOfMoves += 1;
        moveDisplay.innerHTML = numOfMoves;
      } else if (squareIdBeingReplaced && !validMove) {
        squares[
          squareIdBeingReplaced
        ].style.backgroundImage = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
      } else
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;

        if(numOfMoves > 40)
          location.reload()
    }

    //drop candies once some have been cleared
    function moveIntoSquareBelow() {
      for (i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundImage === "") {
          squares[i + width].style.backgroundImage =
            squares[i].style.backgroundImage;
          squares[i].style.backgroundImage = "";
          const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
          const isFirstRow = firstRow.includes(i);
          if (isFirstRow && squares[i].style.backgroundImage === "") {
            let randomColor = Math.floor(Math.random() * foodTypes.length);
            squares[i].style.backgroundImage = foodTypes[randomColor];
          }
        }
      }
    }

    ///Checking for Matches
    //for row of Four
    function checkRowForFour() {
      for (i = 0; i < 61; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
       
        if (notValid.includes(i)) continue;

        if (
          rowOfFour.every(
            (index) =>
              squares[index].style.backgroundImage === decidedColor && !isBlank
          )
        ) {
          score += 4
          scoreDisplay.innerHTML = score

          rowOfFour.forEach((index) => {
            squares[index].style.backgroundImage = "";
          });
          if(score >=100){
            winGame();
        }
        }
      }
    }
    checkRowForFour();

    //for column of Four
    function checkColumnForFour() {
      for (i = 0; i < 40; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";

        if (
          columnOfFour.every(
            (index) =>
              squares[index].style.backgroundImage === decidedColor && !isBlank
          )
        ) {
          score += 4
          scoreDisplay.innerHTML = score
          columnOfFour.forEach((index) => {
            squares[index].style.backgroundImage = "";
          });
          if(score >=100){
            winGame();
        }
        }
      }
    }
    checkColumnForFour();

    //for row of Three
    function checkRowForThree() {
      for (i = 0; i < 62; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
        if (notValid.includes(i)) continue;

        if (
          rowOfThree.every(
            (index) =>
              squares[index].style.backgroundImage === decidedColor && !isBlank
          )
        ) {
          score += 3
          scoreDisplay.innerHTML = score
          rowOfThree.forEach((index) => {
            squares[index].style.backgroundImage = "";
          });
          if(score >=100){
            winGame();
        }
        }
      }
    }
    checkRowForThree();

    //for column of Three
    function checkColumnForThree() {
      for (i = 0; i < 48; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";

        if (columnOfThree.every((index) =>squares[index].style.backgroundImage === decidedColor && !isBlank)) {
          score += 3
          scoreDisplay.innerHTML = score
          columnOfThree.forEach((index) => {
            squares[index].style.backgroundImage = "";
          });
          if(score >=100){
              winGame();
          }
        }
      }
    }
    checkColumnForThree();

    // Checks carried out indefintely - Add Butotn to clear interval for best practise
    window.setInterval(function () {
      checkRowForFour();
      checkColumnForFour();
      checkRowForThree();
      checkColumnForThree();
      moveIntoSquareBelow();
    }, 100);
});
