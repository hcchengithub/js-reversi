/* from http://www.phpied.com/3-ways-to-define-a-javascript-class/ */


function Board () {
    this.free_cells = 60;
    this.current_player = "black"; // 原版 white 今改成 black, 持黑先。
    this.board = new Array();
	this.history = []; // checksum/Position/Comment
	
    // small cache
    this.white_moves = null;
    this.black_moves = null;

    // Initialize table
    this.initialize = function() {
        for (var i = 0; i < 8; i++) {
            line = new Array();
            for (var j = 0; j < 8; j++) {
                line[j] = "empty";
            }
            this.board.push(line);
        }

        this.board[3][3] = "white";
        this.board[4][4] = "white";
        this.board[3][4] = "black";
        this.board[4][3] = "black";
    }

	// 傳回當前玩家下一可著位置的集合 array [(x,y),(x,y),...]
    this.get_current_player_moves = function() {
        if (this.current_player == "white" && !this.white_moves)
            white_moves = this.get_moves(this.current_player);
        if (this.current_player == "black" && !this.black_moves)
            black_moves = this.get_moves(this.current_player);

        return (this.current_player == "white") ? white_moves : black_moves;
        
    }

    // Retorna array de possiveis movimentos
	// 傳回下一著手的集合 array [(x,y),(x,y),...]
    this.get_moves = function(player) {
        var moves = new Array();
		for (var x = 0; x < 8; x++) {
			for (var y = 0; y < 8; y++) {
				if (this.board[x][y] != "empty") continue;
				var to_break = 0;
				for (var i = -1; i <= 1; i++) {
					for (var j = -1; j <= 1 ; j++) {
						if (i == 0 && j == 0) continue;
						var limit = board.get_limit(player, x, y, i, j);
						if (limit && this.board[x+i][y+j] != player) {
							moves.push(new Array(x,y));
							to_break = 1;
						}
						if (to_break) break;
					}
					if (to_break) break;
				}
			}
		}
		return moves;
    }

    this._clone_board = function() {
        var clone = new Array();
        for (var i = 0; i < 8; i++) {
            var line = new Array();
            for (var j = 0; j < 8; j++) {
                line[j] = this.board[i][j];
            }
            clone.push(line);
        }
        return clone;
    }

    this.update_move = function(player, frX, frY, toX, toY, iX, iY) {
		var x = frX;
		var y = frY;
		var Lx = toX;
		var Ly = toY;
	
		while (x != Lx || y != Ly) {
			this.board[x][y] = player;
			x += iX;
			y += iY;
		}
    }

    this.make_move = function(moveX, moveY) {
		var newBoard = new Board();
		newBoard.set_board(this._clone_board());
		newBoard.set_free_cells(this.get_free_cells() - 1);
		newBoard.set_cell(moveX, moveY, this.get_current_player());

        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
		if (i == 0 && j == 0) continue;

		var limit = newBoard.get_limit(this.current_player, moveX, moveY, i, j);
		if (limit != null)
		    newBoard.update_move (this.current_player,
                                          moveX, moveY, limit[0], limit[1], i, j);
            }
        }

        if (this.get_current_player() == "white") {
	    newBoard.set_current_player("black");
        } else {
	    newBoard.set_current_player("white");
        }
		return newBoard;
    }

    this.pass = function() {
        if (this.get_current_player() == "white") {
	    this.set_current_player("black");
        } else {
	    this.set_current_player("white");
        }
    }

    // retorna limite de x,y na direcao ix,iy
    this.get_limit = function(player, pX, pY, iX, iY) {
		var x = pX + iX;
		var y = pY + iY;
		while (x >= 0 && y >= 0 && x < 8 && y < 8 && this.board[x][y] != "empty") {
			if (this.board[x][y] == player) return new Array(x, y);
			x += iX;
			y += iY;
		}
		return null;
    }

    // Accessors and setters
    this.set_board = function(b) {
        this.board = b;
    }

    this.get_free_cells = function() {
        return this.free_cells;
    }

    this.set_free_cells = function(fc) {
        this.free_cells = fc;
    }

    this.get_current_player = function() {
        return this.current_player;
    }

    this.set_current_player = function(player) {
        this.current_player = player;
    }

    this.get_cell = function(x, y) {
        return this.board[x][y];
    }

    this.set_cell = function(x, y, player) {
        this.board[x][y] = player;
    }

    this.is_game_over = function() {
        if (this.free_cells == 0) return true;
		return false;
    }

    this.count = function(player) {
        var c = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.get_cell(i,j) == player) c++;
            }
        }
        return c;
    }

	// 計算某方的 checksum, 每橫列8棋位，正好是一個 byte， j=0 就是 bit0。
	// 整個盤面共8橫列，共8bytes，逐列加權 7 的列次方，以免同 pattern 在不同列的值重複。
	// 通通加起來得該方的 checksum。
    this.xSum = function(player) {
        var c = 0;
        for (var i = 0; i < 8; i++) {
			var row =0;	
            for (var j = 0; j < 8; j++) {
                if (this.get_cell(i,j) == player) row += Math.pow(2,j);
            }
			c += row * Math.pow(7,i);
        }
        return c;
    }
	// Two sides' xSum combined by XOR (^) and then use mode (%) -- hcchen5600 2014/05/07 10:38:40 
	this.checksum = function() {
		return ((this.xSum('black') ^ this.xSum('white')) % 251); // 251 is a prime number
	}
	
    this.count_corner = function(player) {
        var corners = 0;
        if (this.board[0][0] == player) corners++;
        if (this.board[7][0] == player) corners++;
        if (this.board[7][7] == player) corners++;
        if (this.board[0][7] == player) corners++;
        return corners;
    }
	/*
	// Just do it! 動民主杯黑白棋賽 local 程式 不需要這個評分。 hcchen5600 2014/05/04 20:43:05 
    this.evaluate = function(player) {

        var other = (player == "white") ? "black" : "white" ;

        var my_count = this.count(player);
        var your_count = this.count(other)

        if (this.is_game_over()) {
            if (my_count > your_count)
                return 1000;
            else if (your_count > my_count)
                return -1000;
            else 
                return 0;
        }

        var my_corners = this.count_corner(player);
        var your_corners = this.count_corner(other);
        var corners = (my_corners - your_corners) * 125;

        // 2. total pieces, from -100 to 100
        var pieces = 100 * (my_count - your_count) / 64;

        // 3. nr moves
        var my_moves = board.get_moves(player);
        var your_moves = board.get_moves(other);
        var total = my_moves.length + your_moves.length;

        var moves = total ? my_moves.length * 400 / total : 0;
        return moves + pieces + corners;
    }
	*/
}