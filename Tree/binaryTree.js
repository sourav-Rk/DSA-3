class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    const queue = [this.root];

    while (queue.length) {
      const currNode = queue.shift();

      if (!currNode.left) {
        currNode.left = node;
        return;
      } else {
        queue.push(currNode.left);
      }

      if (!currNode.right) {
        currNode.right = node;
        return;
      } else {
        queue.push(currNode.right);
      }
    }
  }

  getPath(root, value, path) {
    if (root === null) return false;

    path.push(root.value);

    if (root.value === value) {
      return true;
    }

    if (
      this.getPath(root.left, value, path) ||
      this.getPath(root.right, value, path)
    ) {
      return true;
    }

    path.pop();
    return false;
  }

  levelOrder() {
    const queue = [this.root];

    while (queue.length) {
      const currNode = queue.shift();
      console.log(currNode.value);

      if (currNode.left) {
        queue.push(currNode.left);
      }

      if (currNode.right) {
        queue.push(currNode.right);
      }
    }
  }

  countNodes(root, count = 0) {
    function counts(root) {
      if (root) {
        counts(root.left);
        count++;
        counts(root.right);
      }
    }

    counts(root);
    return count;
  }

  findHeight(root) {
    if (root === null) return -1;
    let left = this.findHeight(root.left);
    let right = this.findHeight(root.right);

    return Math.max(left, right) + 1;
  }

  isPerfect() {
    const height = this.findHeight(this.root);
    const nodes = this.countNodes(this.root);
    const noOfNodes = Math.pow(2, height + 1) - 1;
    return noOfNodes === nodes ? true : false;
  }
}

const bt = new BinaryTree();
bt.insert(10);
bt.insert(11);
bt.insert(12);
bt.insert(13);
bt.insert(14);
bt.insert(14);
bt.insert(14);
bt.levelOrder();

const path = [];
if (bt.getPath(bt.root, 13, path)) {
  console.log(path);
} else {
  console.log("no value found");
}

console.log(bt.isPerfect());
