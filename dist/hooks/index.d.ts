import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '@uniswap/sdk';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
export declare function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
    chainId?: ChainId;
};
export declare function useEagerConnect(): boolean;
export declare function useInactiveListener(suppress?: boolean): void;
//# sourceMappingURL=index.d.ts.map