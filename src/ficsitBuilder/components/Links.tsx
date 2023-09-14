import styled from "styled-components";
import { PreConnection } from "../../components/contextMenu/PreConnection";
import { useBuilderStore } from "../store/builderStore";
import { Link } from "./Link";

export const Links = () => {
  const links = useBuilderStore((s) => s.links);
  return (
    <SVG>
      <PreConnection />
      {links.map((el) => (
        <Link data={el} key={el.source + "_" + el.target} />
      ))}
    </SVG>
  );
};

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: relative;
  z-index: 1;
`;
