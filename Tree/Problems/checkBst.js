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

    isBST(){
        const stack = [{node : node.value, min : -Infinity, max : Infinity}]

        while(stack.length){
            const{node,min,max} = stack.pop()
            if(node.value < min || node.value > max) return false
            
            else if(node.left){
                stack.push({node : node.left , min , max : node.value})
            }
            
            else if(node.right){
                stack.push({node : node.right , min : node.value, max})
            }
        }
        return true
    }
  
    isEmpty() {
      return this.root === null;
    }
  
  }