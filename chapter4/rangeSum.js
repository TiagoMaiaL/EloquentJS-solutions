/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 4
 * The sum of a range
 */

var range = function(start, end, step) {
  var numbers = [];
  if (step == null || step == 0) step = 1;

  if (start > end && step > 0) {
    return null;
  }

  if (end > start && step < 0) {
    return null;
  }

  for (var number = start; step > 0 ? number <= end : number >= end; number += step) {
    numbers.push(number);
  }

  return numbers;
}

var sum = function(numbers) {
  var result = 0;

  for (var i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }

  return result;
}

console.log(sum(range(1, 10)));
