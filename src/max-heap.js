const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.length = 0;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);    
    this.length++;
  }

  pop() {
    if (this.isEmpty()) return;
    const node = this.detachRoot();
    this.restoreRootFromLastInsertedNode(node);
    this.shiftNodeDown(this.root);
    return node.data;
  }

  detachRoot() {    
    const detachedRoot = this.root;
    if (this.parentNodes.indexOf(this.root) != -1) {
      this.parentNodes.shift();
    }
    this.root = null;
    this.length--;
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.isEmpty()) return;
    const lastInsertedNode = this.parentNodes.pop();    
    if (lastInsertedNode) {
      const parent = lastInsertedNode.parent;
      this.root = lastInsertedNode;
      if (parent) {
        lastInsertedNode.remove();
        if (!parent.right && parent.left && parent !== detached) {
          this.parentNodes.unshift(parent);
        }
      }
      if (detached.left) {
        lastInsertedNode.appendChild(detached.left);
      }
      if (detached.right) {
        lastInsertedNode.appendChild(detached.right);
        return;
      }
      this.parentNodes.unshift(lastInsertedNode);
    }
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
    if (!this.root) {
      this.root = node;
      this.parentNodes.push(node);
      return;
    }
    if (this.parentNodes[0].left === null) {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      this.parentNodes.shift();
    }
  }

  shiftNodeUp(node) {
    const parent = node.parent;
    if (parent && parent.priority < node.priority) {
      if (parent === this.root) {
        this.root = node;
      }
      const nodeIndex = this.parentNodes.indexOf(node);
      const parentIndex = this.parentNodes.indexOf(parent);
      if (parentIndex === -1) {
        this.parentNodes[nodeIndex] = parent;
      } else {
        this.parentNodes[parentIndex] = node;
        this.parentNodes[nodeIndex] = parent;
      }
      node.swapWithParent();
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (node === null || node.left === null) {
      return;
    }
    if (node.left) {
      let childToShift = node.left;
      if (node.right && childToShift.priority <= node.right.priority) {
        childToShift = node.right;
      }
      if (childToShift.priority > node.priority) {
        const childToShiftIndex = this.parentNodes.indexOf(childToShift);
        const nodeIndex = this.parentNodes.indexOf(node);
        if (node === this.root) {
          this.root = childToShift;
        }
        if (nodeIndex === -1) {
          this.parentNodes[childToShiftIndex] = node;
        } else {
          this.parentNodes[nodeIndex] = childToShift;
          this.parentNodes[childToShiftIndex] = node;
        }
        childToShift.swapWithParent();
        this.shiftNodeDown(node);
      }
    }
  }
}

module.exports = MaxHeap;