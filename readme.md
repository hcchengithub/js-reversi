
Just do it! �ʥ��D�M�¥մ��� local �{��
https://g0v.hackpad.com/Just-do-it--jVZASsoi0Ql

����դU�A���ͳ��b���l�̱��Q����C�ۤv�g�a�I
�U�ۦb�ۤv local �]�A�ۤ�� Text �b Hackpad�Bfacebook �έ��V�N��C
�� checksum�A��j�a�ֹ� checksum �N�i�H�T�O�ۤv�S���V���C
[x] �[�W�G�ѽL�y�СC
[ ] �����G�H�u���z�C
[ ] �[�W�G��e�L���� checksum �T��Ʀr�C
[ ] �[�W�G�դU��@�Ӭq���A��_�ԧ����\��C

-------------------------------------------------
GitHub: https://github.com/hcchengithub/js-reversi/commit/5a1f4fb741bb08a60902d0da552c5d53f83326b6

// �Хܥi�ۦ�m�ҥΪ���l�~�جO�H CSS �� Class �F�����C�}�G�C
    function reversi_show_moves(moves) {
        reversi_cell(move[1],move[0]).addClass("playable");
	#board .playable { 
	border: solid  #ff0000 2px;
	}
	
	#board .playable:hover { <============== �� hover �ɪ� style
	cursor: pointer;
	border: solid  #0000FF 2px;
	}
	
// �Ǧ^�U�@�ۤ⪺���X array [(x,y),(x,y),...]
    this.get_moves = function(player) {

// �Ǧ^��e���a�U�@�i�ۦ�m�����X array [(x,y),(x,y),...]
    this.get_current_player_moves = function(){
	// Run this in debugger to show available positions.
	reversi_show_moves(board.get_current_player_moves());

// �ݽ֦��X���l
	board.count('white')
	15
	board.count('black')
	5

//	�e�ѽL
	reversi_render_table()

	// �� Chrome debugger ���� reversi_render_table() �����b (0,0) �B��@�ʥմѡG
	board.board[0][0]='white'
	"white"
	board.board[0]
	["white", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
	reversi_render_table()
	undefined	

//	�e�Ѥl�A�Ѥl�O�� table �̨C�@�檺 Class �ӵe�W�h���C
	// �� Chrome debugger ���� reversi_render_table() �����b (0,0) �B��@�ʥմѡG
    $("#board").html(html);
    $("#board").html('<tr><td id="1-0" class="empty"></td></tr>');
    $("#board").html('<tr><td id="1-0" class="empty playable"></td></tr>');
    $("#board").html('<tr><td id="1-0" class="empty"></td></tr>');

//  ���y�СA
	// �� Chrome debugger ����o�@��A���W�@�ӼƦr�b���W
    $("#board").html('<tr><td align=center><b>1</b></td></tr>');

// hcchen5600 2014/05/04 14:43:13 �y�Х��n�F�A check in ....

	
	