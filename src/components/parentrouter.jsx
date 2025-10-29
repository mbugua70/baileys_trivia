import {RouterProvider}  from "react-router-dom"
import { router } from "./childparentrouter";

const ParentRouter = () =>{
    return(
        <>
         <RouterProvider router={router}/>
        </>
    )
}


export default ParentRouter;