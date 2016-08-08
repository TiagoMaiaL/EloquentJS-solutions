/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 5
 * Mother-child age difference
 *
 * http://eloquentjavascript.net/05_higher_order.html#h_I9XoVSLsTV
 * This solution should be run inside the 
 * book's sandbox, at their site.
 */

// Code from the site sandbox.
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Solution code.
var averageAge = average(ancestry.map(function(person) {
  var mother = byName[person.mother];

  if (mother == null)
    return null;

  return person.born - mother.born;
}).filter(function(person) {
  return person != null;
}));

console.log(averageAge);
