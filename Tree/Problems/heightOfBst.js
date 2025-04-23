function findHeight(node){
    if(node === null) return -1
    
    let left = findHeight(node.left)
    let right = findHeight(node.right)
    return Math.max(left,right) + 1
}