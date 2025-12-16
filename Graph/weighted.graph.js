//---------------Dijkstras algorith----------------

//Dijkstra’s Algorithm is a greedy shortest-path algorithm that finds the minimum
//distance from a source vertex to all other vertices in a weighted graph with NON-NEGATIVE edge weights.

// Always expand the closest unvisited vertex first.

// Once a node’s shortest distance is finalized, it never changes again.

// How it works (Step-by-Step)

// Assign distance:

// 0 to the start node

// Infinity to all other nodes

// Use a priority queue (min-heap) to always pick the vertex with the smallest distance.

// For the current vertex:

// Check all neighbors

// Update distances if a shorter path is found

// Repeat until:

// All vertices are processed OR

// Destination is reached

//---------------------Bellman fords algorithm----------------------
// Bellman–Ford Algorithm is a dynamic programming shortest-path algorithm
// that works on graphs with negative edge weights and can detect negative weight cycles.
// Gradually relax all edges multiple times until shortest paths stabilize.

// It does not assume greedy correctness.

// Why V − 1 Relaxations?

// A shortest path can have at most V − 1 edges

// Relaxing all edges V − 1 times guarantees correctness

// How it works (Step-by-Step)

// Initialize:

// dist[start] = 0

// Others = Infinity

// Repeat V − 1 times:

// Relax every edge

// Extra iteration:

// If any distance still improves → negative cycle exists

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

  bellmanFord(start, end) {
    const distances = {};
    const previous = {};
    const vertices = Object.keys(this.adjacencyList);
    const edges = [];

    // Step 1: Initialize distances
    for (let vertex of vertices) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
    }

    distances[start] = 0;

    // Step 2: Build edge list
    for (let u in this.adjacencyList) {
      for (let { node: v, weight: w } of this.adjacencyList[u]) {
        edges.push([u, v, w]);
      }
    }

    // Step 3: Relax all edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
      for (let [u, v, w] of edges) {
        if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
          distances[v] = distances[u] + w;
          previous[v] = u;
        }
      }
    }

    for (let [u, v, w] of edges) {
      if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
        throw new Error("Negative cycle detected");
      }
    }

    let curr = end;
    let path = [];

    while (curr) {
      path.push(curr);
      curr = previous[curr];
    }

    return {
      distance: distances[end],
      path,
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
const bellResult = graph.bellmanFord("A", "E");
console.log(bellResult);
console.log(result);
