import NavBar from '@/components/common/navbar';
import React, { ReactNode } from 'react';
import Footer from '..';

interface ComponentContainerProps {
  children: ReactNode;
}

export const ComponentContainer: React.FC<ComponentContainerProps> = ({
  children,
}) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};
