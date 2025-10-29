import {Link} from "react-router-dom"


const PageNotFound = () =>{
    return (
      <>
        <div className="pagenotfound">
          <div className="page_not_found">
            <h2>Oops!</h2>
            <h3>404 - Page Not Found</h3>
            <p>Sorry,the page you are looking for cannot be found!!</p>
            <Link to="/" className="waves-effect waves-light btn">
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
}

export default PageNotFound;