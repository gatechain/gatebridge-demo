import React from 'react';
import styled from "styled-components";
import {IPairParam} from "../../helpers";

const CFeeLayout = styled.div`
  margin-bottom: 60px;
`;
const EText = styled.div`
	font-size: 14px;
	text-align: left;
	color: ${({ theme }) => theme.text6};
	margin-bottom: 4px;
`;
const CFeeInput = styled.input`
	width: 100%;
	height: 40px;
	padding: 10px 16px;
	font-size: 14px;
	box-sizing: border-box;
	box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
	border: 1px solid ${({ theme }) => theme.border2};
	background: ${({ theme }) => theme.bg7};
	color: ${({ theme }) => (theme.text6)};
	border-radius: 5px;
`;

const CFeeDesc = styled.div`
  margin-top: 6px;
	font-size: 11px;
	color: ${({ theme }) => theme.text7};
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export default function CurrencyInputFee({value, pairs}: {value:string, pairs:IPairParam[]}) {
	return (
		<CFeeLayout>
			<EText>
				Service Fee
			</EText>
			<CFeeInput disabled value={value + ' ' + pairs[0]['symbol']}  placeholder='0.0'/>
			<CFeeDesc>
				The fee use to send token to your destination address from the contract on {pairs[1]['name']} network
			</CFeeDesc>
		</CFeeLayout>
	)
}