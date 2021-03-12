import React from 'react';
import styled, {ThemeContext} from "styled-components";
import {RowBetween} from '../row';
import { darken } from 'polished'
import {escapeRegExp, ICurrencys} from '../../helpers';
import {HelpCircle} from "react-feather";

const CAmountLayout = styled.div`
  margin-bottom: 40px;
`;
const EText = styled.div`
	font-size: 14px;
	text-align: left;
	color: ${({ theme }) => theme.text6};
	margin-bottom: 4px;
`;

const CAvaliavle = styled.div`
	font-size: 11px;
	color: ${({ theme }) => theme.text7};
`;

export const CAmountBox = styled.div`
  width: 100%;
	height: 80px;
	padding: 20px 16px;
	box-sizing: border-box;
  box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
	border: 1px solid ${({ theme }) => theme.border2};
	background: ${({ theme }) => theme.bg1};
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const CAmountInput = styled.input<{ error?: boolean }>`
   height: 40px;
   width: 80%;
	 box-shadow: none;
	 border: none;
	 background: transparent;
	 box-sizing: border-box;
	 font-size: 28px;
	 color: ${({ error, theme }) => (error ? theme.red1 : theme.text6)};
	 :focus,
	 :hover {
	   border: none;
	   outline: none;
	 }
`;

const CMaxButton = styled.button`
 padding: 10px 14px;
 border-radius: 2px;
 font-weight: 500;
 cursor: pointer;
 color: ${({ theme }) => theme.text8};
 background:  ${({ theme }) => theme.primary6};
 border: none;
 :focus,
 :hover {
	   box-shadow: 0 0 0 1pt ${({ theme, }) => darken(0.03, theme.primary7)};
	   outline: none;
	 }
`;

const CReceiveBox = styled.div`
  margin-top: 6px;
	font-size: 11px;
	color: ${({ theme }) => theme.text7};
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const CurrencyLogoBox = styled.div`
  display: flex;
  align-items: center;
	margin: 0 6px;
	height: 18px;
`;
const CurrencyLogo = styled.img`
	width: 12px;
  height: 12px;
  border-radius: 50%;
  overflow: hidden;
`;

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);


export default function CurrencyInputAmount({value, onUserInput,onMax,currencys, ...rest} : {
	value: string | number,
	onUserInput: (input: string) => void,
	currencys: ICurrencys,
	onMax?: () => void,
	error?: boolean
}) {
	const theme = React.useContext(ThemeContext);
	const {logo, currency, balance} = currencys
	const enforcer = (nextUserInput: string) => {
		if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
			onUserInput(nextUserInput)
		}
	}
	return (
		<CAmountLayout >
			<RowBetween>
				<EText>
					Amount
				</EText>
				<CAvaliavle>
					Available: {Number(balance).toLocaleString()} {currency}
				</CAvaliavle>
			</RowBetween>
			<CAmountBox>
				<CAmountInput
					{...rest}
					value={value}
					onChange={event => {
						enforcer(event.target.value.replace(/,/g, '.'))
					}}
					// universal input options
					inputMode="decimal"
					title="Token Amount"
					autoComplete="off"
					autoCorrect="off"
					// text-specific options
					type="text"
					pattern="^[0-9]*[.,]?[0-9]*$"
					placeholder='0.0'
					minLength={1}
					maxLength={79}
					spellCheck="false"
		    />
				<CMaxButton onClick={onMax}>MAX</CMaxButton>
			</CAmountBox>
			<CReceiveBox>
				You will receive ≈
				<CurrencyLogoBox>
					{logo ? <CurrencyLogo src={logo} /> : <HelpCircle size={14} color={theme.text6}/>}
				</CurrencyLogoBox>
				{Number(value).toLocaleString() || 0} {currency}
			</CReceiveBox>
		</CAmountLayout>
	)
}