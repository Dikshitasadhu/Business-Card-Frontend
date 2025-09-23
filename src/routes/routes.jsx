import { createBrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from '../layout/PrivateRoute';
import PublicRoute from '../layout/PublicRoute';

// Import your pages including HomePage
import HomePage from '../pages/HomePage';
import CardCreate from '../pages/CardCreate';
import CardView from '../pages/CardView';
import CardEdit from '../pages/CardEdit';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyCardsPage from '../pages/MyCardsPage';
import CardDelete from '../pages/CardDelete';
import VerifyOtp from '../pages/VerifyOtp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { index: true, element: <HomePage /> },  // Show HomePage at "/"
      { path: 'card/create', element: <CardCreate /> },
      { path: 'card/:id/view', element: <CardView /> },
      { path: 'card/:id/edit', element: <CardEdit /> },
      { path: "/mycards", element: <MyCardsPage />},
      {path: "card/:id/delete", element: <CardDelete />},
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: 'verify-otp', element: <VerifyOtp /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
