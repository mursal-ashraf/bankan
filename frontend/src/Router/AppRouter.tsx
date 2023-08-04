import {
  RouterProvider,
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Profile from '@/components/Profile';
import Board from '@/components/Board';

export enum Routes {
  Home = '/',
  Dashboard = '/Dashboard',
  Profile = '/Profile',
  Board = '/Board',
}

export const AppRoutes: RouteObject[] = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.Dashboard, element: <Dashboard /> },
  { path: Routes.Profile, element: <Profile /> },
  { path: Routes.Board, element: <Board /> },
];

const router = createBrowserRouter(AppRoutes);
export const AppRouter = () => <RouterProvider {...{ router }} />;
