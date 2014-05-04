
Just do it! 動民主杯黑白棋賽 local 程式
https://g0v.hackpad.com/Just-do-it--jVZASsoi0Ql

不能試下，隊友都在腦子裡推想怎麼行。自己寫吧！
各自在自己 local 跑，著手用 Text 在 Hackpad、facebook 或哪敲就行。
附 checksum，跟大家核對 checksum 就可以確保自己沒有敲錯。
[x] 加上：棋盤座標。
[ ] 取消：人工智慧。
[ ] 加上：當前盤面的 checksum 三位數字。
[ ] 加上：試下到一個段落，恢復戰局的功能。

-------------------------------------------------
GitHub: https://github.com/hcchengithub/js-reversi/commit/5a1f4fb741bb08a60902d0da552c5d53f83326b6

// 標示可著位置所用的格子外框是以 CSS 的 Class 達成的。漂亮。
    function reversi_show_moves(moves) {
        reversi_cell(move[1],move[0]).addClass("playable");
	#board .playable { 
	border: solid  #ff0000 2px;
	}
	
	#board .playable:hover { <============== 當 hover 時的 style
	cursor: pointer;
	border: solid  #0000FF 2px;
	}
	
// 傳回下一著手的集合 array [(x,y),(x,y),...]
    this.get_moves = function(player) {

// 傳回當前玩家下一可著位置的集合 array [(x,y),(x,y),...]
    this.get_current_player_moves = function(){
	// Run this in debugger to show available positions.
	reversi_show_moves(board.get_current_player_moves());

// 看誰有幾顆子
	board.count('white')
	15
	board.count('black')
	5

//	畫棋盤
	reversi_render_table()

	// 用 Chrome debugger 執行 reversi_render_table() 直接在 (0,0) 處放一棵白棋：
	board.board[0][0]='white'
	"white"
	board.board[0]
	["white", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
	reversi_render_table()
	undefined	

//	畫棋子，棋子是用 table 裡每一格的 Class 來畫上去的。
	// 用 Chrome debugger 執行 reversi_render_table() 直接在 (0,0) 處放一棵白棋：
    $("#board").html(html);
    $("#board").html('<tr><td id="1-0" class="empty"></td></tr>');
    $("#board").html('<tr><td id="1-0" class="empty playable"></td></tr>');
    $("#board").html('<tr><td id="1-0" class="empty"></td></tr>');

//  打座標，
	// 用 Chrome debugger 執行這一行，打上一個數字在表格上
    $("#board").html('<tr><td align=center><b>1</b></td></tr>');

// hcchen5600 2014/05/04 14:43:13 座標打好了， check in ....

	
	