"use client";
import * as G6 from "@antv/g6";
import React, { useEffect } from "react";

const data = {
  nodes: [
    {
      id: "node1",
      label: "Circle1",
      x: 150,
      y: 150,
      labelCfg: {
        style: {
          fill: "#000", // Label color
          fontSize: 25, // Label font size
          fontWeight: "bold", // Label font weight
          textAlign: "center", // Label text alignment
          textBaseline: "middle", // Label text baseline
        },
        position: "bottom", // Label position relative to the node
      },
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150,
    },
    {
      id: "node3",
      label: "Circle3",
      x: 200,
      y: 250,
    },
    {
      id: "node4",
      label: "Circle4",
      x: 50,
      y: 350,
    },
    {
      id: "node5",
      label: "Custom Label for Node 5",
      x: 650,
      y: 200,
    },
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      zIndex: 0,
      style: {
        stroke: "rgba(255, 0, 0, 1)",
        lineWidth: 13,
        endArrow: true,
      },
    },
    {
      source: "node1",
      target: "node3",
      zIndex: 0,
      style: {
        stroke: "rgba(0, 255, 0, 1)",
        lineWidth: 4,
        endArrow: true,
      },
    },
    {
      source: "node1",
      target: "node4",
      zIndex: 0,
      style: {
        stroke: "rgba(0, 0, 255, 1)",
        opacity: 0.2,
        lineWidth: 15,
        endArrow: {
          d: 18.7,
          opacity: 0.3,
        },
      },
    },
    {
      source: "node1",
      target: "node5",
      zIndex: 0,
      style: {
        stroke: "rgba(255, 255, 0, 1)",
        lineWidth: 5, // Line width
        endArrow: true,
      },
    },
  ],
};

// Function to calculate degree centrality
const calculateDegreeCentrality = (nodes: any[], edges: any[]) => {
  const centrality: { [key: string]: number } = {};
  nodes.forEach((node) => {
    centrality[node.id] = 0;
  });
  edges.forEach((edge) => {
    centrality[edge.source]++;
    centrality[edge.target]++;
  });
  return centrality;
};

// Calculate centrality and adjust node sizes
const centrality = calculateDegreeCentrality(data.nodes, data.edges);
data.nodes.forEach((node) => {
  // @ts-ignore
  node.size = 20 + centrality[node.id] * 10; // Base size 20, increase by 10 for each connection
});

// Sort nodes by size to ensure larger nodes are on top
// @ts-ignore
data.nodes.sort((a, b) => a.size - b.size);

export default function () {
  const ref = React.useRef(null);
  let graph: G6.Graph | null = null;

  useEffect(() => {
    if (!graph && ref.current) {
      data.edges.sort((a, b) => a.zIndex - b.zIndex);

      graph = new G6.Graph({
        container: ref.current,
        // width: 500,
        // height: 900,
        modes: {
          default: [
            { type: "drag-canvas" },
            { type: "zoom-canvas" },
            { type: "drag-node" },
          ],
        },
        defaultNode: {
          type: "circle",
          size: [50],
          color: "#5B8FF9",
          style: {
            fill: "#9EC9FF",
            lineWidth: 3,
          },
        },
        animate: true, // Boolean, whether to activate the animation when global changes happen
        animateCfg: {
          duration: 500, // Number, the duration of one animation
          easing: 'easeCubic', // String, the easing function
        },
        defaultEdge: {
          style: {
            stroke: "#e2e2e2",
            lineWidth: 2,
            endArrow: {
              path: G6.Arrow.triangle(10, 10, 10),
              fill: "#e2e2e2",
            },
          },
        },
      });
      // @ts-ignore
      graph.data(data);
      graph.render();
    }
  }, []);

  const addNewNode = () => {
    const newNode = {
      id: `node-${Date.now()}`, // Unique ID for the new node
      x: Math.random() * 500, // Random x position
      y: Math.random() * 500, // Random y position
      style: {
        label: {
          value: "New Node",
        },
      },
    };

    graph?.addItem("node", newNode);
  };

  const updateData = () => {
    const newData = {
      nodes: [
        { id: "node1", label: "Circle1", x: 150, y: 150 },
        { id: "node2", label: "Circle2", x: 400, y: 150 },
        { id: "node3", label: "Circle3", x: 200, y: 250 },
        { id: "node4", label: "Circle4", x: 50, y: 350 },
        { id: "node5", label: "Custom Label for Node 5", x: 650, y: 200 },
        { id: "node6", label: "New Node", x: 300, y: 300 },
      ],
      edges: [
        {
          source: "node1",
          target: "node2",
          zIndex: 0,
          style: {
            stroke: "rgba(255, 0, 0, 1)",
            lineWidth: 13,
            endArrow: true,
          },
        },
        {
          source: "node1",
          target: "node3",
          zIndex: 0,
          style: { stroke: "rgba(0, 255, 0, 1)", lineWidth: 4, endArrow: true },
        },
        {
          source: "node1",
          target: "node4",
          zIndex: 0,
          style: {
            stroke: "rgba(0, 0, 255, 1)",
            opacity: 0.2,
            lineWidth: 15,
            endArrow: { d: 18.7, opacity: 0.3 },
          },
        },
        {
          source: "node1",
          target: "node5",
          zIndex: 0,
          style: {
            stroke: "rgba(255, 255, 0, 1)",
            lineWidth: 5,
            endArrow: true,
          },
        },
        {
          source: "node1",
          target: "node6",
          zIndex: 0,
          style: {
            stroke: "rgba(0, 255, 255, 1)",
            lineWidth: 5,
            endArrow: true,
          },
        },
      ],
    };

    // Calculate centrality and adjust node sizes
    const newCentrality = calculateDegreeCentrality(
      newData.nodes,
      newData.edges
    );
    newData.nodes.forEach((node) => {
      // @ts-ignore
      node.size = 20 + newCentrality[node.id] * 10; // Base size 20, increase by 10 for each connection
    });

    // Sort nodes by size to ensure larger nodes are on top
    // @ts-ignore
    newData.nodes.sort((a, b) => b.size - a.size);

    // Update the graph with new data
    if (graph) {
      graph.changeData(newData);
    }
  };

  return (
    <div className="relative bg-white w-screen h-screen overflow-hidden">
      <div className=" absolute w-48 right-24 top-24 absilute w-24 flex">
        <button
          className="bg-gray-500 pr-8 pl-8 flex"
          onClick={(e) => {
            e.preventDefault();
            addNewNode();
          }}
        >
          Add New Node
        </button>
      </div>
      <div className=" absolute w-48 right-24 top-40 absilute w-24 flex">
        <button
          className="bg-gray-500 pr-8 pl-8 flex"
          onClick={(e) => {
            e.preventDefault();
            updateData();
          }}
        >
          Update Data
        </button>
      </div>
      <div className="bg-white h-screen" ref={ref}></div>;
    </div>
  );
}
