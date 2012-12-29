
function get_best_move(board, player, maxDepth) {
    var x = minimax(board, player, maxDepth, 0);
    return x[1];
}

function minimax(board, player, maxDepth, currentDepth) {
    if (board.is_game_over() || currentDepth == maxDepth) {
        return new Array(board.evaluate(player), null);
    }

    var bestMove = null;
    var bestScore;
    if (board.get_current_player() == player) {
        bestScore = -200000;
    } else {
        bestScore = +200000;
    }

    var moves = board.get_current_player_moves();
    if (!moves.length) {
        return new Array(board.evaluate(player), null);
    }

    for (var i = 0; i < moves.length; i++) {
        var newBoard = board.make_move(moves[i][0], moves[i][1]);

        var current = minimax(newBoard, player, maxDepth, currentDepth + 1);

        if (board.get_current_player() == player) {
            if (current[0] > bestScore) {
                bestScore = current[0];
                bestMove = moves[i];
            }
        } else {
            if (current[0] < bestScore) {
                bestScore = current[0];
                bestMove = moves[i];
            }
        }
    }

    if (!bestMove && currentDepth == 0) {
        alert("No move! But moves count is " + moves.length + ". Minimax score was " + current[0]);
    }

    return new Array(bestScore, bestMove);
}