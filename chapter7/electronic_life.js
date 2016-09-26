
// VECTOR

/**
 * Vector object.
 * Represents a space's coordinates.
 * @param int x
 * @param int y
 */
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * Adds the two coordinates on two different vectors.
 * @param  Vector another
 * @return Vector
 */
Vector.prototype.plus = function(another) {
  return new Vector(another.x + this.x, another.y + this.y);
}


// GRID

/**
 * Grid object.
 * Represents all possible spaces and it's values.
 * @param int width
 * @param int height
 */
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

/**
 * Checks if a given vector is inside the grid.
 * @param  Vector  vector
 * @return boolean
 */
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
}

/**
 * Gets a value from the grid at the specified space.
 * @param  Vector vector
 * @return Object
 */
Grid.prototype.get = function(vector) {
  return this.space[vector.x + vector.y * this.width];
}

/**
 * Sets the specified value within the grid at the given space.
 * @param Vector vector
 * @param value
 * @return void
 */
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + vector.y * this.width] = value;
}

/**
 * Runs the given function with the provided
 * context for each element in the space.
 * @param  Function fn
 * @param  Object   context
 * @return null
 */
Grid.prototype.each = function(fn, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[vector.x + vector.y * this.width];
      if (value != null) {
        f.call(context, value, new Vector(x, y));
      }
    }
  }
}


// DIRECTIONS

var directions = {
  'n'   : new Vector(0, -1),
  'ne'  : new Vector(1, -1),
  'e'   : new Vector(1, 0),
  'se'  : new Vector(1, 1),
  's'   : new Vector(0, 1),
  'sw'  : new Vector(-1, 1),
  'w'   : new Vector(-1, 0),
  'nw'  : new Vector(-1, -1)
}

var directionNames = "n ne e se s sw w nw".split(" ");

/**
 * Gets a random element from the given array.
 * @param  Array array
 * @return value
 */
function randomElement = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * A dumb Critter object.
 */
function BouncingCritter() {
  this.direction = randomElement(directionNames);
}

/**
 * Acts upon the given view object.
 * It will only move into an open direction.
 * If it finds an obstacle,
 * it goes into another direction.
 * @param  View view
 * @return Action
 */
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ") {
    this.direction = view.find(" ") || "s";
  }

  return {type: "move", direction: this.direction};
}


// WORLD ELEMENTS

/**
 * Gets an element by using the constructor
 * provided in the legend object.
 * @param  Object legend
 * @param  string char
 * @return Object
 */
function elementFromChar(legend, char) {
  if (char == " ")
    return null;

  var element = new legend[char]();
  element.originChar = char;
  return element;
}

/**
 * Gets the origin char of the passed element.
 * @param  Object element
 * @return String
 */
function charFromElement = function(element) {
  if (element == null)
    return " ";

  return element.originChar;
}

/**
 * Wall object.
 */
function Wall() {};

// WORLD

/**
 * World object.
 * Responsible for coordinating all
 * critters actions and positions.
 * @param Array map
 * @param Object legend
 */
function World(map, legend) {
  this.grid = new Grid(map[0].length, map.length);
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++) {
      this.grid.set(
        new Vector(x, y),
        elementFromChar(legend, line[x])
      );
    }
  }, this);
}

/**
 * Returns the world drawn map.
 * @return String
 */
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; y < this.grid.width; i++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }

  return output;
}

World.prototype.turn = function() {
  var acted = [];
  this.grid.each(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      
    }
  });
}

