import styled from "styled-components";
import { useStore } from "../../store";
import { useContextMenuStore } from "./store";
import { useContextMenu } from "../../hooks/useContextMenu";

export const ContextMenu = () => {
  useContextMenu();
  const { open, position, data } = useContextMenuStore();

  return open ? (
    <Wrapper
      data-context-menu="true"
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        left: position[0] + "px",
        top: position[1] + "px",
      }}
    >
      <Action
        onClick={() => {
          useStore.getState().removeNode(data.id);
          useContextMenuStore.setState({ open: false });
        }}
      >
        Remove
      </Action>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  background-color: #1e1e1e;
  color: #fff;
  padding: 6px 0;
  border-radius: 6px;
  min-width: 150px;
`;

const Action = styled.div`
  cursor: pointer;
  padding: 6px;
  &:hover {
    background-color: #006eff;
  }
`;
