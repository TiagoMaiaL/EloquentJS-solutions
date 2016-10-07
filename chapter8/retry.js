/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 8
 * Retry
 */

function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  var result == null;

  while(!result) {
    try {
      result = primitiveMultiply(a, b);
    } catch(exception) {
      if (exception instanceof MultiplicatorUnitFailure)
        continue;
    }
  }

  return result;
}

console.log(reliableMultiply(8, 8));
// → 64
