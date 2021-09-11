import React, { useState, useEffect } from 'react' 
import Button from '@material-ui/core/Button';

import axios from 'axios'

import { useWallet, UseWalletProvider } from 'use-wallet'

import './ConnectCard.css'



function ConnectCard () {
  const wallet = useWallet()

  const [isXDAIChain, setXDAIChain] = useState();
  const [existInDB, setExistInDB] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    const chainIdData = {
      jsonrpc: '2.0',
      method: 'eth_chainId',
      params: [],
      id: 0,
    }
    window.ethereum.request(chainIdData).then(res => {
      setXDAIChain(!(res === '0x64'))
    })
  }, []);


  function changeChain() {
    window.ethereum.request({
      id: 1,
      jsonrpc: '2.0',
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x64',
          chainName: 'xDAI Chain',
          rpcUrls: ['https://dai.poa.network'],
          iconUrls: [
            'https://xdaichain.com/fake/example/url/xdai.svg',
            'https://xdaichain.com/fake/example/url/xdai.png',
          ],
          nativeCurrency: {
            name: 'xDAI',
            symbol: 'xDAI',
            decimals: 18,
          },
          blockExplorerUrls: ['https://blockscout.com/poa/xdai/'],
        },
      ],
    })
  }

  window.ethereum.on('chainChanged', (chainId) => setXDAIChain(!(chainId === '0x64')))

  function linkWithMojang (address) {
    let mojangUUid = window.location.hash.replace(/^\/+|\/+$/g, '').substring(2)
    console.log(mojangUUid)
    var hnyBal;
    var plotBal;
    const hnyAddress  = '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9'
    const urlHny = `https://blockscout.com/xdai/mainnet/api?module=account&action=tokenbalance&contractaddress=${hnyAddress}&address=${address}`
    const plotAddress = '0xaa21065406d0b5ec39776b416fe704e6e01bab60'
    const urlPlot = `https://blockscout.com/xdai/mainnet/api?module=account&action=tokenbalance&contractaddress=${plotAddress}&address=${address}`
    
    axios({
      method: 'get',
      url: urlHny,
    })
    .then(res => {
      // Gets the balance as wei
      hnyBal = res.data.result
      
      axios({
        method: 'get',
        url: urlPlot,
      })
      .then(plotRes => {
        plotBal = plotRes.data.result
        axios({
          method: 'post',
          url: 'http://localhost:8082/user',
          data: {
            _id: mojangUUid,
            mojangId: mojangUUid,
            walletAddress: address,
            plotBal: plotBal,
            hnyBal: hnyBal,
          }
        }).then(res => {
          setResponse('Wallet Connected!')
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    })
  }

  function checkIfAlreadyConnected() {
    axios({
      method: 'get',
      url: `http://localhost:8082/user/wallet/${wallet.account}`,
    })
    .then(res => {
      console.log(res)
      console.log('exist')
    })
    .catch(err => {
      setExistInDB(true)
    })
    
  }

  if (!isXDAIChain) {
    console.log(wallet.status)
    if (wallet.status === 'connected') {
      checkIfAlreadyConnected()
      if (existInDB){
        return (
          <div>
            <div>{response}</div>
            {response === 'Wallet Connected!' ? (
              <></>
              )
            : (
              <Button className="button" onClick={() => linkWithMojang(wallet.account)} variant="contained" color="primary">
                Link To Hivecraft
              </Button>
            )}
            
          </div>
        )
      } else {
        console.log(existInDB)
        return (
          <div className="error">
            <p>This wallet is already linked, if you think this is a problem please reach out at our Discord server</p>
          </div>
        )
      }
    } else {
      return (
        <div>
          <div>{response}</div>
          <br />
          <br />
          <Button className="button" onClick={() => wallet.connect()} variant="contained" color="primary">
            Connect Your Wallet
          </Button>
        </div>
      )
    }
  } else {
    return (
      <div>
        <div>{response}</div>
        <br />
        <br />
        <Button className="button" onClick={changeChain} variant="contained" color="secondary">Change to xDai Network</Button>
      </div>
    )
  }
}

export default () => (
  <UseWalletProvider
    chainId={10}
  >
    <ConnectCard />
  </UseWalletProvider>
)