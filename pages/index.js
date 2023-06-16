import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Web3Modal from "web3modal";
import TOKEN_ABI from "../config/Token.json";
import config from "../config/config.json";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [mintValue, setMintValue] = useState("");
  const [burnAddress, setBurnAddress] = useState("");
  const [burnValue, setBurnValue] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [transferValue, setTransferValue] = useState("");

  const ConnectToWallet = async () => {
    try {
      if (!window.ethereum)
        return alert("Install a Wallet like MetaMask to connect");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        alert("Wallet is not connected");
      }
    } catch (error) {
      setError("Wallet is not connected");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return alert("Install a Wallet like MetaMask to connect");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      alert("Successfully Connected to Wallet");
    } catch (error) {
      alert("Error while connecting to Wallet");
      console.log(error);
    }
  };

  const fetchContract = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);

      const { chainId } = await provider.getNetwork();

      const signer = await provider.getSigner();

      const tokenConfig = config[chainId].token;
      const tokenContract = new ethers.Contract(
        tokenConfig.address,
        TOKEN_ABI,
        signer
      );

      return tokenContract;
    } catch (error) {
      console.error(error);

      alert("Error fetching contract");
    }
  };

  const tokenName = async () => {
    const contract = await fetchContract();
    const data = await contract.name();
    setName(data);
  };

  const tokenSymbol = async () => {
    const contract = await fetchContract();
    const data = await contract.symbol();
    setSymbol(data);
  };

  const tokenBalance = async () => {
    const contract = await fetchContract();
    const data = await contract.balanceOf(currentAccount);
    setBalance(parseInt(data));
  };

  const tokenMint = async () => {
    const contract = await fetchContract();
    await contract.mint(mintAddress, mintValue);
    alert("Minted Successfully");
  };

  const tokenBurn = async () => {
    const contract = await fetchContract();
    await contract.burn(burnAddress, burnValue);
    alert("Burn Successfully");
  };

  const tokenTransfer = async () => {
    const contract = await fetchContract();
    await contract.transfer(transferAddress, transferValue);
    alert("Transfer Successfully");
  };

  const handleMintSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Add your custom logic here
    tokenMint();

    // Reset input field values
    setMintAddress("");
    setMintValue("");
  };

  const handleBurnSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Add your custom logic here
    tokenBurn();

    // Reset input field values
    setBurnAddress("");
    setBurnValue("");
  };

  const handleTransferSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Add your custom logic here
    tokenTransfer();

    // Reset input field values
    setTransferAddress("");
    setTransferValue("");
  };

  useEffect(() => {
    const loadBlockhainData = async () => {
      const contract = await fetchContract();
      const nameData = await contract.name();
      const symbolData = await contract.symbol();
      const balanceData = await contract.balanceOf(currentAccount);
      setName(nameData);
      setBalance(parseInt(balanceData));
      setSymbol(symbolData);
    };

    try {
      ConnectToWallet();

      tokenName();
      tokenSymbol();
      if (currentAccount) {
        tokenBalance();
      }
    } catch (error) {
      console.error(error);
    }

    loadBlockhainData();
  });

  return (
    <>
      <Head>
        <title>My Token</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <h1>
            <p>
              <code className={styles.code}>
                {!currentAccount
                  ? "Balance xxxx"
                  : ` Balance ${balance} ${symbol}`}
              </code>
            </p>
          </h1>

          <div>
            {currentAccount == "" ? (
              <button className="btn" role="button" onClick={connectWallet}>
                Connect
              </button>
            ) : (
              <button className="btn" role="button">
                {currentAccount.substring(0, 5) +
                  "..." +
                  currentAccount.substring(
                    currentAccount.length - 5,
                    currentAccount.length
                  )}
              </button>
            )}
          </div>
        </div>

        <div className={styles.center}>
          <h1>Welcome to {!currentAccount ? "" : name}</h1>
        </div>

        <div>
          <div className={styles.grid}>
            <form onSubmit={handleMintSubmit}>
              <h3>Mint Token</h3>

              <label htmlFor="mintAddress">Address </label>
              <input
                type="text"
                id="mintAddress"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                placeholder="Enter text 1"
              />
              <label htmlFor="mintValue">Amount </label>
              <input
                type="number"
                id="mintValue"
                value={mintValue}
                onChange={(e) => setMintValue(e.target.value)}
                placeholder="Enter text 2"
              />
              <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleBurnSubmit}>
              <h3>Burn Token</h3>

              <label htmlFor="burnAddress">Address </label>
              <input
                type="text"
                id="burnAddress"
                value={burnAddress}
                onChange={(e) => setBurnAddress(e.target.value)}
                placeholder="Enter text 1"
              />
              <label htmlFor="burnValue">Amount </label>
              <input
                type="number"
                value={burnValue}
                onChange={(e) => setBurnValue(e.target.value)}
                placeholder="Enter text 2"
              />
              <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleTransferSubmit}>
              <h3>Transfer Token</h3>

              <label htmlFor="transferAddress">Address </label>
              <input
                type="text"
                id="transferAddress"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                placeholder="Enter text 1"
              />
              <label htmlFor="transferValue">Amount </label>
              <input
                type="number"
                id="transferValue"
                value={transferValue}
                onChange={(e) => setTransferValue(e.target.value)}
                placeholder="Enter text 2"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
