import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState,useEffect} from "react";
import { ethers} from "ethers";
import FileUpload from "./components/FileUpload.js";
import Modal from "./components/Modal.js";
import Display from "./components/Display.js";
import Dissallow from "./components/Dissallow.js";

function App() {
  const [account,setAccount] = useState("");
  const [contract,setContract]=useState(null);
  const [provider,setProvider] = useState(null);
  const [modelOpen,setModalOpen ] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", ()=>{
          window.location.reload();
        });
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x09E90b4d63D3E5d1cEd2cD072699Bf2E2d1391e4";
        const contract = new ethers.Contract(contractAddress,Upload.abi,signer);
        // console.log("Contract",contract);
        setContract(contract);
        setProvider(provider);
    }else{
      alert("Metamask is not Installed");
    } 
    }

    provider && loadProvider()
  })
  return (
    <>
    {!modelOpen && (<button className="share" onClick={()=> setModalOpen(true)}>Share</button>)} {""}
    
    {modelOpen &&(<Modal setModalOpen={setModalOpen} contract = {contract} ></Modal>)}
    <div className="App">
      <h1 style={{ color: "white" }}>Mdrive WEB3.0</h1>
      <h1 style={{ color: "blue" }}>Welcome to Decentralize File storage systems</h1>
      <div class = "bg"></div>
      <div class = "bg bg2"></div>
      <div class = "bg bg3"></div>
      
      <p>Account : {account ? account:"Not connected"}</p>
      <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
      <Display contract={contract} account={account}></Display>
      <Dissallow contract = {contract} account = {account}></Dissallow>
    </div>
    </>
  );
}

export default App;
 