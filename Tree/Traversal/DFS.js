//preOrder traversal (Root → Left → Right)
//1  Visit the root node.

//2  Traverse the left subtree in preorder.

//3  Traverse the right subtree in preorder.


//inOrder traversal  (Left → Root → Right)
//1 Traverse the left subtree in inorder.

//2 Visit the root node.

//3 Traverse the right subtree in inorder.

// Postorder Traversal (Left → Right → Root)
//1 Traverse the left subtree in postorder.

//2 Traverse the right subtree in postorder.

//3 Visit the root node.

class Node {
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null
    }

    //to insert a node
    insert(value){
        const newNode = new Node(value)
        if(this.isEmpty()){
            this.root = newNode
        }else{
             this.insertNode(this.root,newNode)
        }
    }

    insertNode(root,newNode){
        if(newNode.value < root.value){
            if(root.left === null){
               root.left = newNode
            }else{
                this.insertNode(root.left,newNode)
            }
        }else{
            if(root.right === null){
                root.right = newNode
            }else{
                this.insertNode(root.right,newNode)
            }
        }
    }

    preOrder(root){
        if(root){
            console.log(root.value)
            this.preOrder(root.left)
            this.preOrder(root.right)
        }
    }

    inOrder(root){
        if(root){
            this.inOrder(root.left)
            console.log(root.value)
            this.inOrder(root.right)
        }
    }

    postOrder(root){
        if(root){
            this.postOrder(root.left)
            this.postOrder(root.right)
            console.log(root.value)
        }
    }

    //to check tree empty
    isEmpty(){
        return this.root === null
    }
}