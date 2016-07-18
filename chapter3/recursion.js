/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 3
 * Recursion
 */

/**
 * Is the passed number even?
 * @param  Number x
 * @return Boolean
 */
var isEven = function(x) {
  if (x < 0) {
    x = x * -1;
  }

  if (x == 0) {
    return true;
  }

  if (x == 1) {
    return false;
  }

  return isEven(x - 2);
}
