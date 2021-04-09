import * as React from "react";
import '../../libs/index.web.js';
import styled, {
	ThemeProvider as StyledComponentsThemeProvider
} from "styled-components";
import {BigNumber} from "bignumber.js";
import {ThemeColors, IPairParam, ICurrencys, getLocal, setLocal, isAddress, IAssetParam} from "../../helpers";
import {RowVerticalEnd} from '../row';
import { darken } from 'polished'
import {ArrowRight} from 'react-feather';
import {useActiveWeb3React, useEagerConnect, useInactiveListener} from '../../hooks';
import CurrentCoin from '../currentCoin';
import Message from '../message';
import CurrencySearchModal from './currencySearchModal';
import CurrencyConfirmModal from './currencyConfirmModal';
import CurrencyInputAsset from './currencyInputAsset';
import CurrencyInputAmount from './currencyInputAmount';
import CurrencyInputDestination from './currencyInputDestination';
import CurrencyInputFee from './currencyInputFee';
import {ButtonPrimary} from '../button';
import {useWeb3React} from "@web3-react/core";
import {injected} from '../../connectors';
import Loader  from "../loader";
import {MaxUint256} from '../../constants';
import {ConfigContext, I18nContext} from '../../providers';

const ELayout = styled.div`
		font-family: PingFangSC, PingFangSC-Medium, sans-serif;
	  display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    -webkit-box-align: center;
    align-items: center;
    flex: 1 1 0%;
    overflow: hidden;
    user-select: none;
`;

const ExchangeMain = styled.div`
	padding: 20px 60px 40px;
	background: ${({ theme }) => theme.main};
	border: 1px solid ${({ theme }) => theme.border1};
	border-radius: 3px;
	width: 720px;
	box-sizing: border-box;
	overflow: hidden;
	position: relative;
`;

const Etext = styled.p`
	font-weight: 400;
	font-size: 14px;
	text-align: left;
	color: ${({ theme }) => theme.text6};
	margin-bottom: 4px;
`
const EchangeBtnBox = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;
const EchangeButton = styled.div`
		width: 40px;
		height: 40px;
		opacity: 1;
		background: ${({ theme }) => theme.primary1};
		border-radius: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		&:hover {
      box-shadow: 0 0 0 1pt ${darken(0.1, '#efefef')};
    }
`;
const CrossChainDesc = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: ${({ theme }) => theme.text3};
	margin-top: 20px;
`;
const AGateLink = styled.a`
	width: 70px;
	height: 22px;
	margin-left: 5px;
	cursor: pointer;
`;
const CrossChainLogo = styled.img`
	width: 100%;
	height: 100%;
	background: #de5959;
	border-radius: 2px;
`;

const ErrorTips = styled.div`
  position: absolute;
  width: 100%;
  color: ${({ theme }) => theme.red1};
  font-size: 11px;
  bottom: -34px;
`;

const MessageBox = styled.div`
  position: absolute;
  width: 600px;
  box-sizing: border-box;
  bottom: 100px;
`;

const gateLogo = require('../../images/gateio_h.png');
function ThemeProvider({children, themeColors}: {children: React.ReactNode, themeColors: ThemeColors}){
	return <StyledComponentsThemeProvider theme={themeColors}>{children}</StyledComponentsThemeProvider>
}

interface IExchangeModalProps {
	themeColors: ThemeColors;
	pairs: IPairParam[]
}

const exchangeState: ICurrencys = {
	currency: '',
	decimals: 0,
	balance: 0,
	logo: '',
	resourceId: '',
	tokenAddress: '',
	amount: '',
	account: '',
	fee: '0.0',
	destChainId: 0
};


const BridgeSDK = (window as any).GtBridgeSdk.Bridge;
let bridge: { getBalance: (arg0: string | null | undefined, arg1: any) => Promise<any>; } | null;
let copyCurrentAssetList:IAssetParam[] = [];
export function ExchangeModal(props: IExchangeModalProps) {
	const {themeColors, pairs} = props;
	const {chainRule: getChainRule, gateLink: gateLinkUrl, supportedChainIds} = React.useContext<any>(ConfigContext);
	const $i18n = React.useContext<any>(I18nContext);
	const {activate: activateNetwork, chainId, library } = useWeb3React();
	const [exchangeFromState, setExchangeFromState] = React.useState(exchangeState);
	const [getPairs, setPairs] =  React.useState(pairs);
	const [assetList, setAssetList] = React.useState<any>([]);
	const [isApprove, setIsApprove] = React.useState(false);
	const [approvePending, setApprovePending] = React.useState(false);
	const [errorAmount, setErrorAmount] = React.useState(false);
	const [matchChainId, setMatchChainId] = React.useState(false);
	const [errRuleChainId, setErrRuleChainId] = React.useState(false);
	const [showSearch, setShowSearch] = React.useState(false);
	const [showConfigModal, setShowConfigModal] = React.useState(false);
	const [isConnect, setIsConnect] = React.useState(false);
	const [confirmPending, setConfirmPending] = React.useState(false);
	const [messageState, setMessageState] = React.useState<any>(null);
	const [searchToken, setSearchToken] =  React.useState('');
	const [applyStatus, setApplyStatus] =  React.useState(false);
	const [errorAddress, setErrorAddress] =  React.useState(false);
	const [allowanceLoading, setAllowanceLoading] =  React.useState(false);


	React.useEffect(() => {
		handleCheckRuleChains(getPairs[0], getPairs[1]);
	}, [])

	const triedEager = useEagerConnect();
	useInactiveListener(!triedEager);
	const { account } = useActiveWeb3React();

	const getAssetList = React.useCallback((assetList) => {
		if(assetList.length){
			setAssetList(assetList);
			copyCurrentAssetList = assetList || [];
			// const {symbol, address, logo, decimals} = assetList[0];
			// const state = Object.assign({}, exchangeFromState);
			// exchangeState.currency = state.currency = symbol;
			// exchangeState.decimals = state.decimals = decimals;
			// exchangeState.logo = state.logo = logo;
			// exchangeState.tokenAddress = state.tokenAddress = address;
			// exchangeState.amount && handleGetAllowance(address, getPairs[0]['handler'], decimals);
			// setExchangeFromState(state);
		}
	}, []);
  // api start
	const handleGetBalance = React.useCallback(async (account: string, tokenAddress: string) => {
		if(bridge){
			const result =  await bridge?.getBalance(account, tokenAddress);
			const balance = new BigNumber(Number(result.toString())).dividedBy(Math.pow(10, exchangeState.decimals)).toNumber();
			const state = Object.assign({}, exchangeFromState);
			exchangeState.balance = state.balance =  balance;
			setExchangeFromState(state);
		}
	},[])

	const handleGetFee = React.useCallback(async (address: string, decimals:number) => {
		if(bridge){
				const result =  await (bridge as any).getFee(address);
			  const fee = new BigNumber(Number(result.toString())).dividedBy(Math.pow(10, decimals)).toString(10);
				const state = Object.assign({}, exchangeFromState);
				exchangeState.fee = state.fee =  fee;
				setExchangeFromState(state);
		}
	},[])

	const handleGetAllowance = React.useCallback(async (token: string, handler:string, decimals: number) => {
		if(bridge){
			setAllowanceLoading(true);
			let amountVal =  new BigNumber(Number(exchangeState.amount)).multipliedBy(decimals).toString(10);
			const result =  await (bridge as any).getAllowance(token, handler);
			setIsApprove(Number(result.toString()) - Number(amountVal) < 0);
			setAllowanceLoading(false);
		}
	},[])

	const handleSendApprove = React.useCallback(async (token: string, handler:string, decimals: number) => {
		if(bridge){
			try{
				const result =  await (bridge as any).approve(token, handler, MaxUint256);
				if(result && result.hash){
					setIsApprove(false)
					setApprovePending(false);

					setMessageState({
						msg: 'success hash:' + result.hash
					})
				}
			}catch (error) {
				setApprovePending(false);
				// setMessageState({
				// 	error: true,
				// 	msg: error
				// })
			}

			hideMessage();
		}
	},[])

	const handleSendDeposit = React.useCallback(async (chainId: number | undefined, bridgeAddress: string, resourceId:string, recipient: string, fee:string, value:string) => {
		if(bridge){
			try{
				if(!chainId) return;
				const result =  await (bridge as any).deposit(chainId, bridgeAddress, resourceId, recipient, fee, value);
				if(result){
					setShowConfigModal(false);
					const state = Object.assign({}, exchangeFromState);
					exchangeState.amount = state.amount ='';
					setExchangeFromState(state);
					handleGetFee(getPairs[0]['bridgeAddress'], getPairs[0]['decimals']);
					handleGetBalance(exchangeState.account, exchangeState.tokenAddress);

					const data = getLocal('gtOrders');
					result.fromChain = {
						...getPairs[0]
					}
					result.toChain = {
						...getPairs[1]
					}
					result.internal = {
						token: exchangeState.currency,
						decimals: exchangeState.decimals,
						amount: value
					}

					if(data){
						data.unshift(result);
						setLocal('gtOrders', data);
					} else {
						const array = [result];
						setLocal('gtOrders', array);
					}
					setConfirmPending(false);

					setMessageState({
						msg: 'success hash:' + result.hash
					})
				}
			}catch (error) {
				  setConfirmPending(false);
					// setMessageState({
					// 	error: true,
					// 	msg: error
					// })
			}

			hideMessage();
		}
	},[exchangeFromState, getPairs])

	const handleGetTokenSymbol = React.useCallback(async (token: string) => {
		if(bridge){
			return await (bridge as any).getSymbol(token);
		}
		return null;
	},[])

	const handleGetTokenDecimals = React.useCallback(async (token: string) => {
		if(bridge){
			return await (bridge as any).getDecimals(token);
		}
		return null;
	},[])

	const handleGetTokenResourceId = React.useCallback(async (handlerAddress: string, token: string) => {
		if(bridge){
			return await (bridge as any).getResourceIdByToken(handlerAddress, token);
		}
		return null;
	},[])

	const hideMessage = React.useCallback(() => {
		setTimeout(() => {
			setMessageState(null)
		}, 3000)
	}, [])

	const initState = React.useCallback((account?: string) => {
		const state = Object.assign({}, exchangeFromState);
		exchangeState.balance = state.balance = 0;
		exchangeState.currency = state.currency = '';
		exchangeState.decimals = state.decimals = 0;
		exchangeState.tokenAddress = state.tokenAddress = '';
		exchangeState.resourceId =  state.resourceId = '';
		exchangeState.fee = state.fee = '0.0';
		exchangeState.amount = state.amount = '';
		if(account){
			exchangeState.account = state.account = account;
		}
		if(isApprove){
			setIsApprove(false)
		}
		setExchangeFromState(state);
	},[isApprove])
	// api end

	React.useEffect(  () => {
		if(account){
			initState(account)
		}
	}, [account])

	React.useEffect(() => {
		if(!chainId)return;
		if(!!library ){
			bridge = new BridgeSDK(chainId, account, library, library.getSigner());
		}

		initState();

		setErrorAmount(false);

		if(chainId && getPairs[0].chainId != chainId){
			setMatchChainId(true)
		} else {
			setMatchChainId(false )
			handleGetFee(getPairs[0]['bridgeAddress'], getPairs[0]['decimals']);
		}

		getAssetList(getPairs[0]['assetList']);
	}, [chainId, getPairs])

	const handleCheckRuleChains = React.useCallback((onePair, twoPair) => {
		const ruleKey = onePair['chainId'] + '->' + twoPair['chainId'];
		if(!getChainRule[ruleKey]){
			setErrRuleChainId(true);
			exchangeState.destChainId = 0;
			if(messageState){
				hideMessage()
			}
		} else {
			setErrRuleChainId(false);
			exchangeState.destChainId = getChainRule[ruleKey]['destChainId'];
			if(getChainRule[ruleKey]['tips']){
				setMessageState({
					warning: true,
					msg: getChainRule[ruleKey]['tips']
				})
			} else {
				setMessageState(null)
			}
		}
	}, [messageState]);


	const handleExchangePair = React.useCallback(() => {
		setPairs([getPairs[1], getPairs[0]])
		getAssetList(getPairs[1]['assetList']);
		handleCheckRuleChains(getPairs[1], getPairs[0]);
	}, [getPairs, setPairs]);

	const handleChangeNetWork =  React.useCallback((netWork, currChainId) => {
		const {chainId: fromChainId} = getPairs[0];
		const {chainId: toChainId} = getPairs[1];
		let pais: any = [];
		if(currChainId === fromChainId){
			pais = [netWork, getPairs[1]]
		}else if(currChainId === toChainId){
			pais = [getPairs[0], netWork]
		}
		setPairs(pais);
		getAssetList(pais[0]['assetList']);
		handleCheckRuleChains(pais[0], pais[1]);
	},[getPairs, setPairs, setErrRuleChainId]);

	const handleShowCurrentSearch = React.useCallback(() => {
		if(!exchangeState.account){
			handleConnectWallet();
			return;
		}

		if(copyCurrentAssetList.length != assetList.length){
			setAssetList(copyCurrentAssetList);
		}
		setShowSearch(true)
		setApplyStatus(false)
	}, [exchangeState]);

	const handleSearchDismiss = React.useCallback(() => {
		setShowSearch(false);
	}, []);

	const handleCurrencySelect = React.useCallback(
		 (currency: IAssetParam) => {
			const state = Object.assign({}, exchangeFromState);
			Promise.all([handleGetTokenSymbol(currency.address),  handleGetTokenDecimals(currency.address), handleGetTokenResourceId(getPairs[0]['handler'], currency.address)]).then((result) => {
				exchangeState.currency =  state.currency = result[0];
				exchangeState.decimals =  state.decimals = result[1];
				exchangeState.resourceId =  state.resourceId = result[2];
				exchangeState.amount = state.amount = '';
				exchangeState.tokenAddress = state.tokenAddress = currency.address;
				exchangeState.logo = state.logo = currency.logo;
				exchangeState.tokenAddress && handleGetBalance(exchangeState.account, exchangeState.tokenAddress);
				setExchangeFromState(state);
				handleSearchDismiss();
				setErrorAmount(false);
			})
		},[handleSearchDismiss, exchangeFromState, getPairs]
	)

	const handleSearchInput = React.useCallback(event => {
		const input = event.target.value;
		if(input.trim()){
			const filterList = copyCurrentAssetList.filter((item ) => {
				const address = item.address.toLocaleLowerCase();
				const symbol = item.symbol.toUpperCase();
				return address.indexOf(input.toLocaleLowerCase()) > -1 ||  symbol.indexOf(input.toUpperCase()) > -1;
			})
			setAssetList(filterList);
		} else {
			setAssetList(copyCurrentAssetList);
		}
		setSearchToken(input);
		setApplyStatus(false)
	}, [])

	const handleSearchEnter = React.useCallback(event => {
		if (event.key === 'Enter') {
			getSearchTokenInfos(searchToken)
		}
	}, [searchToken])

	const handleSearchBtn = React.useCallback(() => {
		 getSearchTokenInfos(searchToken)
	}, [searchToken])

	const getSearchTokenInfos = (address: string) => {
		if(!address)return;
		const checksummedInput = isAddress(address);
		if(checksummedInput){
			Promise.all([handleGetTokenSymbol(address),  handleGetTokenDecimals(address)]).then((result) => {
				setAssetList([{
					symbol: result[0],
					name: result[0],
					logo: '',
					decimals: result[1],
					address: address
				}]);
			}).catch(error => {
				setApplyStatus(true)
			})
		} else {
			setApplyStatus(true)
		}
	}
	const handleTypeAmount = React.useCallback(
		(value: string) => {
			const state = Object.assign({}, exchangeFromState);
			exchangeState.amount = state.amount = value;
			setExchangeFromState(state);
			setErrorAmount(Number(value) - state.balance > 0);
			exchangeState.balance && exchangeState.tokenAddress && handleGetAllowance(exchangeState.tokenAddress, getPairs[0]['handler'], exchangeState.decimals)
		},
		[exchangeFromState]
	)
	const handleMaxInput = React.useCallback(() => {
		const state = Object.assign({}, exchangeFromState);
		if(state.balance){
			exchangeState.amount = state.amount = state.balance.toString();
			setExchangeFromState(state);
			setErrorAmount(false);
			handleGetAllowance(exchangeState.tokenAddress, getPairs[0]['handler'], exchangeState.decimals);
		}
	}, [getPairs, exchangeState]);

	const handleTypeToAddress = React.useCallback((value) => {
		if(value.trim() && isAddress(value)){
			setErrorAddress(false);
		} else {
			setErrorAddress(true);
		}
		const state = Object.assign({}, exchangeFromState);
		exchangeState.account =  state.account = value;
		setExchangeFromState(state);
	}, [exchangeFromState, setErrorAddress]);

	const handleConnectWallet =  React.useCallback(() => {
		setIsConnect(true);
		activateNetwork(injected(supportedChainIds), undefined, true).catch((error) => {
			if(error.code == -32002){
				setMessageState({
					error: true,
					msg: error.message
				})
				hideMessage();
			} else {
				setIsConnect(false);
			}
		})
	}, [activateNetwork, setIsConnect, setMessageState])

	const handleApprove =  React.useCallback(() => {
		setApprovePending(true);
		handleSendApprove(exchangeState.tokenAddress, getPairs[0]['handler'], exchangeState.decimals)
	},[getPairs])

	const handleWillReceive =  React.useCallback(() => {
		handleGetFee(getPairs[0]['bridgeAddress'], getPairs[0]['decimals']);
		setShowConfigModal(true);
	},[getPairs])

	const handleConfirmDismiss =  React.useCallback(() => {
		setShowConfigModal(false);
	}, []);

	const handleConfirmDeposit = React.useCallback(() => {
		const fee = new BigNumber(Number(exchangeState.fee)).multipliedBy(new BigNumber(10).pow(getPairs[0]['decimals'])).toString(10);
		const amount = new BigNumber(Number(exchangeState.amount)).multipliedBy(new BigNumber(10).pow(exchangeState.decimals)).toString(10);
		setConfirmPending(true);
		handleSendDeposit(exchangeState.destChainId, getPairs[0]['bridgeAddress'], exchangeState.resourceId, exchangeState.account, fee, amount);
	}, [getPairs]);


	return (
		<ThemeProvider themeColors={themeColors}>
			  <ELayout>
				<ExchangeMain>
					<RowVerticalEnd>
						<div>
							<Etext>{$i18n['from']}</Etext>
							<CurrentCoin current={getPairs[0]} errorChainId={matchChainId} other={getPairs[1]} changeNetWork={handleChangeNetWork}/>
						</div>
						<EchangeBtnBox>
							<EchangeButton onClick={handleExchangePair} >
								<ArrowRight  size={18} strokeWidth={2} color={themeColors.primary2}/>
							</EchangeButton>
						</EchangeBtnBox>
						<div>
							<Etext>{$i18n['to']}</Etext>
							<CurrentCoin current={getPairs[1]} errorChainId={errRuleChainId} other={getPairs[0]} changeNetWork={handleChangeNetWork}/>
						</div>

						{
							matchChainId ?
								<ErrorTips><Message msg={$i18n['notMatch']} error={true}/> </ErrorTips> : null
						}

						{
							errRuleChainId ?
								<ErrorTips><Message msg={$i18n['notExchanged']} error={true}/> </ErrorTips> : null
						}

					</RowVerticalEnd>
					<CurrencyInputAsset onShowCurrentSearch={handleShowCurrentSearch} currencys={exchangeFromState} noMatch={matchChainId} />
					<CurrencyInputAmount value={exchangeFromState.amount} onUserInput={handleTypeAmount} onMax={handleMaxInput} currencys={exchangeFromState} error={errorAmount} pairs={getPairs}/>
					<CurrencyInputDestination value={exchangeFromState.account} onDestinationInput={handleTypeToAddress} pairs={getPairs} error={errorAddress} />
					<CurrencyInputFee value={exchangeFromState.fee} pairs={getPairs}/>
					{
						!account ? 	<ButtonPrimary onClick={handleConnectWallet} disabled={isConnect}>
							<span style={{marginRight: '5px'}}>{$i18n['connect']}</span>
							{isConnect ? <Loader /> : null}
						</ButtonPrimary> : isApprove ?
							<ButtonPrimary onClick={handleApprove} disabled={approvePending || errRuleChainId || !Number(exchangeFromState.amount) || errorAmount || errorAddress || allowanceLoading}>
								<span style={{marginRight: '5px'}}>{$i18n['approve']}</span>
								{approvePending ? <Loader /> : null}
							</ButtonPrimary>
							: <ButtonPrimary onClick={handleWillReceive} disabled={matchChainId || errRuleChainId || !Number(exchangeFromState.amount) || errorAmount || errorAddress || allowanceLoading}>{$i18n['next']}</ButtonPrimary>
					}

					{
						messageState ? <MessageBox>
							<Message {...messageState} />
						</MessageBox> : null
					}

				</ExchangeMain>
				<CrossChainDesc>
					{$i18n['bridgeDesc']}
					<AGateLink href={gateLinkUrl} target="_blank">
						<CrossChainLogo src={gateLogo} />
					</AGateLink>
				</CrossChainDesc>
				<CurrencySearchModal
					isOpen={showSearch}
					assetList={assetList}
					onDismiss={handleSearchDismiss}
					selectedCurrency={exchangeFromState.tokenAddress}
					onCurrencySelect={handleCurrencySelect}
				  handleInput={handleSearchInput}
					handleEnter={handleSearchEnter}
					handleSearch={handleSearchBtn}
					isApply={applyStatus}
				/>
				<CurrencyConfirmModal
					isOpen={showConfigModal}
					onDismissConfirmModal={handleConfirmDismiss}
					onConfirmDeposit={handleConfirmDeposit}
					receiveInfos={exchangeFromState}
					pairs={getPairs}
					confirmPending={confirmPending}
				/>
			</ELayout>
		</ThemeProvider>
	)
}