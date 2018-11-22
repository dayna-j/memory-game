game = {
    gameBoard: document.getElementById('game-board'),
    gameTiles: document.getElementsByClassName('game-tile'),
    newGameButton: document.getElementById('newGameButton'),
  
    selectionOne: false,
    selectionTwo: false,
    
    board: {
              numTiles: 8,// change property name.  numPairs?
              numMatches: 0,
              boardArray: [],
      
              generateBoardArray: () => {
              // generate numTiles-many pairs of numbers
              for(i = 1; i<= game.board.numTiles; i++) {
                // push 2 of each index position into the array
                game.board.boardArray.push(i);
                game.board.boardArray.push(i);
              }
                console.log(game.board.boardArray)  
              },
      
              shuffleBoard: (board) => {
                       var currentIndex = board.length, temporaryValue, randomIndex;
                      // While there remain elements to shuffle...
                      while (0 !== currentIndex) 
                      {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                          // And swap it with the current element.
                        temporaryValue = board[currentIndex];
                        board[currentIndex] = board[randomIndex];
                        board[randomIndex] = temporaryValue;
                      }
                      return board;
                    },
              setupNewGame: () => {
              // set boardArray to empty array
              game.board.boardArray = [];
              // create a new, unshuffled array of tile values  
              game.board.generateBoardArray();
              // shuffle the boardArray
              game.board.shuffleBoard(game.board.boardArray);
              game.board.numMatches = 0;
              console.log(game.board.boardArray);
              }
          },
    
    selectTile: (tile) => {
      if (game.selectionOne && game.selectionTwo){
        // if a tile has been selected when selectionOne and selectionTwo
        // has already been locked...
        console.log("2 selections already made and they're not matching");
        // remove both selections from game board
        game.removeValueFromDisplay(game.selectionOne);
        game.removeValueFromDisplay(game.selectionTwo);
        // reset selections
        game.selectionOne = false;
        game.selectionTwo = false;
        // set selectionOne to the new tile
        game.selectionOne = tile;
        // display the new tile after the old ones have been removed
        game.displayValue(tile);
        game.toggleTileBackground(tile);
      }
      else if(game.selectionOne && (tile === game.selectionOne)){
        // if selectionOne has been made AND the second tile clicked was
        // the same as the first....
  
        // clear selections
        game.selectionOne = false;
        game.selectionTwo = false;
        console.log("Same tile selected twice.  All selections cleared.")
        game.removeValueFromDisplay(tile);
        game.toggleTileBackground(tile);
  
      }
      else if(game.selectionOne){
        // if selectionOne has already been made, store value in selectionTwo
        console.log('selectionTwo has been made')
        game.toggleTileBackground(tile)
        game.selectionTwo = tile;
        game.displayValue(tile);
  
        if(game.checkMatch(game.selectionOne,game.selectionTwo)){
          // if match, leave on the board
          game.selectionOne.classList.add("solved");
          game.selectionTwo.classList.add("solved");
          game.selectionOne = false;
          game.selectionTwo = false;
          game.board.numMatches++;      
          
          if(game.board.numMatches == game.board.numTiles) {
            game.newGameButton.style.display = 'block';
          }
        }
      }
      else {
        // NO SELECTIONS HAVE BEEN MADE
        console.log('selectionOne has been made');
        game.toggleTileBackground(tile)
        game.selectionOne = tile;
        game.displayValue(tile);
      }
    },
    
    toggleTileBackground: (tile) => {
      if(tile.style.background === "none") {
        tile.style.background = "";
        // tile.style.background = "black";
      }
      else {
        // tile.style.background = "none";
        tile.style.background = "black";
      }
    },
    
    displayValue: (tile) => {
      console.log('displaying value..');
      console.log(tile);
      var tileIDNum = parseInt(tile.id.slice(-2));
      tile.innerText = game.board.boardArray[tileIDNum];
    },
    
    removeValueFromDisplay: (tile) => {
      tile.innerText = '';
    },
    
    checkMatch: (tile1,tile2) => {
      console.log("Checking tile1 and tile2 for a match...");
      // console.log(tile1);
      // console.log(tile2);
      
      // tileIdNums are used as index into game.board.array
      var tile1IdNum = parseInt(tile1.id.slice(-2));
      var tile2IdNum = parseInt(tile2.id.slice(-2));
      var boardVal1 = game.board.boardArray[tile1IdNum];
      var boardVal2 = game.board.boardArray[tile2IdNum];
      // console.log(boardVal1);
      // console.log(boardVal2);
      
      if(boardVal1 === boardVal2){
      console.log("match found!");
        return true
      }
      else{
        console.log('no match found!');
        return false;
        // tile1.children[0].innerHTML = '';
        // tile2.children[0].innerHTML = '';
      }
     
      // reset both selections
      // game.selectionOne = false;
      // game.selectionTwo = false;
    }
  }
  
  document.addEventListener('DOMContentLoaded', function(){ 
  
      game.board.setupNewGame();
    
      //assign click event to tiles
      $(".game-tile").click(function(event){
        var tile = event.target;
        if(tile.classList.contains('solved')){
        // if a solved tile has been clicked, do nothing
           return null;
        }
        else {game.selectTile(tile);} ////////////////////////////////////
      });
    
      $("#newGameButton").click(function(event){
        // clear all game tiles..
        for(var i = 0; i < game.gameTiles.length; i++){
          game.removeValueFromDisplay(game.gameTiles[i]);
          game.gameTiles[i].classList.remove('solved');
          game.gameTiles[i].style.background = '';
        }
  //       setTimeout(function(i){
          
  //       },1000);
        game.board.setupNewGame();
        this.style.display = "none";
      });
  }, false);
  