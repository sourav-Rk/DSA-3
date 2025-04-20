class Heap {
    constructor(){
        this.heap = []
    }

    getParent(index){
        return Math.floor((index -1) /2)
    }

    insert(value){
        this.heap.push(value)
        this.heapifyUp(this.heap.length - 1)
    }

    heapifyUp(index){
        if(index === 0) return 

        let parentIndex = this.getParent(index)

        if(this.heap[index] < this.heap[parentIndex]){
            [this.heap[index],this.heap[parentIndex]] = [this.heap[parentIndex],this.heap[index]]
            this.heapifyUp(parentIndex)
        }
    }

    display(){
        console.log(this.heap)
    }
}

const heap = new Heap()
heap.insert(5)
heap.insert(30)
heap.insert(5)
heap.insert(20)
heap.insert(3)
heap.insert(13)
heap.insert(1)
heap.insert(50)
heap.display()