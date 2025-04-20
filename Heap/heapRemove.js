class Heap {
    constructor(){
        this.heap = [10,15,20,25,30,35,40,45]
    }

    getLeftChildInd(index){
        return (index * 2) + 1
    }

    getRightChildInd(index){
        return (index * 2) + 2
    }

    remove(){
        this.heap[0] = this.heap.pop()
        this.heapifyDown(0)
    }

    heapifyDown(index){
        let small = index
        let left = this.getLeftChildInd(index)
        let right = this.getRightChildInd(index)

        if(left < this.heap.length && this.heap[left] < this.heap[small]){
            small = left
        }

        if(right < this.heap.length && this.heap[right] < this.heap[small]){
            small = right
        }

        if(small !== index){
            [this.heap[small],this.heap[index]] = [this.heap[index],this.heap[small]]
            this.heapifyDown(small)
        }
    }

    display(){
        console.log(this.heap)
    }

}


const heap = new Heap()
heap.remove()
heap.display()