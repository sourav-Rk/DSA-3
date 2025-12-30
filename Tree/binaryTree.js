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

  leafNodes(root) {
    if (!root) return 0;
    if (!root.right && !root.left) return 1;

    let left = this.leafNodes(root.left);
    let right = this.leafNodes(root.right);

    return left + right;
  }

  max() {
    let max_value = 0;

    const queue = [this.root];

    while (queue.length) {
      const curr = queue.shift();
      if (curr.value >= max_value) {
        max_value = curr.value;
      }

      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return max_value;
  }

  levelK(n) {
    if (n === 0) {
      console.log(this.root.value);
      return;
    }

    const queue = [this.root];
    let i = 0;
    while (i <= n) {
      const qLen = queue.length;
      let arr = [];
      for (let k = 0; k < qLen; k++) {
        const currNode = queue.shift();
        arr.push(currNode.value);
        if (currNode.left) queue.push(currNode.left);
        if (currNode.right) queue.push(currNode.right);
      }
      console.log(`level:${i}`, arr);
      i++;
    }
  }

  checkIdentical(root1, root2) {
    const q1 = [root1];
    const q2 = [root2];

    while (q1.length && q2.length) {
      const curr1 = q1.shift();
      const curr2 = q2.shift();

      if (curr1.value !== curr2.value) {
        return false;
      }

      if (curr1.left) q1.push(curr1.left);
      if (curr1.right) q1.push(curr1.right);

      if (curr2.left) q2.push(curr2.left);
      if (curr2.right) q2.push(curr2.right);
    }

    return true;
  }

  mirrorBinaryTree(root) {
    const queue = [root];

    while (queue.length) {
      const curr = queue.shift();

      [curr.left, curr.right] = [curr.right, curr.left];

      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  isFullBinaryTree() {
    const queue = [this.root];

    while (queue.length) {
      const currNode = queue.shift();

      if (
        (currNode.left && !currNode.right) ||
        (currNode.right && !currNode.left)
      )
        return false;

      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);
    }
    return true;
  }

  isCompleteBinaryTree() {
    const queue = [this.root];
    let seenNull = false;

    while (queue.length) {
      const curr = queue.shift(); 

      if (curr === null) {
        seenNull = true;
      } else {
        if (seenNull) {
          return false;
        }

        queue.push(curr.left);
        queue.push(curr.right);
      }
    }
    return true;
  }

  diameter() {
    let dim = 0;
    function height(root) {
      if (root === null) return 0;

      let left = height(root.left);
      let right = height(root.right);

      dim = Math.max(dim, left + right);

      return Math.max(left, right) + 1;
    }
    height(this.root);
    return dim;
  }

  convertToBst() {
    const values = [];

    function storeInorder(root) {
      if (root) {
        storeInorder(root.left);
        values.push(root.value);
        storeInorder(root.right);
      }
    }

    function restore(root) {
      if (root) {
        restore(root.left);
        root.value = values[index++];
        restore(root.right);
      }
    }

    storeInorder(this.root);
    values.sort((a, b) => a - b);
    restore(this.root);
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
bt.insert(14);
bt.levelOrder();
console.log(bt.leafNodes(bt.root));

const path = [];
if (bt.getPath(bt.root, 13, path)) {
  console.log(path);
} else {
  console.log("no value found");
}

console.log(bt.isPerfect());
