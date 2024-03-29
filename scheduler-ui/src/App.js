import { ConnectWallet,
         useAddress,
         useContract, 
         useContractRead, 
      //   useContractWrite, 
         Web3Button,
       } from "@thirdweb-dev/react";
import "./styles/Home.css";
// import { useContract } from "@thirdweb-dev/react";
import React, {useState} from 'react';



const App = () => {
  const address = useAddress();
  const contractAddress = "0xa8c5e38A632e4543E136C03f47f3BD4B0963E903"
  const {contract} = useContract(contractAddress);
 // const [tasks, setTasks] = useState([]);
  const { data, isLoading } = useContractRead(contract, "getTask")
  const [input, setInput] = useState('');
// const { mutateAsync: addTask} = useContractWrite(contract)

  return(

    <div className="container">
    <div className="upp">
    <h2 className="title">The Scheduler</h2>
    <marquee><b>ATTENTION</b>!: To use this app, ensure that you're connecting with Goerli testnet wallet. THANKS!</marquee>

    </div>
    {address ? (
      <>
        <div>
          <input
            className="ipt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a Schedule and click 'Add' button below."
          />

          <Web3Button
            className="btn"
            contractAddress={contractAddress}
            action={(contract) => {
              contract.call("addTask", input)}}
          >
            Add
          </Web3Button>
        </div>

        <div>
          {isLoading ? (
            "Loading..."
          ) : (
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {item}
                  <Web3Button
                    className="btn"
                    contractAddress={contractAddress}
                    action={(contract) => contract.call("removeTask", index)}
                  >
                    Remove
                  </Web3Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    ) : (
     <ConnectWallet className="connect" colorMode="light" />
    
    )}
  <div className='footer'>
    <footer>Developed By O-Abdullahi || Powered By Grandida LLC</footer>
  </div>
  </div>
  );
}

export default App;