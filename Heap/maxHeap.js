class Heap {
    constructor(array=[]){
        this.heap = array
        this.buildHeap()
    }

    getLeftChildInd(index){
        return (index*2)+1
    }

    getRightChildInd(index){
        return (index*2)+2
    }

    getParent(index){
        return Math.floor((index -1)/2)
    }

    buildHeap(){
        for(let i = this.getParent(this.heap.length - 1);i>=0;i--){
            this.heapifyUp(i)
        }
    }

    heapifyUp(index){
        let highest = index
        let left = this.getLeftChildInd(index)
        let right = this.getRightChildInd(index)

        if(left < this.heap.length && this.heap[left] > this.heap[highest]){
            highest = left
        }

        if(right < this.heap.length && this.heap[right] > this.heap[highest]){
            highest = right
        }

        if(highest !== index){
            [this.heap[index],this.heap[highest]] = [this.heap[highest],this.heap[index]]
            this.heapifyUp(highest)
        }
    }

    display(){
        console.log(this.heap)
    }
}

const maxHeap = new Heap([10,5,25,3,30,22,12])
maxHeap.display()