import { ICurrencys, IPairParam } from '../../helpers';
export declare const CAmountBox: import("styled-components").StyledComponent<"div", any, {}, never>;
export default function CurrencyInputAmount({ value, onUserInput, onMax, currencys, pairs, ...rest }: {
    value: string | number;
    onUserInput: (input: string) => void;
    currencys: ICurrencys;
    onMax?: () => void;
    pairs: IPairParam[];
    error?: boolean;
}): JSX.Element;
//# sourceMappingURL=currencyInputAmount.d.ts.map