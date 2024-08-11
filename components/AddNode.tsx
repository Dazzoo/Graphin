import { PlusOutlined } from "@ant-design/icons";
import { GraphinContext } from "@antv/graphin";
import { ContextMenu } from "@antv/graphin-components";
import { useContext, useEffect } from "react";

const { Menu } = ContextMenu;

export default function AddNode() {
  const { graph } = useContext(GraphinContext);

  const handleAddNode = () => {
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

    graph.addItem("node", newNode);
    graph.refresh(); // Refresh the graph to reflect the changes
  };

    useEffect(() => {
        // setInterval(() => {
        //     const newNode = {
        //         id: `node-${Date.now()}`, // Unique ID for the new node
        //         x: Math.random() * 500, // Random x position
        //         y: Math.random() * 500, // Random y position
        //         style: {
        //           label: {
        //             value: "New Node",
        //           },
        //         },
        //       };
          
        //       graph.addItem("node", newNode);
        //       graph.refresh(); // Refresh the graph to reflect the changes
        // }, 1500)
    }, [])

  return (
    <ContextMenu bindType="canvas" style={{ width: "140px" }}>
      <Menu
        bindType="canvas"
        options={[
          {
            icon: <PlusOutlined />,
            key: "add-node",
            name: "添加节点",
          },
        ]}
        // onChange={handleAddNode}
      />
    </ContextMenu>
  );
}
