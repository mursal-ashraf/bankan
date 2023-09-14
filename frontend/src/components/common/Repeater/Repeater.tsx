import styled, { css } from 'styled-components';
import { Alert, IconButton } from '@mui/material';
import { useState } from 'react';
import AlertModal from '../AlertModal';
import { ColourLookup } from '../../../utils/common-utils';

export const CornerIcon = styled.div<{ colour: GeneralColour }>`
  ${(props) => css`
    background-color: ${ColourLookup[props.colour]};
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
  defaultMsg?: string;
  ActionIcon?: {
    icon: JSX.Element;
    colour: GeneralColour;
    onClick?: (item: T) => void;
    actionModal?: string;
  };
}
/**
 * @param Component: the component to be repeated
 * @param feedList: the list of information you want to map over & render the component with. Type of each element in this list must match component prop type
 * @param defaultMsg: msg to show if no elements to be rendered
 * @param ActionIcon: icon and its colour -> to show at top right of each rendered repeating element... optionally define on click action for it & whether to show a warning upon performing this action
 */
export function Repeater<T>({
  Component,
  feedList,
  defaultMsg,
  ActionIcon,
}: RepeaterProps<T>) {
  const [modalItem, setModalWithItem] = useState<T | null>(null);

  const modalAccept = () => {
    ActionIcon?.onClick && modalItem && ActionIcon.onClick(modalItem);
    setModalWithItem(null);
  };

  const modalDecline = () => {
    setModalWithItem(null);
  };

  return (
    <div className="flex flex-col w-full my-3 overflow-y-auto">
      {modalItem && (
        <AlertModal
          title="Warning"
          accept={{ text: 'Yes', action: modalAccept }}
          decline={{ text: 'No', action: modalDecline }}
        >
          <>
            {ActionIcon?.actionModal ||
              'Are you sure you want to delete this item?'}
          </>
        </AlertModal>
      )}
      {!feedList.length && (
        <Alert className="mx-5" severity="info">
          {defaultMsg || 'No items exist... try adding some'}
        </Alert>
      )}
      {feedList.map((item, idx) => (
        <div key={idx} className="flex w-full my-3 justify-center">
          <div className="relative w-11/12">
            <CornerIcon colour={ActionIcon?.colour || 'blue'}>
              <IconButton
                onClick={() => {
                  ActionIcon?.actionModal
                    ? setModalWithItem(item)
                    : ActionIcon?.onClick && ActionIcon.onClick(item);
                }}
              >
                {ActionIcon?.icon}
              </IconButton>
            </CornerIcon>
            <Component {...(item as T & JSX.IntrinsicAttributes)} />
          </div>
        </div>
      ))}
    </div>
  );
}
