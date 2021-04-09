import React from 'react';
import { IAssetParam } from "../../helpers";
export declare const CloseIcon: import("styled-components").StyledComponent<React.FC<import("react-feather").IconProps>, any, {
    onClick: () => void;
}, never>;
interface CurrencySearchModalProps {
    isOpen: boolean;
    isApply: boolean;
    onDismiss: () => void;
    assetList: IAssetParam[];
    selectedCurrency: string;
    onCurrencySelect: (currency: IAssetParam) => void;
    handleEnter: (event: any) => void;
    handleInput: (event: any) => void;
    handleSearch: () => void;
}
export default function CurrencySearchModal({ isOpen, isApply, onDismiss, assetList, selectedCurrency, onCurrencySelect, handleInput, handleEnter, handleSearch }: CurrencySearchModalProps): JSX.Element;
export {};
//# sourceMappingURL=currencySearchModal.d.ts.map