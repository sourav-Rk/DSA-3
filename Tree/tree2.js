// Deletion of node 

// There are three situtions
// 1. node doesnt have any child - simply remove the pointer of immediate successor node
// 2. node have one child - attach the immediate predecessor and successor node 
// 3. node have two child - this situtation have two ways

// 3.1 inorder predecessor
// replace the internal node with the inorder predecessor that is the largest value in the left branch

// 3.2 inorder successor
// replace the internal node with the inorder successor that is the smallest value in the right branch


class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    insert(value) {
      const newNode = new Node(value);
      if (this.isEmpty()) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    insertNode(root, newNode) {
      if (newNode.value < root.value) {
        if (root.left === null) {
          root.left = newNode;
        } else {
          this.insertNode(root.left, newNode);
        }
      } else {
        if (root.right === null) {
          root.right = newNode;
        } else {
          this.insertNode(root.right, newNode);
        }
      }
    }
  
    search(root,value){
      if(!root) return false
      else {
          if(root.value === value) return true
          else if(value < root.value){
              return this.search(root.left,value)
          }else{
              return this.search(root.right,value)
          }
      }
    }

    levelOrder(){
        const queue = []
        queue.push(this.root)
        while(queue.length){
            let curr = queue.shift()
            console.log(curr.value)
            if(curr.left) queue.push(curr.left)
            if(curr.right) queue.push(curr.right)    
        }
    }

    min(root){
        if(!root.left){
            return root.value
        }else{
            return this.min(root.left)
        }
    }

    delete(value){
        this.root = this.deleteNode(this.root,value)
    }

    deleteNode(root,value){
        if(root === null) return root
        if(value < root.value){
            root.left = this.deleteNode(root.left,value)
        }
        else if(value > root.value){
            root.right = this.deleteNode(root.right,value)
        }
        else{
            if(!root.left && !root.right){
                return null
            }
            if(!root.left){
                return root.right
            }
            else if(!root.right){
                return root.left
            }
            root.value = this.min(root.right)
            root.right = this.deleteNode(root.right,root.value)
        }
        return root
    }
  
    isEmpty() {
      return this.root === null;
    }
  
  }
  
  const bst = new BinarySearchTree()
  bst.preOrder(bst.root)
  