import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import DashLayout from "./pages/DashLayout";
import CreateProduct from "./pages/CreateProduct";
import Category from "./pages/Category";
import EditProduct from "./pages/EditProduct";
import AddUser from "./pages/AddUser";

const router = createBrowserRouter([
  {
    element: <DashLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/add-new-product',
        element: <CreateProduct />
      },
      {
        path:'/category',
        element:<Category/>
      },
      {
        path:'edit-product/:id',
        element:<EditProduct/>
      },
      {
        path:'add-new-user',
        element:<AddUser/>
      }
    ],
    loader: () => {
      if (!localStorage.getItem('token')) {
        return redirect('/login')
      }

      return null;
    }
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => {
      if (localStorage.getItem('token')) {
        return redirect('/')
      }

      return null;
    }

  },

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
