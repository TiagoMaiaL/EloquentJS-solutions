/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 5
 * Flattening
 */

var arrays = [[1, 2, 3], [4, 5], [6]];
var flat = arrays.reduce(function(previous, current) {
  return previous.concat(current);
}, []);

console.log(flat);