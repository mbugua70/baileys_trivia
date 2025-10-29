import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SecondaryButton({ children, onClick }) {
  return (
    <button onClick={onClick} className='secondary_button'>
      {children}
      <i class='material-icons'>arrow_forward</i>
    </button>
  );
}

export default SecondaryButton;
