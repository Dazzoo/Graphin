"use client";
import Graphin, { Behaviors } from "@antv/graphin";


import { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .random()
  .graphin();

  data.nodes[0].style = {
    keyshape: {
      size: 80,
      stroke: 'red',
      fill: 'red',
      fillOpacity: 0.2,
    },
    label: {
      value: '设置 \n keyshape',
    },
  };

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default () => {
  return (
    <div className="w-screen h-screen" >
      <Graphin data={data}>
        <ZoomCanvas enableOptimize />
        <DragNode disabled />
      </Graphin>
    </div>
  );
} 