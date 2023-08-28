import { useState } from "react";
import styled from "styled-components";

const useDrag = () => {
  // return {
  //   onClick,
  //   onMove,
  // };
};

export const Card = () => {
  const [drag, setDrag] = useState(false);

  return (
    <Wrapper
      onMouseDown={() => setDrag(true)}
      onMouseUp={console.log}
    ></Wrapper>
  );
};

// const ConnectPoint = styled.div`
//   position: absolute;
//   border-radius: 10px;
//   width: 10px;
//   height: 10px;
//   background-color: #1f1f1f;
//   top: 50%;
//   transform: translateY(-50%);
//   right: -5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #3376cd;
//   }
// `;

const Wrapper = styled.div`
  background-color: #1f1f1f;
  padding: 10px;
  width: 100px;
  height: 150px;
  position: relative;
`;
