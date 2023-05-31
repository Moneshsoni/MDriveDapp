import "./Dissallow.css";
import "./Modal.css";
const Dissallow = ({ contract }) => {
   
    const disallow = async () => {
        
        const address = document.querySelector("#selectaddress").value;
        try {
            if (address) {
              await contract.disallow(address);

            }else{
                alert("Please enter the address to disallow");
            }
          } catch (e) {
            alert("You don't have put address",e);
          }
      };
    return (
      <>    
        <input id = "selectaddress"
            type="text"
            className="address"
            placeholder="Enter Dissallow Address"
        ></input>
        <button  className="center button" onClick={() => disallow()}>Disallow
            </button>
      </>
    );
  };
  export default Dissallow;
