import {
  RouterProvider,
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Profile from '@/components/Profile';
import Board from '@/components/Board';
import Signup from '@/components/Signup';
import Login from '@/components/Login';
import AddMemberDialog from '@/components/AddMemberDialog';
import RouteProtector from './RouteProtector';
import NotFound from './NotFound';

export enum Routes {
  Home = '/',
  Dashboard = '/Dashboard',
  Profile = '/Profile/:user_id',
  Board = '/Board/:board_id',
  AddMemberToBoard = '/Board/member/:board_id',
  Login = '/Login',
  Signup = '/Signup',
  NotFound = '*',
}

export const AppRoutes: RouteObject[] = [
  { path: Routes.Home, element: <Home /> },
  {
    path: Routes.Dashboard,
    element: (
      <RouteProtector>
        <Dashboard />
      </RouteProtector>
    ),
  },
  {
    path: Routes.Profile,
    element: (
      <RouteProtector>
        <Profile />
      </RouteProtector>
    ),
  },
  {
    path: Routes.Board,
    element: (
      <RouteProtector>
        <Board />
      </RouteProtector>
    ),
  },
  { path: Routes.Signup, element: <Signup /> },
  { path: Routes.Login, element: <Login /> },
  {
    path: Routes.AddMemberToBoard,
    element: (
      <RouteProtector>
        <AddMemberDialog />
      </RouteProtector>
    ),
  },
  {
    path: Routes.NotFound,
    element: <NotFound />,
  },
];

const router = createBrowserRouter(AppRoutes);
export const AppRouter = () => <RouterProvider {...{ router }} />;
