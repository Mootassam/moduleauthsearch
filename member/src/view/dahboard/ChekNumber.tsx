import React, { useEffect, useState } from "react";
import authAxios from "../../modules/shared/axios/authAxios";
import Header from "@view/layout/Header";
import Message from "@view/shared/message";

function CheckNumber() {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [messagesuccess, setMessage] = useState("");
  const [find, setFind] = useState(false);
  const [showfind, setshowFind] = useState("");

  const SubmitNumber = () => {
    if (!number || number === "0") {
      setError("Write a valid number. Thank you.");
      setShowError(true);
    } else {
      authAxios
        .post("/number/add", { number: number })
        .then((res) => {
          Message.success("Number added with Success");
        })
        .catch((error) => {
          Message.error(error.response.data);
        });
    }
  };

  const handleNumericInputChange = (e) => {
    const inputValue = e.target.value;
    const isValidInput = /^(\|-)?\d*$/g.test(inputValue);
    if (isValidInput) {
      setNumber(inputValue);
    } else {
      setShowError(true);
      setError("Please enter a valid numeric value (only digits allowed).");
    }
  };

  const searchNumber = () => {
    if (!number || number === "0") {
      setError("Write a valid number. Thank you.");

      setShowError(true);
    } else {
      authAxios
        .post("/number/check", { number: number })
        .then((res) => {
          Message.error(
            "Sorry, We couldn’t find the items you are looking for."
          );
        })
        .catch((error) => {
          Message.error(error.response.data);
        });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(false);
      setError("");
      setSuccess(false);
      setFind(false);
      setMessage("");
      setshowFind("");
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [number, showfind, showSuccess]);

  return (
    <div className="app__">
      <Header />
      <div className="search__item">
        <h1 className="search__title">
          Search.<span>PH</span>
        </h1>
        <div className="app__search">
          <div className="pt-10 pb-5">
            <div className="input__search">
              <input
                type="text"
                placeholder="Write the number"
                className="search"
                name="number"
                value={number}
                onChange={handleNumericInputChange}
              />
              <div className="check__group" onClick={() => searchNumber()}>
                <div className="Check">
                  <span className="text__check"> CHECK</span>
                  <i className="fas fa-search "></i>
                </div>
              </div>
            </div>
          </div>

          <div className="valider" onClick={() => SubmitNumber()}>
            <i className="fas fa-plus size"></i>
          </div>
        </div>

        {showError && (
          <>
            <span className="error__message">{error}</span>{" "}
          </>
        )}
        {showSuccess && (
          <span className="success__message">{messagesuccess}</span>
        )}

        {find && <span className="error__message">{showfind}</span>}
      </div>
    </div>
  );
}

export default CheckNumber;
