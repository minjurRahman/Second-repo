import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTasks from "../../Pages/AddTasks/AddTasks";
import CompleteTasks from "../../Pages/CompleteTasks/CompleteTasks";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
// import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyTasks from "../../Pages/MyTasks/MyTasks";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addTasks',
                element: <PrivateRoutes><AddTasks></AddTasks></PrivateRoutes>
            },
            {
                path: '/myTasks',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>
            },
            {
                path: '/completeTasks',
                element: <PrivateRoutes><CompleteTasks></CompleteTasks></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]
    }
])