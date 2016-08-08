/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 5
 * Every and then some
 */

function iterate(array, predicate, breaker) {
  var result = false;

  for (var i = 0; i < array.length; i++) {
    result = predicate(array[i]);
    if (breaker(result)) break;
  };

  return result;
}

function every(array, predicate) {
  return iterate(array, predicate, function(result) {
    return result == false;
  });
}

function some(array, predicate) {
  return iterate(array, predicate, function(result) {
    return result == true;
  });
}
