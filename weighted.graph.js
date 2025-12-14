class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return;

    this.adjacencyList[vertex1].push({ node: vertex2, weight: weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight: weight });
  }

  dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    for (let vertex in this.adjacencyList) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
    }

    distances[start] = 0;
    pq.enqueue(start, 0);

    while (pq.values.length) {
      const smallest = pq.dequeue().node;

      if (smallest === end) break;

      for (let neighbour of this.adjacencyList[smallest]) {
        const candidate = distances[smallest] + neighbour.weight;

        if (candidate < distances[neighbour.node]) {
          distances[neighbour.node] = candidate;
          previous[neighbour.node] = smallest;
          pq.enqueue(neighbour.node, candidate);
        }
      }
    }

    const path = [];
    let curr = end;

    while (curr) {
      path.push(curr);
      curr = previous[curr];
    }

    return {
      distanc: distances[end],
      path: path.reverse(),
    };
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(node, distance) {
    this.values.push({ node, distance });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.distance - b.distance);
  }
}

const graph = new WeightedGraph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("D", "E", 3);

const result = graph.dijkstra("A", "E");
console.log(result);
