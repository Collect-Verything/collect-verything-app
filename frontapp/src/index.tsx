import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import {HomePage} from "./home-page";
import {MainLayout} from "./common/component/main-layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "",
                element: <HomePage/>,
            }
        ]
    },
    {
        path: "test",
        element: (
            <div>
                <h1>Hello TEST World</h1>
                <Link to="/">Go Home</Link>
            </div>
        ),
    },
]);

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(<RouterProvider router={router}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
