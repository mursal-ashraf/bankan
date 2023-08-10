import styled, { css } from "styled-components";

const colourLookup: { [key: string]: string } = {
  yellow: "#ffcd29",
};

type TileColour = "yellow" | "blue" | "white";

export const Tile = styled.div<{ colour?: TileColour; height?: number }>`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;

  ${(props) =>
    props.colour &&
    css`
      background-color: ${colourLookup[props.colour]};
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height}vh;
    `}
`;
