import React from 'react';
import { ICurrencys, IPairParam } from "../../helpers";
export declare const CloseIcon: import("styled-components").StyledComponent<React.FC<import("react-feather").IconProps>, any, {
    onClick: () => void;
}, never>;
export default function CurrencyConfirmModal({ isOpen, onDismissConfirmModal, onConfirmDeposit, receiveInfos, pairs, confirmPending }: {
    isOpen: boolean;
    confirmPending: boolean;
    onDismissConfirmModal: () => void;
    onConfirmDeposit: () => void;
    receiveInfos: ICurrencys;
    pairs: IPairParam[];
}): JSX.Element;
//# sourceMappingURL=currencyConfirmModal.d.ts.map