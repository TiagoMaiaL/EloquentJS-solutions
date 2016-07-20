/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 4
 * Deep comparison
 */

var deepEqual = function(first, second) {
  if (first == null || second == null) {
    return false;
  }

  if (typeof first != 'object' || typeof second != 'object') {
    return first === second;
  }

  var result = true;

  if ((typeof first == 'object') && 
      (typeof second == 'object') &&
      (Object.keys(first).length == Object.keys(second).length)
  ) {

    for (key in first) {
      result = result && deepEqual(first[key], second[key]);
    }
  }

  return result;
}
