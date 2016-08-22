/**
 * Solutions to Eloquent js exercises.
 *
 * Chapter 6
 * Sequence Interface
 */

function ArraySeq(items) {
  this.internalIndex = 0;
  this.items = items;
}

ArraySeq.prototype.next = function() {
  if (this.internalIndex + 1 > this.items.length) {
    return undefined;
  }

  this.internalIndex++;
  return this.internalIndex;
}

ArraySeq.prototype.itemAt = function() {
  return this.items[this.internalIndex];
}

function RangeSeq(from, to) {
  this.internalIndex = 0;
  this.items = [];

  for(var i = from; i <= to; i++) {
    this.items.push(i);
  }
}
RangeSeq.prototype = Object.create(ArraySeq.prototype);

var logFive = function(sequence) {
  for (var i = sequence.internalIndex; i < 5; i = sequence.next()) {
    if (sequence.itemAt() == null) {
      break;
    }

    console.log(sequence.itemAt());
  }
}
