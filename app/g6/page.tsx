'use client'
import * as G6 from '@antv/g6';
import React, { useEffect } from 'react';

const data = {
  nodes: [
    {
      id: "node1",
      label: "Circle1",
      x: 150,
      y: 150
    },
    {
      id: "node2",
      label: "Circle2",
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    }
  ]
};

export default function() {
  const ref = React.useRef(null);
  let graph: G6.Graph | null = null;

  useEffect(() => {
    if (!graph && ref.current) {
      graph = new G6.Graph({
        container: ref.current,
        // width: 500,
        // height: 900,
        modes: {
          default: [
            { type: "drag-canvas" },
            { type: "zoom-canvas" },
            { type: "drag-node" }
          ]
        },
        layout: {
          type: "dagre",
          rankdir: "BT", // 可选，默认为图的中心
          // align: 'DL', // 可选
          nodesep: 50, // 可选
          ranksep: 90 // 可选
          // controlPoints: true
        },
        defaultNode: {
          type: "rect-xml2"
        },
        defaultEdge: {
          type: "quadratic",
          style: {
            stroke: "#ffb203",
            lineWidth: 3,
            endArrow: {
              path: G6.Arrow.triangle(4, 4, 8),
              d: 8
            }
          },
          edgeStateStyles: {
            highlight: {
              stroke: "#ffb203",
              lineWidth: 5
            },
            dark: {
              stroke: "#ffb20333"
            }
          },

          curveOffset: 100
          // controlPoints: [{ x: 10, y: 20 }]
        }
      });

      graph.data(data);
      graph.render();
  
      // graph.on('')
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

   graph?.addItem('node', newNode)
  };

  return (
    <div className='relative bg-white w-screen h-screen overflow-hidden' >
      <div
          className=' absolute w-48 right-24 top-24 absilute w-24 flex'
        >
          <button
          className='bg-gray-500 pr-8 pl-8 flex'

            onClick={(e) => {
              e.preventDefault();
              addNewNode();
            }}
          >
            Add New Node
          </button>
        </div>
        <div className='bg-white h-screen'  ref={ref}></div>;

    </div>
  )
}