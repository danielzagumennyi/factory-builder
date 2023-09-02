import styled from "styled-components";
import { LeftSidebar } from "./components/LeftSidebar";
import { Editor } from "./components/Editor";

export const FicsitBuilder = () => {
  return (
    <Layout>
      <LeftSidebar />
      <Editor />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
