import { Outlet } from "react-router-dom";




const Layout = () => {
    return (
        <>
        <div className="body_background">
        {/* <h1>This is a layout page.</h1> */}
        <Outlet/>
        </div>

        </>
     );
}

export default Layout;