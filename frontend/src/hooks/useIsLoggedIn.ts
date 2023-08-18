import useUser from './useUser';

const useIsLoggedIn = () => {
  const user = useUser();

  return user?.role === 'authenticated';
};

export default useIsLoggedIn;
