//Algorithm of BFS
//1 Create a queue (FIFO – First In First Out)

//2 Enqueue the root node

//3 While the queue is not empty:

    // Dequeue a node from the front of the queue

    // Visit (print) that node's value

    // If the node has a left child, enqueue it

    // If the node has a right child, enqueue it


class Node{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null
    }

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

    search(root,value){
        if(!root) return false
        else{
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

    isEmpty(){
        return this.root === null
    }
}

const bst = new BinarySearchTree()
bst.insert(50)
bst.insert(30)
bst.insert(20)
bst.insert(10)
bst.insert(70)
bst.insert(40)
bst.insert(45)
bst.insert(60)
bst.insert(80)
bst.levelOrder()