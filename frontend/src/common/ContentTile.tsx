import styled, { css } from "styled-components";

export const colourLookup: { [key: string]: string } = {
  yellow: "#ffcd29",
  orange: "#f5754f",
};

export type GeneralColour = "yellow" | "blue" | "white" | "orange";

export const Tile = styled.div<{ colour?: GeneralColour; height?: number }>`
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
