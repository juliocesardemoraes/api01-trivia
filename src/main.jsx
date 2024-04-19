import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/pages/Login";
import Game from "./components/pages/Game";
import Feedback from "./components/pages/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/game",
    element: <Game></Game>,
  },
  {
    path: "/feedback",
    element: <Feedback></Feedback>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
