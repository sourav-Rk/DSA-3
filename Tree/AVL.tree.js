class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // height of node
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // ---------- Helper Functions ----------

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  // ---------- Rotations ----------

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    return x; // new root
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    return y; // new root
  }

  // ---------- Insert ----------

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    // 1. Normal BST insertion
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node; // no duplicates
    }

    // 2. Update height
    this.updateHeight(node);

    // 3. Get balance factor
    const balance = this.getBalance(node);

    // 4. Balance the tree (4 cases)

    // LL
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    // RR
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    // LR
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // RL
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  // ---------- Delete ----------

  delete(value) {
    this.root = this._delete(this.root, value);
  }

  _delete(node, value) {
    if (!node) return node;

    // 1. Normal BST delete
    if (value < node.value) {
      node.left = this._delete(node.left, value);
    } else if (value > node.value) {
      node.right = this._delete(node.right, value);
    } else {
      // node with one or no child
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        // node with two children
        const successor = this.getMinValueNode(node.right);
        node.value = successor.value;
        node.right = this._delete(node.right, successor.value);
      }
    }

    if (!node) return node;

    // 2. Update height
    this.updateHeight(node);

    // 3. Get balance
    const balance = this.getBalance(node);

    // 4. Balance the tree

    // LL
    if (balance > 1 && this.getBalance(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // LR
    if (balance > 1 && this.getBalance(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // RR
    if (balance < -1 && this.getBalance(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // RL
    if (balance < -1 && this.getBalance(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  getMinValueNode(node) {
    let curr = node;
    while (curr.left) curr = curr.left;
    return curr;
  }

  // ---------- Traversals ----------

  inorder(node = this.root) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.value);
    this.inorder(node.right);
  }

  preorder(node = this.root) {
    if (!node) return;
    console.log(node.value);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  levelOrder() {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift();
      console.log(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }
}

const avl = new AVLTree();

avl.insert(10);
avl.insert(20);
avl.insert(30);
avl.insert(40);
avl.insert(50);
avl.insert(25);

console.log("Inorder (sorted):");
avl.inorder();

console.log("Level Order:");
avl.levelOrder();

avl.delete(40);

console.log("After deleting 40:");
avl.levelOrder();
