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
var num_of_cols = 10;
var num_of_rows = 10;
function TicTacToe(){
	$("#game").empty();
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
		.unbind("click")
		.unbind("mouseover")
		.unbind("mouseout");
};
function restart(e){
	e.preventDefault();
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
		stepPrev = 0,
		index_cell_attr = cell.attr("ind")
		index_cell = parseInt(index_cell_attr);
	
	if ( marked_cells.length >= 1 )
	{
		cell_marked = new Array();
		cell_marked.push($('.cell[ind="'+index_cell+'"]'));
		for (step = index_cell+1; step <= index_cell+5; ++step){
			if ( $('.cell[ind="'+step+'"]').hasClass(current_class) ){
				cell_marked.push($('.cell[ind="'+step+'"]'));
			} else {
				break;
			}
		}
		if ( cell_marked.length == num_win ) win = true;
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

$(document).ready(function(){
	$("#restart_game").bind("click", restart);
	TicTacToe();
});