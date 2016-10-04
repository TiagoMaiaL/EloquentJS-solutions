
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

/**
 * Gets the direction plus 45 * n degrees.
 * @param  string direction
 * @param  int n
 * @return string
 */
function plusDirection(direction, n) {
  var index = directionNames.indexOf(direction);
  return directionNames[(index + n + 8) % 8];
}

/**
 * WallFollower critter.
 */
function WallFollower() {
  this.direction = "s";
}

/**
 * Critter's act method.
 * Walks to left of a wall.
 * @param  View view
 * @return Action
 */
WallFollower.prototype.act = function(view) {
  var start = this.direction;

  if (view.look(plusDirection(this.direction, -3)) != " ")
    start = this.direction = plusDirection(this.direction, -2);
  while (view.look(this.direction)) {
    this.direction = plusDirection(this.direction, 1);
    if (this.direction == start)
      break;
  }

  return {
    type: "move",
    direction: this.direction
  }
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

/**
 * Plant object.
 */
function Plant() {
  this.energy = 3 + Math.random() * 4;
}

/**
 * Plant's act method
 * @param  View view
 * @return object
 */
Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {
        type: "reproduce",
        direction: space
      }
  }

  if (this.energy < 20)
    return {type: "grow"}
}

/**
 * PlantEater Object.
 * A critter that eats plants and reproduces itself.
 */
function PlantEater() {
  this.energy = 20;
}

/**
 * Act method.
 * The critter, depending on its energy and plants available,
 * will reproduce, eat or move.
 * @param  View view
 * @return object
 */
PlantEater.prototype.act = function(view) {
  var space = view.find(" ");

  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};

  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
}


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

/**
 * A turn represents an opportunity for each critter to act.
 * @return {[type]} [description]
 */
World.prototype.turn = function() {
  var acted = [];
  this.grid.each(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  });
}

/**
 * An opportunity for a critter to act.
 * @param  Critter critter
 * @param  Vector vector
 * @return void
 */
World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    var destination = this.checkDestination(action, vector);
    if (destination && this.grid.get(destination) == null) {
      this.grid.set(vector, null);
      this.grid.set(destination, critter);
    }
  }
}

/**
 * Checks the passed destination returned from an action.
 * @param  Action action
 * @param  Vector vector
 * @return Vector
 */
World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var destination = vector.plus(directions[action.direction]);
    if (this.grid.isInside(destination)) {
      return destination;
    }
  }
}


// LIFE LIKE WORLD

/**
 * Life like world.
 * This object is an specific version of the
 * World object, with an overrided letAct,
 * allowing more than one actions other than
 * move.
 * @param array map
 * @param object legend
 */
function LifeLikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifeLikeWorld.prototype = Object.create(null);

/**
 * Lets a critter act according to the supported
 * action types.
 * @param  Object critter
 * @param  Vector vector
 * @return void
 */
LifeLikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter, vector, action);

  if (!handled) {
    critter.energy -= 0.25;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
}

/**
 * The supported action types.
 * @type object
 */
var actionTypes = Object.create(null);

/**
 * Handler for the grow action performed by plants.
 * @param  object critter
 * @return boolean
 */
actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
}

/**
 * Handler for the move action.
 * @param  Critter critter
 * @param  Vector vector
 * @param  object critter
 * @return boolean
 */
actionTypes.move = function(critter, vector, action) {
  var destination = this.checkDestination(action, vector);
  if (destination == null ||
      critter.energy <= 1 ||
      this.grid.get(destination != null))
    return false;

  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(destination, critter);
  return true;
}

/**
 * Eat action performed by some creatures.
 * @param  Critter critter
 * @param  Vector vector
 * @param  object action
 * @return boolean
 */
actionTypes.eat = function(critter, vector, action) {
  var destination = this.checkDestination(action, vector);
  var atDestination = destination != null && this.grid.get(destination);

  if (!atDestination || atDestination.energy == null)
    return false;

  critter.energy += atDestination.energy;
  this.grid.set(destination, null);
  return true;
}

/**
 * Reproduce action performed by some critters.
 * @param  Critter critter
 * @param  Vector vector
 * @param  object action
 * @return boolean
 */
actionTypes.reproduce = function(critter, vector, action) {
  var baby = elementFromChar(this.legend, critter.originChar);
  var destination = this.checkDestination(action, vector);

  if (destination == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(destination) != null)
    return false;

  critter.energy -= 2 * baby.energy;
  this.grid.set(destination, baby);
  return true;
}

// VIEW

/**
 * View object
 * @param World world
 * @param Vector vector
 */
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

/**
 * Looks what exists in the given direction.
 * @param  string direction
 * @return string
 */
View.prototype.look = function(direction) {
  var target = this.vector.plus(directions[direction]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
}

/**
 * Finds all directions in which the
 * given character can be found.
 * @param  string char
 * @return array
 */
View.prototype.findAll = function(char) {
  var found = [];
  for (var direction in directions) {
    if (this.look(direction) == char)
      found.push(direction);
  }
  return found;
}

/**
 * Finds a direction in which the
 * given string can be found.
 * @param  string char
 * @return string
 */
View.prototype.find = function(char) {
  var found = this.findAll(char);
  if (found.length == 0)
    return null;
  return randomElement(found);
}
