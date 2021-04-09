import React from 'react';
import styled, {ThemeContext} from "styled-components";
import Modal from '../modal';
import Column, {PaddedColumn} from '../column';
import {IAssetParam} from "../../helpers";
import {RowBetween, MenuItem} from '../row';
import {HelpCircle, X, Search} from 'react-feather';
import {ConfigContext, I18nContext} from '../../providers';

const CText = styled.p`
	font-weight: 500;
	font-size: 16px;
	color: ${({ theme }) => theme.text6};
`;

export const CloseIcon = styled(X)<{ onClick: () => void }>`
  cursor: pointer;
`
const SearchBox = styled.div`
	 position:relative;
`;
const SearchInput = styled.input`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  display: flex;
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
   padding: 16px 35px 16px 16px ;
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
const SearchIcon = styled.div`
 position: absolute;
 right: 14px;
 top: 15px;
 cursor: pointer;
`;
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
	isApply: boolean,
	onDismiss: () => void;
	assetList: IAssetParam[];
	selectedCurrency: string;
	onCurrencySelect: (currency: IAssetParam) => void,
	handleEnter: (event: any) => void,
	handleInput: (event: any) => void,
	handleSearch: () => void
}

const CurrencyList = function (
	{
	  currencies,
		selectedCurrency,
		onCurrencySelect,
		isApply
	} : {
	currencies: IAssetParam[], selectedCurrency: string,onCurrencySelect: (currency: IAssetParam) => void, isApply: boolean
}) {
	const {assetApplyLink} = React.useContext<any>(ConfigContext);
	const $i18n = React.useContext<any>(I18nContext);
	const renderDom = currencies.map((item, index) => {
		const address = item.address;
		const logo = item.logo;
		const isSelected = Boolean(address === selectedCurrency);
		const theme = React.useContext(ThemeContext);
		return <MenuItem key={index}  disabled={isSelected}  onClick={() => (!isSelected ? onCurrencySelect(item) : null)}>
			{logo ? <CurrencyLogo src={logo} /> : <HelpCircle size={24} color={theme.text6}/>}
			<CurrencyName>{item.name}</CurrencyName>
			<CurrencyAddress>{item.address.slice(0, 8) + '...' + item.address.slice(-8)}</CurrencyAddress>
		</MenuItem>
	})
	return (
		<CurrencyListBox>
				{ currencies.length ? renderDom : null}
			  {
				  isApply ? <ApplyText>
					  {$i18n['supported1']}
					  <Alink href={assetApplyLink} target="_blank">{$i18n['click']}</Alink>
					  {$i18n['supported2']}
				  </ApplyText> : null
			  }

		</CurrencyListBox>
	)
}


export default function CurrencySearchModal({
    isOpen,
	  isApply,
    onDismiss,
	  assetList,
	  selectedCurrency,
    onCurrencySelect,
	  handleInput,
	  handleEnter,
	  handleSearch
   }: CurrencySearchModalProps) {
	const theme = React.useContext(ThemeContext);
	const $i18n = React.useContext<any>(I18nContext);
	return (
		<Modal isOpen={isOpen}  onDismiss={onDismiss} maxHeight={90}>
			<Column style={{ width: '100%', flex: '1 1' }}>
				<PaddedColumn gap="14px">
					 <RowBetween>
						 <CText>{$i18n['selectToken']}</CText>
						 <CloseIcon onClick={onDismiss} color={theme.text6}/>
					 </RowBetween>
					<SearchBox>
						<SearchInput
							type="text"
							id="token-search-input"
							placeholder={$i18n['search']}
							onChange={handleInput}
							onKeyDown={handleEnter}
						/>
						<SearchIcon onClick={handleSearch}>
							<Search color={theme.text6} size={19} />
						</SearchIcon>
					</SearchBox>

				</PaddedColumn>
				<Separator />

				<div style={{ flex: '1 1 auto' }}>
					<CurrencyList currencies={assetList} selectedCurrency={selectedCurrency} onCurrencySelect={onCurrencySelect} isApply={isApply} />
				</div>
			</Column>
		</Modal>
	)
}
