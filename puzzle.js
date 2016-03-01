/*
Author: Frank Gauthier
CS3990
Assignment 4
15 Tile JS FILE
*/

$(function() {
	// Declare boardArray
	boardArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
	tileMoves = 0;
	running = false;
	
		drawBoard();
	
		//add button click handlers
		$("#starttimer").click(start);
		$("#resetbutton").click(resetButton);
		$("#stopbutton").click(stop);
		$("#scrambleeasy").click(scrambleEasy);
		$("#scramblemed").click(scrambleMed);
		$("#scramblehard").click(scrambleHard);
		$("#timer").text("Time: 0 Seconds");

});



// I had a function that would randomize colors
// but I decided to pick colors for each number
// to get some nicer looking colors
function getColor(num){
		color = "";
		switch(num){
			case 1: color = "#009900";break;
			case 2:	color = "#0000FF";break;
			case 3: color = "#9900CC";break;
			case 4:	color = "#66CCFF";break;
			case 5: color = "#CC00FF";break;
			case 6: color = "#CC0000";break;
			case 7: color = "#FF9900";break;
			case 8: color = "#CC0099";break;
			case 9: color = "#660099";break;
			case 10: color = "#330099";break;
			case 11: color = "#006600";break;
			case 12: color = "#993366";break;
			case 13: color = "#FF0066";break;
			case 14: color = "#FF0000";break;
			case 15: color = "#FFEE00";break;

		}
		return color;
}




function moveTile(event){
	
	tile = event.target;
	tileNum = tile.innerHTML; // returns the tile number
	
	// check the boardArray for the tile number and get its index
	index = 0;
	while(boardArray[index] != tileNum) index++;
	
	
	row = parseInt(index/4);
	col = parseInt(index%4);
	
	

	if((boardArray[index +4] == 0) && ((row+1) < 4)){
		tile.style.top =(parseInt(tile.style.top.substring(0,3))) + 150 + "px";
		boardArray[index] = 0;
		boardArray[index+4] = tileNum;
		incrementMoves();
		console.log("moving up");
	}
	if((boardArray[index-4] == 0) && ((row-1) >= 0)){
		tile.style.top =(parseInt(tile.style.top.substring(0,3))) - 150 + "px";
		boardArray[index] = 0;
		boardArray[index-4] = tileNum;
		incrementMoves();
		console.log("moving down");
	}
	if((boardArray[index+1] == 0) && ((col+1) < 4)){
		tile.style.left =(parseInt(tile.style.left.substring(0,3))) + 150 + "px";
		boardArray[index] = 0;
		boardArray[index+1] = tileNum;
		incrementMoves();
		console.log("moving right");
	}	
	if((boardArray[index-1] == 0) && ((col-1) >= 0)){
		tile.style.left =(parseInt(tile.style.left.substring(0,3))) - 150 + "px";
		boardArray[index] = 0;
		boardArray[index-1] = tileNum;
		incrementMoves();
		console.log("moving left");
	}
	
	if(checkOrder() && running) winning();
	
	return 1;
}




function start(){
	starttime = $.now();
	running = true;
	updateTime();
}

function scrambleEasy(){
	scrambleArray(boardArray,25);
	drawBoard();
}


function scrambleMed(){
	scrambleArray(boardArray,45);
	drawBoard();
}


function scrambleHard(){
	scrambleArray(boardArray,75);
	drawBoard();
}


function drawBoard(){
		//clear the board
		$("#board").html("");
		
		// generate and append tiles to the board based on boardArray
		for(i=0;i<4;i++){
			for(j=0;j<4;j++){
				if((boardArray[(i*4)+j] != 0)){
					$("<div></div>")
						.addClass("tile")
						.append(boardArray[(i*4)+j])
						.css("background-color","red")
						.css("left", j * 150 +"px")
						.css("top", i * 150 +"px")
						.css("background-color", getColor(boardArray[(i*4) +j]))
						.click(moveTile)
						.appendTo("#board");
						
						console.log((i*4)+j);
				}
			}
		}
	
}



function incrementMoves(){
	if(running){
		tileMoves++;
		$("#moves").text( tileMoves + " Moves");
	}
}
                          

						  
function updateTime(){
		$("#timer").text( ("Time:  " + ($.now()-starttime)/1000) + " Seconds");
		if(running)setTimeout(updateTime, 100);
}

function winning(){
	stop();
	alert("  You have solved the puzzle!\n\n    " +$("#timer").text() +"\n\n\t\t   " + $("#moves").text() );
	resetButton();
	
}


function stop(){
		running = false;
}


function checkOrder(){

	for(i=1;i<boardArray.length+1;i++){
		if(boardArray[i-1] != i%16) return false;
	}
	
	return true;
};


function resetButton(){
		stop();
		running = false;
		tileMoves = 0;
		for(i = 1;i<16;i++) boardArray[i-1] = i;
		boardArray[boardArray.length-1] = 0;
		drawBoard();
		$("#timer").text("Time: 0 Seconds");
		$("#moves").text("Moves: " + tileMoves);
}




function scrambleArray(array, iterations){
		scrambledArray = array;
		
		//find the 0 element
		index = 0;
		while(scrambledArray[index] != 0) index++;
		
		//declare the 4 cardinal directions
		UP = -4; DOWN = 4; LEFT = -1; RIGHT = 1;
		moves = [UP,DOWN,LEFT,RIGHT];
		
		
		//run for the defined amount of iterations
		for(i = 0;i < iterations;i++){
			
			//loop until valid move is chosen
			do{
				randomMove = moves[parseInt(Math.random()*4)];
			}while(!validateMove(randomMove,index));
			
			
			
			
			switch(randomMove){
		
				case UP: 	
							tmp = parseInt(scrambledArray[index + UP]);
							scrambledArray[index + UP] = parseInt(scrambledArray[index]);
							scrambledArray[index] = tmp;
							index += UP;
							break;
				case DOWN:
							tmp = parseInt(scrambledArray[index + DOWN]);
							scrambledArray[index + DOWN] = parseInt(scrambledArray[index]);
							scrambledArray[index] = tmp;
							index += DOWN;
							break;
				case LEFT: 	
							tmp = parseInt(scrambledArray[index + LEFT]);
							scrambledArray[index + LEFT] = parseInt(scrambledArray[index]);
							scrambledArray[index] = tmp;
							index += LEFT;
							break;
				case RIGHT: 
							tmp = parseInt(scrambledArray[index + RIGHT]);
							scrambledArray[index + RIGHT] = parseInt(scrambledArray[index]);
							scrambledArray[index] = tmp;
							index += RIGHT;
							break;
			}
		}
		
		
		return scrambledArray;
		
		
}

function validateMove(move, index){
	
	//set validity to true and try to falsify it
	validity = true;
	
	//get 2D row/col based on 1D index
	rows = parseInt(index/4);
	cols = index%4;
	
	
	
	//determine if the move is valid on a 2D board
	switch(move){
		case UP:
				if((rows-1) < 0 ) validity = false;
				break;
		case DOWN:
				if((rows+1) > 3) validity = false;
				break;
		case LEFT:
				if((cols-1) < 0) validity = false;
				break;
		case RIGHT:
				if((cols+1) > 3) validity = false;
				break;
	}
	
	return validity;
}

