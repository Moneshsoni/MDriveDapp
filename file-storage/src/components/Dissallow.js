// import { useState } from "react";
const Dissallow = ({ account, contract }) => {
    const disallow = async () => {
        contract.disallow(account);
        console.log("working fine");
      };
    return (
      <>
        <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Dissallow Address"
            ></input>
            <button className="center button" onClick={() => disallow()}>
              Disallow
            </button>
        </div>
      </>
    );
  };
  export default Dissallow;
