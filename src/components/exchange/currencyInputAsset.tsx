import React from 'react';
import styled,{ThemeContext} from 'styled-components';
import { ChevronDown, HelpCircle } from 'react-feather';
import { darken } from 'polished';
import {ICurrencys} from "../../helpers";

const CAssetLayout = styled.div`
  margin: 40px auto;
`;
const EText = styled.div`
	font-size: 14px;
	text-align: left;
	color: ${({ theme }) => theme.text6};
	margin-bottom: 4px;
`;

const InputRow = styled.div<{ selected: boolean }>`
   height: 40px;
   padding: 10px 16px;
	 border-radius: 5px;
	 box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
	 border: 1px solid ${({ theme }) => theme.border2};
	 background: ${({ theme }) => theme.bg1};
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
	onShowCurrentSearch: () => void;
}

export default function CurrencyInputAsset (props: ICurrencyInputAssetProps){
	const {onShowCurrentSearch, currencys: {logo, currency}} = props;
	const theme = React.useContext(ThemeContext);
	return <CAssetLayout>
			    <EText>Asset</EText>
				  <InputRow
					  selected={false}
					  className="open-currency-select-button"
					  onClick={() => {
						  onShowCurrentSearch();
				  }}>
					  <CurrencyBox >
						  {
							  currency ?
								   <>{logo ? <CurrencyLogo src={logo} /> : <HelpCircle size={20} color={theme.text6}/>}
								  <CurrencyLabel> {currency}</CurrencyLabel></> : <Placeholder>select token</Placeholder>
						  }

					  </CurrencyBox>
					  <ChevronDownIcon>
							<ChevronDown size={16} color={theme.text6}/>
					  </ChevronDownIcon>
				  </InputRow>
			</CAssetLayout>;
}

