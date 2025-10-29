/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router-dom";
import Styles from "./form.module.css";
import { useEffect, useState } from "react";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { loginUser } from "./api";
// using loader to pass the message down

import videoComp from "/video/landingpage-mob.mp4";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const loginLoader = ({ request }) => {
  return new URL(request.url).searchParams.get("message");
};

// choosing the action function does not matter.
// the action function will intercept the request made when submitting the form

// export const loginAction = async ({ request }) => {
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const phone = formData.get("phone");

//   const pathname =
//     new URL(request.url).searchParams.get("redirectTo") || "/trivia";
//   try {
//     const data = await loginUser({ name, phone });
//     localStorage.setItem("user", JSON.stringify(data));

//     // const response = redirect(pathname);
//     // response.body = true;
//     return redirect(pathname);
//   } catch (err) {
//     if (err) {
//       if (err.message.phone !== "") {
//         const MySwal = withReactContent(Swal);
//         MySwal.fire({
//           html: <i>{err.message.phone}</i>,
//           icon: "error",
//         });
//       }

//       if (err.message.name !== "") {
//         const MySwal = withReactContent(Swal);
//         MySwal.fire({
//           html: <i>{err.message.name}</i>,
//           icon: "error",
//         });
//       }

//       if (err.message.validate === "All fields must be filled ") {
//         const MySwal = withReactContent(Swal);
//         MySwal.fire({
//           html: <i>{err.message.validate}</i>,
//           icon: "error",
//         });
//       }

//       if (err.message.played !== "") {
//         const MySwal = withReactContent(Swal);
//         MySwal.fire({
//           html: <i>{err.message.played}</i>,
//           icon: "error",
//         });
//       }

//       // failed to fetch
//       if (
//         !err.message.played &&
//         !err.message.validate &&
//         !err.message.name &&
//         !err.message.phone
//       ) {
//         const MySwal = withReactContent(Swal);
//         MySwal.fire({
//           html: <i>Failed to fetch</i>,
//           icon: "error",
//         });
//       }
//     }
//     return err.message;
//   }
// };

const LoginPage = () => {
  // code for logging status with useNavigation hook
  const [applyClass, setApplyClass] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loginMssgError = useLoaderData();
  // const errorMessage = useActionData();

  function handleStart() {
    navigate("/trivia");
  }

  // Heartbeat animation toggle
  useEffect(() => {
    const interval = setInterval(() => setApplyClass((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loginMssgError) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: <i>{loginMssgError}</i>,
        icon: "error",
      });
    }
  }, [loginMssgError]);

  return (
    <>
      <div className={Styles.login_container}>
        <div className={Styles.details_whiskey}>
          <span className='animate__animated  animate__fadeInLeftBig'>
            Find Your
          </span>
          <span className='animate__animated  animate__fadeInRight'>
            Tequila
          </span>
        </div>

        {/* below instead of using the form we wil use Form from the react router */}
        <div className='row input-field  button-style'>
          <button
            onClick={handleStart}
            className={`${Styles.button} animate__animated ${
              applyClass ? "animate__pulse" : ""
            }`}
            disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting"
              ? "registering..."
              : "Take the quiz"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
