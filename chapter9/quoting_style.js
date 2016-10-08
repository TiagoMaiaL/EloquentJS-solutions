/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 9
 * Quoting style
 */

var text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(^')|'$|(?:\s)'|'(?:\s)/g, function(match) {
  return match.replace("'", '"');
}));
