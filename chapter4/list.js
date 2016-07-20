/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 4
 * A list
 */

var arrayToList = function(array) {
  if (array.length == 0) return null;

  return {
    value : array.shift(),
    rest : arrayToList(array)
  }
}

var listToArray = function(list) {
  if (list.rest == null) return [list.value];

  return [list.value].concat(
    listToArray(list.rest)
  );
}

var prepend = function(value, list) {
  return {
    value : value,
    rest: list
  };
}

var nth = function(index, list) {
  if (list == null) return null;

  var counter = (arguments[2] != null) ? arguments[2] : 0;

  if (counter == index)
    return {
      value : list.value,
      rest : null
    }

  return nth(index, list.rest, counter += 1);
}

