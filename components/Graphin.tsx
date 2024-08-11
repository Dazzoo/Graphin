"use client";
import addEdgesStyles from "@/utils/addEdgesStyles";
import * as G6 from '@antv/g6';
import Graphin, { Behaviors, Utils } from "@antv/graphin";
import React, { useState } from "react";
import AddNode from "./AddNode";
import UpdateNode from "./UpdateNode";

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

const testData = {
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

export default () => {
  const [state, setState] = React.useState({
    selected: [],
    data: Utils.mock(5).circle().graphin(),
  });
  const [numberOfDataAdd, setNumberOfDataAdd] = useState<number>(5);
  const ref = React.useRef(null);
  let graph: G6.Graph | null = null;



  addEdgesStyles(state.data);

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

    // Graphin.registerNode('test', newNode)
    // Graphin.ref



    // setState((prev) => ({
    //   ...prev,
    //   data: {
    //     nodes: [...prev.data.nodes, newNode],
    //     edges: [...prev.data.edges],
    //   },
    // }));
  };

  console.log("state", state);

  const { data } = state;
  return (
    <div className="w-screen h-screen relative ">
      <ActionsPannel
        data={data}
        state={state}
        setState={setState}
        addNewNode={addNewNode}
        numberOfDataAdd={numberOfDataAdd}
        setNumberOfDataAdd={setNumberOfDataAdd}
      />
      <Graphin ref={ref} data={data}>
        <ZoomCanvas enableOptimize />
        <DragNode disabled />
        <UpdateNode state={state} setState={setState} />
        <AddNode />
      </Graphin>
    </div>
  );
};

const ActionsPannel = ({
  data,
  state,
  setState,
  numberOfDataAdd,
  addNewNode,
  setNumberOfDataAdd,
}: any) => {
  return (
    <div className="">
      <div className="absolute mt-12 left-20 z-50 text-black text-2xl flex-col">
        <div>
          <span className="font-semibold">Nodes:</span> {data.nodes.length}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Edges:</span> {data.edges.length}
        </div>
      </div>
      <form
        className="text-black "
        style={{
          zIndex: 9,
          position: "absolute",
          top: 15,
          right: 210,
          padding: 1,
        }}
      >
        {/* <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mock number of data
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="nodes"
              id="nodes"
              value={numberOfDataAdd}
              placeholder="Number of nodes to be affected"
              onChange={(e) => setNumberOfDataAdd(parseInt(e.target.value))}
              className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div> */}
        {/* <div
          style={{
            marginTop: "15px",
            background: "rgba(0, 0, 0, .5)",
            color: "white",
          }}
        >
          <button
            style={{
              display: "block",
              width: "100%",
              paddingRight: "15px",
              paddingLeft: "15px",
            }}
            onClick={(e) => {
              e.preventDefault();
              // setData(mockData(numberOfDataAdd));
            }}
          >
            Mock {numberOfDataAdd}
          </button>
        </div> */}

        <div
          style={{
            marginTop: "25px",
            background: "rgba(0, 0, 0, .5)",
            color: "white",
          }}
        >
          <button
            style={{
              display: "block",
              width: "100%",
              paddingRight: "15px",
              paddingLeft: "15px",
            }}
            onClick={(e) => {
              e.preventDefault();
              addNewNode();
            }}
          >
            Add New Node
          </button>
        </div>
      </form>
    </div>
  );
};
