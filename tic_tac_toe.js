var player1 = {
	mark: 'X',
	name: 'Игрок 1',
	style: 'player1_cell',
	score_el: 'player1_wins',
	wins: 0
};
var player2 = {
	mark: 'O',
	name: 'Игрок 2',
	style: 'player2_cell',
	score_el: 'player2_wins',
	wins: 0
};
var players = [player1, player2];
var current_player = 0;
var num_win = 5;
var num_of_cols;
var num_of_rows;
function TicTacToe(){
	var width = $('#width').val(),
	    height = $('#height').val();
	$("#game").empty();
	var num_of_cols = width;
	var num_of_rows = height;
	for(var i=0; i<num_of_cols*num_of_rows;++i)
	{
		var ind = i+1;
		var cell = $("<div></div>")
					.addClass("cell")
					.attr("ind", ind)
					.appendTo("#game");
		if ( i % num_of_cols === 0 ){
			cell.before('<div class="clear"></div>');
		}
	}
	$("#game .cell")
		.bind("click", move);

	initPlayer(current_player);
};
function disable(e){
	$("#game .cell")
		.unbind("click");
};
function disableGame(e){
	$('.wrapper_form').css('display', 'block');
    $('.wrapper_main').css('display', 'none');
   	$('#width').val("");
	$('#height').val("");
	$("#game .cell")
		.unbind("click");
	$("#player1_wins").html("0");
	$("#player2_wins").html("0");
	$('.wrapper_form input').removeClass('truelab');
};
function restart(){
	current_player = 0;
	TicTacToe();
	return false;
}
function move(e){
	var cell = $(this);
	cell
		.addClass(players[current_player].style)
		.addClass("marked")
		.text(players[current_player].mark)
		.unbind("click");
	if ( !checkWinner(cell) ) {
		current_player = (++current_player) % players.length;
		initPlayer(current_player);
	}
	return false;
};
function initPlayer(){
	$("#player_name").text(players[current_player].name);
	$("#player_mark").text(players[current_player].mark);
};
function checkWinner(cell){
	var current_class = players[current_player].style,
		marked_cells = $("#game ."+current_class),
		win = false,
		step = 0,
		index_cell_attr = cell.attr("ind"),
		index_cell = parseInt(index_cell_attr);
	
	if ( marked_cells.length >= 1 )
	{
		cell_marked = new Array();
		cell_marked.push($('.cell[ind="'+index_cell+'"]'));
		//horizontal
		for (step = index_cell+1; step <= index_cell+5; ++step){

			if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		var step = 0;
		for (step = index_cell-1; step >= index_cell-5; --step){
			if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}

		refreshCheck(index_cell);
		
		//Vertical
		var step = 0;
		for (step = index_cell + num_of_cols; step <= 3000; step += num_of_cols){
			console.log(index_cell);
			console.log(step);
		    if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		var step = 0;
		for (step = index_cell - num_of_cols; step >= 0; step -= num_of_cols){
		    if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		refreshCheck(index_cell);
		//diagonal
		//bottom left
		var step = 0,
			d = 1;
		for (step = index_cell + num_of_cols-1; step <= 3000; step += num_of_cols - d){
		    if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		//top right
		var step = 0,
			d = 1;
		for (step = index_cell - num_of_cols+1; step <= 3000; step -= num_of_cols - d){
		    if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		refreshCheck(index_cell);
		//top left
		var step = 0,
			d = 1;
		for (step = index_cell - num_of_cols-1; step >= 0; step -= num_of_cols + d){
		    if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		//bottom right
		var step = 0,
			d = 1;
		for (step = index_cell + num_of_cols+1; step <= 3000; step += num_of_cols + d){
		    if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}

		if ( cell_marked.length >= num_win ) win = true;
		
	}
	if ( win ){
		disable();
		cell_marked.forEach(function(item, i) {
		  item.addClass('win');
		});
		++players[current_player].wins;
		$("#winner #winner_name").show().text(players[current_player].name);
		$("#"+players[current_player].score_el).text(players[current_player].wins);
		$(".end_game").show();
	}
	return win;
};
function refreshCheck(index_cell){
	win = false;
	console.log("cell_marked " + cell_marked.length);
	if ( cell_marked.length >= num_win ) win = true;
	if ( !win ){
		cell_marked = new Array();
		cell_marked.push($('.cell[ind="'+index_cell+'"]'));
	}
}
$(document).ready(function(){
	$(document).on("click", "#restart_game", restart);
	$(document).on("click", "#disable_game", disableGame);
	$(document).on('click', '#initGame', function(e){
        e.preventDefault();
        var error = false;
        $(".wrapper_form input").each(function() {
        	var valueInput = $(this).val();        	
			if (valueInput.length != 0){
            	$(this).removeClass('errorlab').addClass('truelab');
			} else {
				console.log(valueInput);
				$(this).addClass('errorlab').removeClass('truelab');
            	error = true;
			}
		});
        if (error == false) {
        	num_of_cols_value = $('#width').val();
			num_of_rows_value = $('#height').val();
			num_of_cols = parseInt(num_of_cols_value);
			num_of_rows = parseInt(num_of_rows_value);

        	$('.wrapper_form').css('display', 'none');
        	$('.wrapper_main').css('display', 'block');
            TicTacToe();
        }
    });
    $('.wrapper_form input').bind().blur( function(){
      var valInput = $(this).val();
      if (valInput.length != 0){ 
        $(this).removeClass('errorlab').addClass('truelab');
      }else {
      	$(this).addClass('errorlab').removeClass('truelab');
      }
    });
});