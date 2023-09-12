import { useContext } from "react";
import { NodeContext } from "../components/Node";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const useConnections = () => {
  const nodeId = useContext(NodeContext);

  const connections = useStore((s) => {
    const nodePoints = s.points[nodeId] || [];

    return s.connections.filter((c) => {
      return nodePoints.some(
        (point) => point.id === c.id || point.id === c.target
      );
    });
  }, shallow);

  return connections;
};
