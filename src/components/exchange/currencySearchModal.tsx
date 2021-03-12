import React from 'react';
import styled, {ThemeContext} from "styled-components";
import Modal from '../modal';
import Column, {PaddedColumn} from '../column';
import {IAssetParam} from "../../helpers";
import {RowBetween, MenuItem} from '../row';
import {HelpCircle, X} from 'react-feather';
import {ConfigContext} from '../../providers';

const CText = styled.p`
	font-weight: 500;
	font-size: 16px;
	color: ${({ theme }) => theme.text6};
`;

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;
  font-size: 16px;
  transition: border 100ms;
  ::placeholder {
    font-weight: 300!important;
    font-size: 16px!important;
    color: ${({ theme }) => theme.text3};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary8};
    outline: none;
  }
`

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg4};
`;
const CurrencyListBox = styled.div`
  height: 300px;
	overflow: scroll;
`;
const CurrencyLogo = styled.img`
	width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
`;
const CurrencyName = styled.p`
  font-weight: 500;
  font-size: 15px;
	color: ${({ theme }) => theme.text6};
`;
const CurrencyAddress = styled.p`
  font-size: 13px;
	color: ${({ theme }) => theme.text6};
`;
const ApplyText = styled.div`
  color: ${({ theme }) => theme.text6};
  text-align: center;
  margin-top: 60px;
  user-select: none;
`
const Alink = styled.a`
  cursor: pointer;
  text-decoration:underline;
  color: ${({ theme }) => theme.text8};
`
interface CurrencySearchModalProps {
	isOpen: boolean;
	onDismiss: () => void;
	assetList: IAssetParam[];
	selectedCurrency: string;
	onCurrencySelect: (currency: string) => void,
	handleEnter: (event: any) => void,
	handleInput: (event: any) => void,
}

const CurrencyList = function (
	{
	  currencies,
		selectedCurrency,
		onCurrencySelect,
	} : {
	currencies: IAssetParam[], selectedCurrency: string,onCurrencySelect: (address: string) => void
}) {
	const {assetApplyLink} = React.useContext<any>(ConfigContext);
	const renderDom = currencies.map((item, index) => {
		const address = item.address;
		const logo = item.logo;
		const isSelected = Boolean(address === selectedCurrency);
		const theme = React.useContext(ThemeContext);

		return <MenuItem key={index}  disabled={isSelected}  onClick={() => (!isSelected ? onCurrencySelect(item.address) : null)}>
			{logo ? <CurrencyLogo src={logo} /> : <HelpCircle size={24} color={theme.text6}/>}
			<CurrencyName>{item.name}</CurrencyName>
			<CurrencyAddress>{item.address.slice(0, 8) + '...' + item.address.slice(-8)}</CurrencyAddress>
		</MenuItem>
	})
	return (
		<CurrencyListBox>
			<div>{ currencies.length ? renderDom : <ApplyText>this asset is not supported, <Alink href={assetApplyLink} target="_blank">click here</Alink> to apply</ApplyText>}</div>
		</CurrencyListBox>
	)
}


export default function CurrencySearchModal({
    isOpen,
    onDismiss,
	  assetList,
	  selectedCurrency,
    onCurrencySelect,
	  handleInput,
	  handleEnter,
   }: CurrencySearchModalProps) {
	const theme = React.useContext(ThemeContext);
	return (
		<Modal isOpen={isOpen}  onDismiss={onDismiss} maxHeight={90}>
			<Column style={{ width: '100%', flex: '1 1' }}>
				<PaddedColumn gap="14px">
					 <RowBetween>
						 <CText> Select a token</CText>
						 <CloseIcon onClick={onDismiss} color={theme.text6}/>
					 </RowBetween>

					<SearchInput
						type="text"
						id="token-search-input"
						placeholder="Search name or paste address"
						onChange={handleInput}
						onKeyDown={handleEnter}
					/>
				</PaddedColumn>
				<Separator />

				<div style={{ flex: '1 1 auto' }}>
					<CurrencyList currencies={assetList} selectedCurrency={selectedCurrency} onCurrencySelect={onCurrencySelect}/>
				</div>
			</Column>
		</Modal>
	)
}
