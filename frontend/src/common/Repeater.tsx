import styled, { css } from "styled-components";
import { GeneralColour, colourLookup } from "./ContentTile";

export const CornerIcon = styled.div<{ colour: GeneralColour }>`
  ${(props) =>
    css`
      background-color: ${colourLookup[props.colour]};
    `}
  color: white;
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right: -10px;
  top: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

interface RepeaterProps<T> {
  Component: React.FC<T>;
  feedList: T[];
  IconRight?: { icon: JSX.Element; colour: GeneralColour };
}

export function Repeater<T>({
  Component,
  feedList,
  IconRight,
}: RepeaterProps<T>) {
  return (
    <div className="flex flex-col w-full my-3 overflow-y-auto">
      {feedList.map((item) => (
        <div className="flex w-full my-3 justify-center">
          <div className="relative w-11/12">
            <CornerIcon colour={IconRight?.colour || "blue"}>
              {IconRight?.icon}
            </CornerIcon>
            <Component {...(item as T & JSX.IntrinsicAttributes)} />
          </div>
        </div>
      ))}
    </div>
  );
}
