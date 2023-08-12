import styled, { css } from "styled-components";
import { ColourLookup } from "./utils";

export const Tile = styled.div<{ colour?: GeneralColour; height?: number }>`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;

  ${(props) =>
    props.colour &&
    css`
      background-color: ${ColourLookup[props.colour]};
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height}vh;
    `}
`;
