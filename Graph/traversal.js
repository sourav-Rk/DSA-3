class Graph {
    constructor(){
        this.adjacencyList = {}
    }

    addVertex(vertex){
        if(!this.adjacencyList[vertex]){
            this.adjacencyList[vertex] = new Set()
        }
    }

    addEdge(vertex1,vertex2){
        if(!this.adjacencyList[vertex1]){
            this.adjacencyList[vertex1] = new Set()
        }
        if(!this.adjacencyList[vertex2]){
            this.adjacencyList[vertex2] = new Set()
        }

        this.adjacencyList[vertex1].add(vertex2)
        this.adjacencyList[vertex2].add(vertex1)
    }

    bfsTraversal(start){
        const queue = [start]
        const visited = new Set()
        visited.add(start)

        while(queue.length){
            const currVertex = queue.shift()
            for(let adjacentVertex of this.adjacencyList[currVertex]){
                if(!visited.has(adjacentVertex) && !queue.includes(adjacentVertex)){
                    queue.push(adjacentVertex)
                }
            }
            visited.add(currVertex)
        }
        console.log(visited)
    }

    dfsTraversal(start){
        const stack = [start]
        const visited = new Set()
        visited.add(start)
        while(stack.length){
            const currVertex = stack.pop()
            for(let adjacentVertex of this.adjacencyList[currVertex]){
                if(!visited.has(adjacentVertex) && !stack.includes(adjacentVertex)){
                    stack.push(adjacentVertex)
                }
            }
            visited.add(currVertex)
        }
        console.log(visited)
    }
}