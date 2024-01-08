const Auth = async () => {
    try {
        if (window.ethereum) {
            const ethereum = window.ethereum;
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            return userAddress;
        } else {
            console.error('MetaMask extension not detected');
            return "";
        }
    } catch (error) {
        console.error('Error requesting accounts:', error);
        return "";
    }
};
  
export  default Auth;
