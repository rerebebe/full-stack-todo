import { useState } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";

const Modal2 = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return ReactDom.createPortal(
    <>
      {isOpen === true ? (
        <div className="Overlystyle">
          <div className="Modal2">
            <div>
              <div>
                <div>
                  <h5></h5>
                </div>
                <div>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    aria-label="Close"
                    className="X"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <div>
                <h1 className="RegisteredContentTop">Congratulation!</h1>
                <h3 className="RegisteredContent">
                  You are successfully registered!
                </h3>
              </div>

              <div className="Modalfooter">
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  type="button"
                >
                  Login now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("portal")
  );
};

export default Modal2;
