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
                this.insert(root.left,newNode)
            }
        }else{
            if(root.right === null){
                root.right = newNode
            }else{
                this.insertNode(root.right,newNode)
            }
        }
    }

    closestUsingPreOrder(value){
        let closest = {
          distance : 9999,
          closestNode : null
        }
        this.preOrder(this.root,closest,value)
        console.log(closest)
    }

    preOrder(root,closest,value){
        if(root){
            if(Math.abs(value - root.value) < Math.abs(closest.distance)){
                closest.distance = Math.abs(value - root.value)
                closest.closestNode = root.value
            }
            this.preOrder(root.left,closest,value)
            this.preOrder(root.right,closest,value)
        }
    }

    closest(target){
        if(this.isEmpty()) return console.log("tree is empty")
        let node = this.root
        let closest = Infinity

        while(node){
            if(Math.abs(target - node.value) < Math.abs(target - closest)){
                closest = node.value
            }

            else if(target < node.value){
                node = node.left
            }
            else{
                node = node.right
            }
        }
        console.log(closest)
    }

    isEmpty(){
        return this.root === null
    }
}

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(9)
bst.insert(15)
bst.insert(1)
bst.insert(18)
bst.closestUsingPreOrder(14)
bst.closest(14)