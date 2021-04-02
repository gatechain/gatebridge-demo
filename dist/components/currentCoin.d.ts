import { IPairParam } from "../helpers";
declare const CurrentCoin: ({ current, errorChainId, other, changeNetWork }: {
    current: IPairParam;
    other: IPairParam;
    errorChainId: boolean;
    changeNetWork: (network: IPairParam, changeChainId: number | undefined) => void;
}) => JSX.Element;
export default CurrentCoin;
//# sourceMappingURL=currentCoin.d.ts.map