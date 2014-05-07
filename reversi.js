var board;

function reversi_update() {
    reversi_render_table();

  /*
    $("#freecells").text(board.get_free_cells());
    $("#player").text(board.get_current_player());
	// Just do it! 動民主杯黑白棋賽 local 程式 不需要這個評分。 hcchen5600 2014/05/04 20:43:05 
    // $("#whitescore").text(board.evaluate("white"));
    // $("#blackscore").text(board.evaluate("black"));
	// 評分改成顯示雙方目前子數。 hcchen5600 2014/05/04 20:57:25 
    $("#whitecount").text(board.count("white"));
    $("#blackcount").text(board.count("black"));
    $("#checksum").text(board.checksum());
  */
}

function reversi_initialize() {
    board = new Board();
    board.initialize();

    // for now, player is first
    reversi_update();
    reversi_show_moves(board.get_current_player_moves()); // 傳回先手下一可著位置的集合 array [(x,y),(x,y),...]
}

// 用 HTML 畫棋盤
function reversi_render_table_original() {
    var html = "";
    for (var i = 0; i < 8; i++) {
        html = html + "<tr>";
        for (var j = 0; j < 8; j++) {
            html = html + "<td id=\"" + i + "-" + j + "\" class=\"" + 
                board.get_cell(j, i) + "\"></td>";
        }
        html = html + "</tr>";
    }
    $("#board").html(html);
}
// 加上座標的版本
var a2h = ['A','B','C','D','E','F','G','H'];
function reversi_render_table() {
    var html = "<tr>";
	html = html + "<td align=center><b></b></td>";
	if(board.get_current_player()=='black'){
		html = html + "<td align=center class='black'></td>";
		html = html + "<td align=center><b>"+ board.count("black") +"</b></td>";
		html = html + "<td align=center></td>";
		html = html + "<td align=center class='white'></td>";
		html = html + "<td align=center><b>"+ board.count("white") +"</b></td>";
	}else{
		html = html + "<td align=center class='white'></td>";
		html = html + "<td align=center><b>"+ board.count("white") +"</b></td>";
		html = html + "<td align=center></td>";
		html = html + "<td align=center class='black'></td>";
		html = html + "<td align=center><b>"+ board.count("black") +"</b></td>";
	}
	html = html + "<td align=center></td>";
	html = html + "<td align=center><b>Sum-Move</b></td>";
	if(board.history.length){
		var recentMove = board.history[board.history.length-1];
		html = html + "<td align=center><b>"+ recentMove.checksum;
		html = html + "-" + recentMove.x + recentMove.y;
	}else{
		html = html + "<td align=center><b>"+ board.checksum();
	}
	html = html + "</b></td>";
	html = html + "</tr><tr>";
    html = html + "<td align=center></td>";
    html = html + "<td align=center><b>A</b></td>";
    html = html + "<td align=center><b>B</b></td>";
    html = html + "<td align=center><b>C</b></td>";
    html = html + "<td align=center><b>D</b></td>";
    html = html + "<td align=center><b>E</b></td>";
    html = html + "<td align=center><b>F</b></td>";
    html = html + "<td align=center><b>G</b></td>";
    html = html + "<td align=center><b>H</b></td>";
    html = html + "</tr>";
    for (var i = 0; i < 8; i++) {
        html = html + "<tr><td align=center><b>" + (i+1) + "</b></td>";
        for (var j = 0; j < 8; j++) {
            html = html + "<td align=center id=\"" + i + "-" + j + "\" class=\"" + 
                board.get_cell(j, i) + "\">"+ a2h[j] + (i+1) +"</td>";
        }
        html = html + "</tr>";
    }
    $("#board").html(html);
}

function reversi_handle_game_over() {
    var black_count = board.count("black");
    var white_count = board.count("white");
    if (black_count < white_count) {
        alert("White Win!!");
    } else if (black_count > white_count) {
        alert("Black Win!!");
    } else {
        alert("Call it a draw!");
    }
}

// 每個 cell 各有 HTML ID, 傳回某 cell 的 jQuery component object
function reversi_cell(x, y) {
    return $("#" + x + "-" + y);
}

// 改寫了，以取消人工智慧。
function reversi_handle_play(x, y) {
    reversi_clean_moves();
    board = board.make_move(x, y);
	// Last move history - hcchen5600 2014/05/07 11:40:24 
	board.history.push({checksum:board.checksum(),x:a2h[x],y:y+1}); // a2h[board.x]
    reversi_update();
    if (board.is_game_over()) {
        reversi_handle_game_over();
    }else{
		var moves = board.get_current_player_moves(); // 傳回下一可著位置的集合 array [(x,y),(x,y),...]
		if (moves.length==0) {
			alert(board.current_player + " has nothing to do!"); // board.current_player
			board.pass();
			moves = board.get_current_player_moves();
			if (moves.length==0) {
				reversi_handle_game_over();
			}
		}
		reversi_show_moves(moves);
	}
}

function reversi_clean_moves() {
    $(".playable").unbind("click");
    $(".playable").removeClass("playable");
}

function reversi_show_moves(moves) {
    for (var i = 0; i < moves.length; ++i) {
        var move = moves[i];

        reversi_cell(move[1],move[0]).addClass("playable");
        reversi_cell(move[1],move[0]).click( { x: move[0], y: move[1] },
                                             function(event) {
                                                 reversi_handle_play(event.data.x, event.data.y);
                                             });
    }
}
