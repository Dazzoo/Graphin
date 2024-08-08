"use client";
import Graphin, { Behaviors } from "@antv/graphin";

import { Utils } from "@antv/graphin";
import { useState } from "react";

const mockData = (count: number) => {
  return Utils.mock(count).random().graphin();
};

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default () => {
  const [data, setData] = useState(mockData(10));
  const [numberOfDataAdd, setNumberOfDataAdd] = useState<number>(5);

  return (
    <div className="w-screen h-screen relative ">
      <ActionsPannel
        data={data}
        setData={setData}
        numberOfDataAdd={numberOfDataAdd}
        setNumberOfDataAdd={setNumberOfDataAdd}
      />
      <Graphin data={data}>
        <ZoomCanvas enableOptimize />
        <DragNode disabled />
      </Graphin>
    </div>
  );
};

const ActionsPannel = ({
  data,
  setData,
  numberOfDataAdd,
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
        <div>
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
        </div>
        <div
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
              setData(mockData(numberOfDataAdd));
            }}
          >
            Mock {numberOfDataAdd}
          </button>
        </div>
      </form>
    </div>
  );
};
