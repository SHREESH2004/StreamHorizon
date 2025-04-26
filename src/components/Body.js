import React from 'react'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import Register from './Register';
import Subscription from './subscription';
import AdminUpload from './AdminUpload';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/browse",
            element:<Browse/>
        },
        {
            path:"/subscription",
            element:<Subscription/>
        },
        {
            path:"/admin",
            element:<AdminUpload/>
        },
    ])
    return (
        <div>
<RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body
