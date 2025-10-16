import type { RouteObject } from "react-router";
import AboutPage from "~/module/landing/pages/aboutPage";
import HomePage from "~/module/landing/pages/homePage";

export const publicRoutes: RouteObject[] = [
  {
  path: "/",
  element: <HomePage/>,
  children:[
    {path:"",element:<HomePage/>}, 
    {path:"about",element:<AboutPage/>} 
  ],
  }
];