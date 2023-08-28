import { FC, PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";

export const Canvas: FC<PropsWithChildren> = ({ children }) => {
  const [state] = useState(1);

  useEffect(() => {
    console.log(state);
  }, []);

  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;
