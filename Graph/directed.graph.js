class DirectedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return;

    this.adjacencyList[vertex1].push(vertex2);
  }

  dfs(start) {
    const visited = new Set();
    const stack = [start];

    while (stack.length) {
      const curr = stack.pop();

      for (let vertex of this.adjacencyList[curr]) {
        if (!visited.has(vertex)) {
          stack.push(vertex);
        }
      }

      visited.add(curr);
    }

    console.log(visited);
  }

  hasCycle() {
    const visited = new Set();
    const recStack = new Set();

    const dfs = (node) => {
      visited.add(node);
      recStack.add(node);

      for (let vertex of this.adjacencyList[node]) {
        if (!visited.has(vertex)) {
          if (dfs(vertex)) return true;
        } else if (recStack.has(vertex)) {
          return true;
        }
      }

      recStack.delete(node);
      return false;
    };

    for (let vertex in this.adjacencyList) {
      if (!visited.has(vertex)) {
        if (dfs(vertex)) return true;
      }
    }
    return false;
  }
}

const graph = new DirectedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
graph.dfs("A");
console.log(graph.hasCycle());
