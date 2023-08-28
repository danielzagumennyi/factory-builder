import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const Canvas: FC<PropsWithChildren> = ({ children }) => {
  return <Wrapper onMouseMove={console.log}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 1px solid grey;
  height: 100%;
`;
