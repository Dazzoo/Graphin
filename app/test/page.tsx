'use client'
import G6 from '@antv/g6';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

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
    if (!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas'],
        },
        layout: {
          type: 'radial',
          direction: 'LR',
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10,
            },
          },
          style: {
            stroke: '#72CC4A',
            width: 150,
          },
        },
        defaultEdge: {
          shape: 'polyline',
        },
      });
    }
    graph.data(data);
    graph.render();
  }, []);

  return <div className='bg-white overflow-hidden h-screen'  ref={ref}></div>;
}