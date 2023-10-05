import { useEffect } from 'react';
import styled from 'styled-components';

export const FormSpacer = styled.div`
  margin: 10px 0;
`;

export const RefreshAlert = () => {
  useEffect(() => {
    const unloadCallback = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  return <div />;
};
