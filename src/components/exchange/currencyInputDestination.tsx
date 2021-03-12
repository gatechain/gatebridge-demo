import React from 'react';
import styled from "styled-components";
import {IPairParam} from "../../helpers";

const CDestinationLayout = styled.div`
  margin-bottom: 40px;
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
	border: 1px solid ${({ theme }) => theme.border2};
	background: ${({ theme }) => theme.bg1};
	color: ${({ error, theme }) => (error ? theme.red1 : theme.text6)};
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
export default function CurrencyInputDestination({value,onDestinationInput, pairs}: {value: string,onDestinationInput: (address: string) => void,pairs:IPairParam[]}) {
	return (
		<CDestinationLayout>
				<EText>
					Destination
				</EText>
			  <CDestinationInput
				    type="text"
				    value={value}
				    onChange={event => {
					    onDestinationInput(event.target.value);
				    }}
			  />
				<CDestinationDesc>
					This is the destination address of {pairs[1]['name']} network
				</CDestinationDesc>
		</CDestinationLayout>
	)
}