
Just do it! 動民主杯黑白棋賽 local 程式
Project: https://g0v.hackpad.com/Just-do-it--jVZASsoi0Ql
GitHub:  https://github.com/hcchengithub/js-reversi/commit/5a1f4fb741bb08a60902d0da552c5d53f83326b6

不能試下，隊友都在腦子裡推想怎麼行。自己寫吧！
各自在自己 local 跑，著手用 Text 在 Hackpad、facebook 或哪敲就行。
附 checksum，跟大家核對 checksum 就可以確保自己沒有敲錯。
[x] 加上：棋盤座標 --- committed
[x] 取消：人工智慧。
[x] 取消：盤面評分。
[x] 加上：雙方子數。
[x] 加上：當前盤面的 checksum 三位數字。
[ ] 加上：列出著手 12:234-A1 的格式, 其中 12 是手順序號, 234 是 checksum, A1 是著手位置。
[ ] 加上：輸入區，把整串著手剪貼上去即可跟上進行中的棋局。
[ ] 加上：「前進」、「後退」（「悔棋」）、「試下」、「恢復到比賽中的局面」，等按鈕。

問題求助：
[x] 整個盤面的 Checksum 怎麼算分布比較均勻？
[ ] 如何讓黑子不要遮住標在該位置上的座標？(這好像不要緊)

------- 取消：盤面評分 -----------------------------------------
// 本來的評分沒啥意義，改成顯示雙方子數
// 算某方子數的方法
	board.count('white')
	7
	board.count('black')
	6
// Checksum 要弄成兩個 characters，短又不能太短。要盡量分散。
// Checksum 要怎麼算？ 每橫列 8 個子位，正好是一個 byte，每個 bit 有可能是黑或白。
// 白的 scan 一次，8 bytes 的值加起來；黑的也一樣。兩值相乘應該就可以了。


    1. scan 
	
	11111111 ff 255 * 8 = 111,1111,1000 7f8
	11111111ff
	11111111ff
	11111111ff
	11111111ff
	11111111ff
	11111111ff
	11111111ff
	
------- 取消：人工智慧 -----------------------------------------

// 改成雙方對戰
	主要改寫了 function reversi_handle_play(x, y) 以取消人工智慧。

------- 加上：棋盤座標 (committed) -----------------------------

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

// hcchen5600 2014/05/04 14:43:13 座標打好了， check in .... 10389101f656517ec4af63f90beac65e4689272f

###END###
