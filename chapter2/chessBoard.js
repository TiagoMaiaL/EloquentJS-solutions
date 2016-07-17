/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 2
 * Chess Board
 */

var size = 8;

var boardDraw = '';

for (var line = 0; line < size; line++) {
  var lineDraw = '';

  for (var column = 0; column < size; column ++) {
    if ((line + column) % 2 == 0) {
      lineDraw += ' ';
    } else {
      lineDraw += '#';
    }
  }
  boardDraw += lineDraw + '\n';
}

console.log(boardDraw);
