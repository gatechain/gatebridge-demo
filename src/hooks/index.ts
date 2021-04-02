import {useState, useEffect} from "react";
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '@uniswap/sdk';
import { injected } from '../connectors'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import * as React from "react";
import {ConfigContext} from "../providers";
// import { NetworkContextName } from '../constants'


export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
	const context = useWeb3ReactCore<Web3Provider>();
	return context;
}


export function useEagerConnect() {
	const { activate, active } = useWeb3ReactCore()
	const {supportedChainIds} = React.useContext<any>(ConfigContext);

	const [tried, setTried] = useState(false)

	useEffect(() => {
		injected(supportedChainIds).isAuthorized().then((isAuthorized: boolean) => {
			if (isAuthorized) {
				activate(injected(supportedChainIds), undefined, true).catch(() => {
					setTried(true)
				})
			} else {
				setTried(true)
			}
		})
	}, []) // intentionally only running on mount (make sure it's only mounted once :))

	// if the connection worked, wait until we get confirmation of that to flip the flag
	useEffect(() => {
		if (!tried && active) {
			setTried(true)
		}
	}, [tried, active])

	return tried
}

export function useInactiveListener(suppress: boolean = false) {
	const { active, error, activate } = useWeb3ReactCore();
	const {supportedChainIds} = React.useContext<any>(ConfigContext);

	useEffect((): any => {
		const { ethereum } = window as any
		if (ethereum && ethereum.on && !active && !error && !suppress) {
			const handleConnect = () => {
				console.log("Handling 'connect' event")
				activate(injected(supportedChainIds))
			}
			const handleChainChanged = (chainId: string | number) => {
				console.log("Handling 'chainChanged' event with payload", chainId)
				activate(injected(supportedChainIds))
			}
			const handleAccountsChanged = (accounts: string[]) => {
				console.log("Handling 'accountsChanged' event with payload", accounts)
				if (accounts.length > 0) {
					activate(injected(supportedChainIds))
				}
			}
			const handleNetworkChanged = (networkId: string | number) => {
				console.log("Handling 'networkChanged' event with payload", networkId)
				activate(injected(supportedChainIds))
			}

			ethereum.on('connect', handleConnect)
			ethereum.on('chainChanged', handleChainChanged)
			ethereum.on('accountsChanged', handleAccountsChanged)
			ethereum.on('networkChanged', handleNetworkChanged)

			return () => {
				if (ethereum.removeListener) {
					ethereum.removeListener('connect', handleConnect)
					ethereum.removeListener('chainChanged', handleChainChanged)
					ethereum.removeListener('accountsChanged', handleAccountsChanged)
					ethereum.removeListener('networkChanged', handleNetworkChanged)
				}
			}
		}
	}, [active, error, suppress, activate])
}

