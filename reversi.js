var board;

function reversi_update() {
    reversi_render_table();

    $("#freecells").text(board.get_free_cells());
    $("#player").text(board.get_current_player());
    $("#whitescore").text(board.evaluate("white"));
    $("#blackscore").text(board.evaluate("black"));
}

function reversi_initialize() {
    board = new Board();
    board.initialize();

    // for now, player is first
    reversi_update();
    reversi_show_moves(board.get_current_player_moves());
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
var horizontalTitle = ['A','B','C','D','E','F','G','H'];
function reversi_render_table() {
    var html = "<tr>";
    html = html + "<td align=center><b></b></td>";
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
            html = html + "<td id=\"" + i + "-" + j + "\" class=\"" + 
                board.get_cell(j, i) + "\"></td>";
        }
        html = html + "</tr>";
    }
    $("#board").html(html);
}

function reversi_handle_game_over() {
    var black_count = board.count("black");
    var white_count = board.count("white");
    if (black_count > white_count) {
        alert("I Won!!");
    } else if (black_count < white_count) {
        alert("You Won!!");
    } else {
        alert("Call it a draw!");
    }
}

// 每個 cell 各有 HTML ID, 傳回某 cell 的 jQuery component object
function reversi_cell(x, y) {
    return $("#" + x + "-" + y);
}

function reversi_handle_play(x, y) {
    reversi_clean_moves();
    board = board.make_move(x, y);
    
    reversi_update();

    if (board.is_game_over()) {
        reversi_handle_game_over();
    }
    else {

        do {
            var user_pass = 0;

            var moves = board.get_current_player_moves();

            var move = get_best_move(board, board.get_current_player(), 4);
            if (move != null) {
                board = board.make_move(move[0], move[1]);
                reversi_update();

                if (board.is_game_over()) {
                    reversi_handle_game_over();
                }           

                else if (board.get_moves("white").length == 0) {
                    alert("You need to pass!");
                    board.pass();
                    user_pass = 1;
                } else {
                    if (board.is_game_over()) {
                        reversi_handle_game_over();
                    }
                    else {
                        reversi_update();
                        reversi_show_moves(board.get_current_player_moves());
                    }
                }
            } else {
                alert("I shall pass!");
                board.pass();
                moves = board.get_current_player_moves();
                if (moves.length) {
                    reversi_show_moves(moves);
                } else {
                    reversi_handle_game_over();
                }
            }
        } while(user_pass);
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
