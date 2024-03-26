import { useState } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";

const Modal2 = ({ isOpen, setIsOpen, type }) => {
  const navigate = useNavigate();
  const isRegister = type === "register";
  return ReactDom.createPortal(
    <>
      {isOpen ? (
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
                <h1 className="RegisteredContentTop">
                  {isRegister ? "Congratulation!" : "Remember!"}
                </h1>
                <h3 className="RegisteredContent">
                  {isRegister
                    ? "You are successfully registered!"
                    : "You got something to do today!"}
                </h3>
              </div>

              <div className="Modalfooter">
                {isRegister ? (
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    type="button"
                  >
                    Login now
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    type="button"
                  >
                    Confirm
                  </button>
                )}
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
