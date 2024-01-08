import React, { useState, useEffect } from "react";
import Web3 from "web3";
import UserDataStorage from "./contracts/UserDataStorage.json";

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userExists, setUserExists] = useState(true);
  const [name, setName] = useState("--");
  const [email, setEmail] = useState("--");
  const [noti,setNoti] =useState("");
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Connect to the local blockchain
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        // Get the network ID and deployed contract instance
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = UserDataStorage.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          UserDataStorage.abi,
          deployedNetwork.address
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting to blockchain:", error);
      }
    };

    initWeb3();
  }, []);

  const handleCheckUser = async () => {
    try {
      const user = await contract.methods.getUserData(userAddress).call();
      if (user.name !== "") {
        // User exists, update state with user data
        setUserExists(true);
        setName(user.name);
        setEmail(user.email);
        setNoti("")
      } else {
        // User does not exist, reset state
        setUserExists(false);
        setName("");
        setEmail("");
        setNoti("查無資料");
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleRegisterUser = async () => {
    try {
      // Perform user registration on the blockchain
      await contract.methods.addUser(name, email).send({ from: userAddress });

      // Update state to reflect user registration
      setUserExists(true);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <p>這裡實現一個簡單的區塊鏈技術的註冊系統</p>
      <p>{noti}</p>
      <label>
        以太地址:
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
      </label>
      <button onClick={handleCheckUser}>Enter</button>

      {userExists ? (
        <div>
          
          <p>名稱: {name}</p>
          <p>電郵: {email}</p>
        </div>
      ) : (
        <div>
          <label>
            Enter Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Enter Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button onClick={handleRegisterUser}>Register User</button>
        </div>
      )}
    </div>
  );
};

export default Home;
