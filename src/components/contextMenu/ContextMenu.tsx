import styled from "styled-components";

export const ContextMenu = ({
  floatingStyles,
  getFloatingProps,
  refs,
}: {
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  floatingStyles: React.CSSProperties;
  refs: {
    setFloating: (node: HTMLElement | null) => void;
  };
}) => {
  return (
    <Wrapper
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      Floating element
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #1e1e1e;
  color: #fff;
  padding: 6px 0;
`;
