import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from './components/auth/register'
import Login from "./components/auth/Login"
import Home from './components/home'
import View from './components/viewList'
import Compare from './components/compare'

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'register', element:<Register/>},
    { path: 'login', element: <Login/> },
    { path:'home',element:<Home/>},
    {path:'viewlist',element:<View/>},
    {path:'compare',element:<Compare/>}
]);

export default router;