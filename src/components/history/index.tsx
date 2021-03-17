import * as React from "react";
import styled, {ThemeContext, ThemeProvider as StyledComponentsThemeProvider} from "styled-components";
import { ThemeColors,getLocal } from "../../helpers";
import {BigNumber} from "bignumber.js";
import {ArrowRightCircle, HelpCircle} from 'react-feather';

const HLayout = styled.div`
 font-family: PingFangSC, PingFangSC-Medium, sans-serif;
 display: flex;
 flex-direction: column;
 width: 100%;
 height: 100%;
 -webkit-box-align: center;
 align-items: center;
 flex: 1 1 0%;
 overflow: hidden auto;
`;

const HistoryMain = styled.div`
	width: 1136px;
`;

const HMTable = styled.table`
	width: 100%;
	border-spacing: 0;

`;

const HMthead = styled.thead`
	width: 100%;
  font-size: 13px;
  background: ${({ theme }) => theme.bg9};
  color: ${({ theme }) => theme.text9};
`;
const HMtbody = styled.tbody`

`;
const HMtr = styled.tr`
	height: 32px;
  padding: 0;

`;

const HMth = styled.th`
   border-top:1px solid ${({ theme }) => theme.border3};
	 border-bottom:1px solid ${({ theme }) => theme.border3};
	 text-align: left;
	 padding: 0 10px;
`;

const HMtd = styled.td`
	 border-bottom:1px solid ${({ theme }) => theme.border3};
	 text-align: left;
	 font-size: 13px;
	 color: ${({ theme }) => theme.text6};
	 padding: 20px 10px;
	 background: ${({ theme }) => theme.main};
;
`;
const HMfromOrToBox =  styled.div`

`;
const HMamount = styled.div`
	color: ${({ theme }) => theme.text6};
	font-size: 15px;
	font-weight: 500;
;
`;

const HMLogo = styled.img`
	width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 4px;
;
`;

const HMAddressBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;

const HMAddress = styled.div`
   color: #0395BB;
   cursor: pointer;
   margin-left: 4px;
`;

const EmptyBox = styled.div`
  border: 1px solid ${({ theme }) => theme.border3};
  border-top: none;
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text9};
`;

function ThemeProvider({children, themeColors}: {children: React.ReactNode, themeColors: ThemeColors}){
	return <StyledComponentsThemeProvider theme={themeColors}>{children}</StyledComponentsThemeProvider>
}

interface IHistoryModalProps {
	themeColors: ThemeColors;
}
const tHeader = [
	{
		props: 'asset',
		label: 'Asset'
	},
	{
		props: 'from',
		label: 'Amount/From (Address)'
	},
	{
		props: 'arrow',
		label: '',
		width: '120px'
	},
	{
		props: 'to',
		label: 'Amount/To (Address)'
	},
	{
		props: 'fee',
		label: 'Service Fee'
	}
];

const TdItem = function ({fee, token, from, to, fromChain, toChain, amount, internal}: {fee: string, token: string,from:string, to: string,amount: string,fromChain:any,toChain:any,internal :any}) {
	const theme = React.useContext(ThemeContext);
	const handleAddress = React.useCallback((address: string, symbol: string) => {
		let currSymbol = symbol.toLocaleLowerCase() || 'eth';
		if(currSymbol == 'gt') currSymbol = 'gt_evm';
		let url = 'https://block.info/explorer/'+currSymbol+'/address/' + address;
		window.open(url);
	}, [])

	return <>
		{
			tHeader.map((cItem, cIndex) => {
				return <HMtd key={cIndex}>
					{
						cItem.props === 'asset' ? internal.token : ''
					}
					{
						cItem.props === 'from' ? <HMfromOrToBox>
							<HMamount>{amount} {internal.token}</HMamount>
							<HMAddressBox>
								{
									fromChain.logo ? 	<HMLogo src={fromChain.logo} /> :  <HelpCircle size={16} color={theme.text6}/>
								}
								Address: <HMAddress onClick={() => handleAddress(from, fromChain.symbol)}>{from.slice(0, 8)}...{from.slice(-8)}</HMAddress>
							</HMAddressBox>
						</HMfromOrToBox> : ''
					}
					{
						cItem.props === 'arrow' ? <ArrowRightCircle color='#0395BB' size={24}/> : ''
					}
					{
						cItem.props === 'to' ? <HMfromOrToBox>
							<HMamount><HMamount>{amount} {internal.token}</HMamount></HMamount>
							<HMAddressBox>
								{
									toChain.logo ? 	<HMLogo src={toChain.logo} /> :  <HelpCircle size={16} color={theme.text6}/>
								}
								Address: <HMAddress onClick={() => handleAddress(to, toChain.symbol)}>{to.slice(0, 8)}...{to.slice(-8)}</HMAddress>
							</HMAddressBox>
						</HMfromOrToBox> : ''
					}
					{
						cItem.props === 'fee' ? fee + ' ' + fromChain.symbol  : ''
					}
				</HMtd>
			})
		}
		</>
};

export function HistoryModal(props: IHistoryModalProps) {
	const {themeColors} = props;
	const [orders, setOrders] = React.useState( []);
	React.useEffect(() => {
		let gtOrders = getLocal('gtOrders');
		if(gtOrders){
			gtOrders.forEach((item: any) => {
				item.fee = new BigNumber(Number((item.value.hex).toString(10))).dividedBy(Math.pow(10, item.fromChain.decimals)).toString(10);
				item.amount = new BigNumber(Number(item.internal.amount)).dividedBy(Math.pow(10, item.internal.decimals)).toString(10);
			})
			setOrders(gtOrders);
		}
	},[])

	return (
		<ThemeProvider themeColors={themeColors}>
			<HLayout>
				<HistoryMain>
					<HMTable>
						<HMthead>
							<HMtr>
								{
									tHeader.map((item, index) => {
										return <HMth key={index} style={{width: item.width ? item.width : 'auto'}}>{item.label}</HMth>
									})
								}
							</HMtr>
						</HMthead>
						<HMtbody>
							{
								orders.map((item, index) => {
									 return (
										 <HMtr key={index}>
											 <TdItem {...item}/>
										 </HMtr>
									 )
								})
							}
						</HMtbody>
					</HMTable>
					{
						!orders.length ? <EmptyBox>No orders!</EmptyBox> : null
					}
				</HistoryMain>
			</HLayout>
		</ThemeProvider>
	)
}