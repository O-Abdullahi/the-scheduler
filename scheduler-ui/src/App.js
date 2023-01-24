import { ConnectWallet,
         useAddress,
         useContract, 
         useContractRead, 
      //   useContractWrite, 
         Web3Button,
       } from "@thirdweb-dev/react";
import "./styles/Home.css";
// import { useContract } from "@thirdweb-dev/react";
import React, {useState, useEffect} from 'react';



const App = () => {
  const address = useAddress();
  const contractAddress = "0xa8c5e38A632e4543E136C03f47f3BD4B0963E903"
  const {contract} = useContract(contractAddress);
 // const [tasks, setTasks] = useState([]);
  const { data, isLoading } = useContractRead(contract, "getTask")
  const [input, setInput] = useState('');
// const { mutateAsync: addTask} = useContractWrite(contract)
// const { data, isLoading } = useContractData(contract, "getTodo");



  // useEffect(() => {
  //     // Fetch tasks from backend
  // }, [])

  return(
    <div>
    <div>
    <h2 ClassName="title">The Scheduler</h2>

    </div>
    {address ? (
      <>
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a Schedule"
          />

          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => {
              contract.call("addTask", input)}}
            accentColor="#1ce"
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
                    contractAddress={contractAddress}
                    action={(contract) => contract.call("removeTask", index)}
                    accentColor="#1ce"
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
     <ConnectWallet accentColor="#1ce" colorMode="light" />
    
    )}
  <div>
    <footer ClassName="footer">Powered By Grandida LLC</footer>
  </div>
  </div>
  );
}

export default App;