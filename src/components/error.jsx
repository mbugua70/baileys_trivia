import { useRouteError } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const ErrorHandling = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <div className="errorHandling">
        <div className="row">
          <div className="col s12 m12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h2>
                  <ErrorIcon className="icons_error" />
                </h2>
                <span className="card-title">
                  <h1 className="error_message">{error.message}</h1>
                </span>
                <p>
                  <pre className="error_status">
                    {error.status} - {error.statusText}
                  </pre>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorHandling;
