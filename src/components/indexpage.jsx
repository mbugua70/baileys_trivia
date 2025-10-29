import { Outlet} from "react-router-dom";
import RegistrationPage from "./registration";

const  IndexPage = () =>{

    return(
        <>


      <div className="container">
           <RegistrationPage/>
      </div>

      <Outlet/>
        </>
    )
}

export default IndexPage;