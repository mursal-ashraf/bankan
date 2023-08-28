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

export enum Routes {
  Home = '/',
  Dashboard = '/Dashboard',
  Profile = '/Profile',
  Board = '/Board/:board_id',
  Login = '/Login',
  Signup = '/Signup',
}

export const AppRoutes: RouteObject[] = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.Dashboard, element: <Dashboard /> },
  { path: Routes.Profile, element: <Profile /> },
  { path: Routes.Board, element: <Board /> },
  { path: Routes.Signup, element: <Signup /> },
  { path: Routes.Login, element: <Login /> },
];

const router = createBrowserRouter(AppRoutes);
export const AppRouter = () => <RouterProvider {...{ router }} />;
