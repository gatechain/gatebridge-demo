import React from "react";
import styled, {ThemeContext} from 'styled-components'
import {AlertCircle, Check, XCircle} from 'react-feather'
const MessageLayout = styled.div<{error?: boolean,warning?: boolean}>`
	padding: 4px 10px;
	border-radius: 2px;
	background: ${({ theme, error,warning }) => (error ? theme.red3 : warning ? theme.yellow1 : theme.green2)};
	color: ${({ theme, error, warning }) => (error ? theme.red2 : warning ? theme.yellow2 : theme.green1)};;
	font-size: 10px;
	display: flex;
	align-items: center;
`;
const MText = styled.div`
	margin-left: 5px;
`;


export default function Message({error,warning, msg}: {error?: boolean, warning?: any, msg?: string} & any) {
	const theme = React.useContext(ThemeContext);
	return (
		<MessageLayout error={error} warning={warning}>
			{error ? <XCircle size={14} color={theme.red2}/> : warning ? <AlertCircle size={14} color={theme.yellow2}/> : <Check size={14} color={theme.green1}/>}
			<MText>{msg}</MText>
		</MessageLayout>
	)
}