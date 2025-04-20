// A Heap is a special binary tree which is a complete binary tree used to store data in a specific order.

//Two types of Heap 
// - Min Heap : the Parent node should be lesser than that of child node
// - Max Heap : the Parent node should be greater than that of child node

class Heap {
    constructor(array=[]){
        this.heap = array
        this.buildHeap()
    }

    getLeftChildIndex(index){
        return (2*index) + 1
    }

    getRightChildIndex(index){
        return (2*index)+2
    }

    getParent(index){
        return Math.floor((index - 1)/2)
    }

    buildHeap(){
        for(let i = this.getParent(this.heap.length - 1); i>=0;i--){
            this.heapifyDown(i)
        }
    }

    heapifyDown(index){
       let small = index
       let left = this.getLeftChildIndex(index)
       let right = this.getRightChildIndex(index)

       if(left < this.heap.length && this.heap[left] < this.heap[small]){
        small = left
       }

       if(right < this.heap.length && this.heap[right] < this.heap[small]){
          small = right
       }

       if(small !== index){
        [this.heap[index],this.heap[small]] = [this.heap[small],this.heap[index]]
        this.heapifyDown(small)
       }
    }

    display(){
        console.log(this.heap)
    }
}

const minHeap = new Heap([10,5,25,3,30,22,12])
minHeap.display()