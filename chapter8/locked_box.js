/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 8
 * The locked box
 */

var box = {
  locked: true,
  unlock: function() { this.locked = false; },
  lock: function() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(action) {
  var wasLocked = box.locked;

  if (wasLocked)
    box.unlock();

  try {
    action();
  } catch(exception) {
    console.log(exception);
  } finally {
    if (wasLocked)
      box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
// → true