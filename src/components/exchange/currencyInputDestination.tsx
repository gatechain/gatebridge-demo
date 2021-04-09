import React from 'react';
import styled from "styled-components";
import {IPairParam} from "../../helpers";
import {I18nContext} from "../../providers";
import Message from "../message";

const CDestinationLayout = styled.div`
  margin-bottom: 40px;
  position: relative;
`;
const EText = styled.div`
	font-size: 14px;
	text-align: left;
	color: ${({ theme }) => theme.text6};
	margin-bottom: 4px;
`;
const CDestinationInput = styled.input<{ error?: boolean }>`
  width: 100%;
	height: 40px;
	padding: 10px 16px;
	font-size: 14px;
	box-sizing: border-box;
	box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
	border: 1px solid ${({error, theme }) => (error ? theme.red1 : theme.border2)};
	background: ${({ theme }) => theme.bg1};
	color: ${({theme }) => theme.text6};
	border-radius: 5px;
	:focus,
	:hover {
	   outline: none;
	}
`;
const CDestinationDesc = styled.div`
  margin-top: 6px;
	font-size: 11px;
	color: ${({ theme }) => theme.text7};
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ErrorTips = styled.div`
   position: absolute;
   left: 0;
   right: 0;
   bottom: -30px;
`;
export default function CurrencyInputDestination({value,onDestinationInput, pairs,error}: {value: string,onDestinationInput: (address: string) => void,pairs:IPairParam[],error:boolean}) {
	const $i18n = React.useContext<any>(I18nContext);
	return (
		<CDestinationLayout>
				<EText>
					{$i18n['destination']}
				</EText>
			  <CDestinationInput
				    error={error}
				    type="text"
				    value={value}
				    onChange={event => {
					    onDestinationInput(event.target.value);
				    }}
			  />
				<CDestinationDesc>
					{$i18n['destinationDesc'](pairs[1]['name'])}
				</CDestinationDesc>
				{
					error ? <ErrorTips><Message msg={$i18n['errorAddress']} error={true}/></ErrorTips> : null
				}
		</CDestinationLayout>
	)
}