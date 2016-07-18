/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 3
 * Bean counting
 */

/**
 * Counts the occurrences of the given chars.
 * @param  String text
 * @param  String character
 * @return Number
 */
var countChar = function(text, character) {
  var count = 0;

  for (var i = 0; i <= text.length - 1; i++) {
    var currentChar = text.charAt(i);
    if (currentChar == character) count++;
  };

  return count;
}