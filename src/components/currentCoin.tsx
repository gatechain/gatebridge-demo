import React from 'react';
import styled, {ThemeContext} from 'styled-components';
import { IPairParam } from "../helpers";
import {HelpCircle} from "react-feather";
const CLayout = styled.div<{error?:boolean}>`
		width: 260px;
		height: 100px;
		padding: 28px 20px;
		opacity: 1;
		border-radius: 5px;
		box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
		border: 1px solid ${({ error, theme }) => error ?  theme.red1 : theme.border2};
		background: ${({ theme }) => theme.bg1};
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		
`;

const CImage = styled.img`
	width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
`;
const CText = styled.div`
  font-size: 16px;
  font-weight: 400;
	color: ${({ theme }) => theme.text6};
	margin-left: 10px;
`
const CurrentCoin = function(props: IPairParam){
	const {logo, name, errorChainId} = props;
	const theme = React.useContext(ThemeContext);
	return <>
		  <CLayout error={errorChainId}>
				{logo ? <CImage src={logo}  /> : <HelpCircle size={44} color={theme.text6} strokeWidth={1} />}
				{name ? <CText>
					{name}
					<br/>
					Network
				</CText> : ''}
			</CLayout>
		</>
}

export default CurrentCoin;