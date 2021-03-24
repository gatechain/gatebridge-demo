import React from 'react';
import styled,{ThemeContext} from 'styled-components';
import { ChevronDown, HelpCircle } from 'react-feather';
import { darken } from 'polished';
import {ICurrencys} from "../../helpers";
import {I18nContext} from '../../providers';

const CAssetLayout = styled.div`
  margin: 40px auto;
`;
const EText = styled.div`
	font-size: 14px;
	text-align: left;
	color: ${({ theme }) => theme.text6};
	margin-bottom: 4px;
`;

const InputRow = styled.div<{ selected: boolean, disabled: boolean }>`
   height: 40px;
   padding: 10px 16px;
	 border-radius: 5px;
	 box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
	 border: 1px solid ${({ theme }) => theme.border2};
	 background: ${({ disabled, theme }) => disabled ? darken(0.05, theme.primary1) : theme.bg1};
	 box-sizing: border-box;
	 cursor: pointer;
	 display: flex;
	 flex-direction: row;
	 align-items: center;
	 justify-content: space-between;
	 :focus,
	 :hover {
	    background-color: ${({ selected, theme }) => (selected ? theme.bg3 : darken(0.05, theme.primary1))};
	 }
`;
const CurrencyBox = styled.div`
	display: flex;
	align-items: center;
`;
const CurrencyLogo = styled.img`
	width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
`;

const CurrencyLabel = styled.span`
  font-weight: 300;
	color: ${({ theme }) => theme.text6};
	margin-left: 8px;

`;
const CurrencyAddress = styled.span`
  font-size: 13px;
  font-weight: 300;
	color: ${({ theme }) => theme.text7};
	margin-left: 20px;
`;
const ChevronDownIcon = styled.div`
		display: flex;
		align-items: center;
`;

const Placeholder = styled.div`
    font-size: 13px;
    font-weight: 300;
		color: ${({ theme }) => theme.text3};
`;

interface ICurrencyInputAssetProps {
	currencys: ICurrencys,
	onShowCurrentSearch: any,
	noMatch: boolean
}

export default function CurrencyInputAsset (props: ICurrencyInputAssetProps){
	const {onShowCurrentSearch, currencys: {logo, currency, tokenAddress}, noMatch} = props;
	const theme = React.useContext(ThemeContext);
	const $i18n = React.useContext<any>(I18nContext);
	return <CAssetLayout>
			    <EText>{$i18n['asset']}</EText>
				  <InputRow
					  disabled={noMatch}
					  selected={false}
					  className="open-currency-select-button"
					  onClick={() => {
					  	!noMatch && onShowCurrentSearch();
				  }}>
					  <CurrencyBox >
						  {
							  currency ?
								   <>{logo ? <CurrencyLogo src={logo} /> : <HelpCircle size={20} color={theme.text6}/>}
								  <CurrencyLabel> {currency}</CurrencyLabel> <CurrencyAddress>({tokenAddress.slice(0,8) + '...' + tokenAddress.slice(-8)})</CurrencyAddress> </> : <Placeholder>{$i18n['selectToken']}</Placeholder>
						  }

					  </CurrencyBox>
					  <ChevronDownIcon>
							<ChevronDown size={16} color={theme.text6}/>
					  </ChevronDownIcon>
				  </InputRow>
			</CAssetLayout>;
}

