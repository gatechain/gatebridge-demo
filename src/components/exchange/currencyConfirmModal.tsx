import React from 'react';
import Modal from '../modal';
import Column, {PaddedColumn} from '../column';
import {RowBetween} from "../row";
import styled, {ThemeContext} from "styled-components";
import {X, HelpCircle, ArrowRight} from "react-feather";
import {ICurrencys, IPairParam} from "../../helpers";
import {ButtonPrimary} from '../button';
import Loader from "../loader";
import {I18nContext} from "../../providers";

const CText = styled.p`
	font-weight: 400;
	font-size: 16px;
	color: ${({ theme }) => theme.text6};
`;

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`
const CurrencyInfos = styled.div`
		padding: 0 20px;
`;
const CurrencyAmountBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const CurrencyLogo = styled.img`
	width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
`;

const CurrencyPairLogo = styled.img`
	width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
`;

const CurrencyAmount = styled.div`
  margin-left: 5px;
  font-size: 15px;
	color: ${({ theme }) => theme.text6};
`;

const CurrencyTransaction = styled.div`
	 width: 100%;
	 height: 90px;
	 padding: 16px 20px;
	 box-sizing: border-box;
	 border-radius: 4px;
	 background: ${({ theme }) => theme.bg8};
	 color: ${({ theme }) => theme.text6};
	 margin-top: 20px;
	 display: flex;
	 flex-direction: row;
`;
const CTransactionFrom = styled.div`
	 flex: 1;
`;
const CTransactionIcon = styled.div`
	 flex:  0 0 60px;
	 width: 60px;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 margin-top: 16px;
`;
const CTransactionTo = styled.div`
	 flex: 1;
`;
const CTransactionText = styled.div`
	font-size: 13px;
	color: ${({ theme }) => theme.text2};
`;
const CTransactionBox = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.text2};
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`;
const CTransactionAddress = styled.div`
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const CTransactionFee =  styled.div`
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg4};
`;

export default function CurrencyConfirmModal({isOpen, onDismissConfirmModal,onConfirmDeposit, receiveInfos,pairs,confirmPending}:{isOpen:boolean,confirmPending: boolean,onDismissConfirmModal: () => void,onConfirmDeposit: () => void,receiveInfos: ICurrencys,pairs:IPairParam[]}) {
	const theme = React.useContext(ThemeContext);
	const $i18n = React.useContext<any>(I18nContext);
	const {logo,amount,currency, account, fee} = receiveInfos;
	const destinationAddress = account.slice(0, 8) + '...' + account.slice(-8);
	return (
		<Modal isOpen={isOpen}  onDismiss={onDismissConfirmModal} maxHeight={90}>
			<Column style={{ width: '100%', flex: '1 1' }}>
				<PaddedColumn gap="14px">
					<RowBetween>
						<CText>{$i18n['receive1']}</CText>
						<CloseIcon onClick={onDismissConfirmModal} color={theme.text6}/>
					</RowBetween>
				</PaddedColumn>
				<CurrencyInfos>
					<CurrencyAmountBox>
						{logo ? <CurrencyLogo src={logo} />: <HelpCircle size={22} color={theme.text6}/>}
						<CurrencyAmount>{amount.toLocaleString()} {currency}</CurrencyAmount>
					</CurrencyAmountBox>
					<CurrencyTransaction>
						 <CTransactionFrom>
							 <CTransactionText>
								 {$i18n['from']}
							 </CTransactionText>
							 <CTransactionBox>
								 {
									 pairs[0]['logo'] ? <CurrencyPairLogo src={pairs[0]['logo']} /> : <HelpCircle size={22} color={theme.text6}/>
								 }
								 <span style={{marginLeft: '5px'}}>{ pairs[0]['name']} Network</span>
							 </CTransactionBox>
						 </CTransactionFrom>
					 	 <CTransactionIcon>
								<ArrowRight size={15} color={theme.text2}/>
						 </CTransactionIcon>
						<CTransactionTo>
							<CTransactionText>
								{$i18n['to']}
							</CTransactionText>
							<CTransactionBox>
								{
									pairs[1]['logo'] ? <CurrencyPairLogo src={pairs[1]['logo']} /> : <HelpCircle size={22} color={theme.text6}/>
								}
								<span style={{marginLeft: '5px'}}>{ pairs[1]['name']} Network</span>
							</CTransactionBox>
						</CTransactionTo>
					</CurrencyTransaction>
					<CTransactionAddress>
						  <CTransactionText>
							  {$i18n['destination']}
							  <br/>
							  ({ pairs[1]['name']} Network)
						  </CTransactionText>
						  <CTransactionText>
							  {destinationAddress}
						  </CTransactionText>
					</CTransactionAddress>
					<Separator />
					<CTransactionFee>
						<CTransactionText>
							{$i18n['fee']}
						</CTransactionText>
						<CTransactionText>
							{fee} {pairs[0]['symbol']}
						</CTransactionText>
					</CTransactionFee>
				</CurrencyInfos>
				<ButtonPrimary onClick={onConfirmDeposit} disabled={confirmPending}>
					<span style={{marginRight: '5px'}}>	{$i18n['confirm']}</span>
					{confirmPending ? <Loader /> : null}
				</ButtonPrimary>
			</Column>
		</Modal>
	)
}