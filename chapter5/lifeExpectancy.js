/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 5
 * Historical life expectancy
 *
 * http://eloquentjavascript.net/05_higher_order.html#h_FkNn96IrQe
 * This solution should be run inside the
 * book's sandbox, at their site.
 */

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// Your code here.
function groupBy(array, aggregator) {
  var groups = {};
  array.forEach(function(person) {
    groups = aggregator(person, groups);
  });
  return groups;
}

function getAgeAverages(centuries, mapper) {
  var ages = {};
  
  for(var property in centuries) {
    ages[property] = average(centuries[property].map(mapper));
  }
  
  return ages;
};

var centuriesPeople = groupBy(ancestry, function(person, groups) {
  var century = Math.ceil(person.died / 100);
  
  if (groups[century] == null) {
     groups[century] = [];
  }
  groups[century].push(person);

  return groups;
});

console.log(getAgeAverages(centuriesPeople, function(person) {
  return person.died - person.born;
}));
