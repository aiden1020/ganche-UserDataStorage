import React, {useState} from 'react'
import { Button } from '@mui/material';
const WalletCard = () => {

	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
        alert(error.message)
			
			});

		} else {
			console.log('Need to install MetaMask');
      alert('Please install MetaMask browser extension to interact')
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount[0]);
	}
   

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
	
	return (
		<div>
			{defaultAccount?<h3>Address: {defaultAccount}</h3>:<Button onClick={connectWalletHandler} variant='contained'>{connButtonText}</Button>
      }
		</div>
	);
}

export default WalletCard;