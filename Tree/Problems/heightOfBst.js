function findHeight(node){
    if(node === null) return -1
    
    let left = findHeight(node.left)
    let right = findHeight(node.right)
    return Math.max(left,right) + 1
}

//depth of a specifin node
function findDepth(root,value){
    let depth = 0;
    while(root !== null){
        if(root.value === value) return depth;
        else if(value < root.value) root = root.left;
        else root = root.right;  
    }
}

//function to clone a bst
class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

function clone(root){
    if(root === null) return null;
    const newNode = new Node(value);
    newNode.left = clone(root.left);
    newNode.right = clone(root.right);
    return newNode
}