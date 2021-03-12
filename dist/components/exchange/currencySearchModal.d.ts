import React from 'react';
import { IAssetParam } from "../../helpers";
export declare const CloseIcon: import("styled-components").StyledComponent<React.FC<import("react-feather").IconProps>, any, {
    onClick: () => void;
}, never>;
export declare const SearchInput: import("styled-components").StyledComponent<"input", any, {}, never>;
interface CurrencySearchModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    assetList: IAssetParam[];
    selectedCurrency: string;
    onCurrencySelect: (currency: string) => void;
    handleEnter: (event: any) => void;
    handleInput: (event: any) => void;
}
export default function CurrencySearchModal({ isOpen, onDismiss, assetList, selectedCurrency, onCurrencySelect, handleInput, handleEnter, }: CurrencySearchModalProps): JSX.Element;
export {};
//# sourceMappingURL=currencySearchModal.d.ts.map