const Node = require('./node');

class MaxHeap {
  constructor() {

  }

  push(data, priority) {

  }

  pop() {

  }

  detachRoot() {

  }

  restoreRootFromLastInsertedNode(detached) {

  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.length = 0;
  }

  insertNode(node) {

  }

  shiftNodeUp(node) {

  }

  shiftNodeDown(node) {

  }
}

module.exports = MaxHeap;