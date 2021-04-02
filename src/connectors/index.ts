// import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from './NetworkConnector';

const RPC_URL_1 =  'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
			RPC_URL_4 =  'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213';

const RPC_URLS: { [chainId: number]: string } = {
	1: RPC_URL_1,
	4: RPC_URL_4
}

export const network = new NetworkConnector({
	urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
	defaultChainId: 1
})

export const injected = function (chainIds: number[]){
	return new InjectedConnector({
		supportedChainIds: chainIds
	})
}
