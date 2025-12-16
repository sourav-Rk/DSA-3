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

    hasCycle(){
        const visited = new Set();

        const dfs = (node,parent) =>{
            visited.add(node);

            for(let neighbour of this.adjacencyList[node]){
                if(!visited.has(neighbour)){
                    if(dfs(neighbour,node)) return true
                }else if(neighbour !== parent) return true;
            }
            return false;
        }

        for(let vertex in this.adjacencyList){
            if(!visited.has(vertex)){
                if(dfs(vertex,null)) return true
            }
        }

        return false;
    }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A","B");
graph.addEdge("B","C");
graph.addEdge("C","A");

console.log(graph.hasCycle()); // true
