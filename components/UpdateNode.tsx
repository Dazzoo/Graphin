import Graphin, { GraphinContext, Utils } from "@antv/graphin";
import { ContextMenu } from "@antv/graphin-components";
import "@antv/graphin-components/dist/index.css";
import "@antv/graphin/dist/index.css";

// font icon
import iconLoader from "@antv/graphin-icons";
import "@antv/graphin-icons/dist/index.css";
import React from "react";

const { Menu } = ContextMenu;

const icons = Graphin.registerFontFamily(iconLoader);

const UpdateNode = ({ state, setState }: any) => {
  const { graph } = React.useContext(GraphinContext);
  const handleChange = (option: any, item: any) => {
    console.log(option, item);
    if (option.name === "update") {
      let randomCase = Math.floor(Math.random() * 5);
      item.id === "node-0" ? (randomCase = 0) : null;
      item.id === "node-1" ? (randomCase = 1) : null;
      item.id === "node-2" ? (randomCase = 2) : null;
      item.id === "node-3" ? (randomCase = 3) : null;
      item.id === "node-4" ? (randomCase = 4) : null;

      switch (randomCase) {
        case 0:
          graph.updateItem(item.id, {
            style: {
              // @ts-ignore
              label: {
                value: "node-0: update keyshape size,fill,stroke",
              },
              keyshape: {
                size: 80,
                stroke: "#ff9f0f",
                fill: "#ff9f0ea6",
              },
            },
          });
          break;
        case 1:
          graph.updateItem(item.id, {
            style: {
              // @ts-ignore
              label: {
                value: "update label offset/ color",
                offset: [100, 0],
                position: "right",
                fill: "red",
              },
            },
          });
          break;
        case 2:
          graph.updateItem(item.id, {
            style: {
              // @ts-ignore
              label: {
                value: "update icon to home",
              },
              icon: {
                type: "font",
                fontFamily: "graphin",
                value: icons.home,
              },
            },
          });
          break;
        case 3:
          graph.updateItem(item.id, {
            style: {
              // @ts-ignore
              label: {
                value: "update halo hidden",
              },
              halo: {
                visible: false,
              },
              status: {
                hover: {
                  halo: {
                    visible: false,
                  },
                },
                selected: {
                  halo: {
                    visible: false,
                  },
                },
              },
            },
          });
          break;
        case 4:
          graph.updateItem(item.id, {
            style: {
              // @ts-ignore
              label: {
                value: "update badges",
              },
              badges: [
                {
                  position: "RT",
                  type: "text",
                  value: Math.round(Math.random() * 100),
                  size: [20, 20],
                  color: "#fff",
                  fill: "red",
                },
              ],
            },
          });
          break;
        default:
          break;
      }
    } else {
        console.log('expand')
        console.log(option, item);
        const count = 4;
        const expandData = Utils.mock(count).expand([item]).type('company').graphin();

    
        setState((prev: any) => (
            {
                ...prev,
                data: {
                  nodes: [...prev.data.nodes, ...expandData.nodes],
                  edges: [...prev.data.edges, ...expandData.edges],
                },
              }
            ));
    }
  };
  return (
    <ContextMenu bindType="node">
      <Menu
        bindType="node"
        options={[{ name: "update" }, { name: "expand" }]}
        onChange={handleChange}
      />
    </ContextMenu>
  );
};

export default UpdateNode;
