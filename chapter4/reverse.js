/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 4
 * Reversing an array
 */

var reverseArray = function(array) {
  var reversed = [];

  for (var i = array.length - 1; i >= 0; i--) {
    reversed.push(array[i]);
  }

  return reversed;
}

var reverseArrayInPlace = function(array) {
  for (var index = 0; index < array.length / 2; index++) {
    var currentValue = array[index];
    var equivalentIndex = array.length - index - 1;

    array[index] = array[equivalentIndex];
    array[equivalentIndex] = currentValue;
  }

  return array;
}