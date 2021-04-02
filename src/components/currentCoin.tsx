import React from 'react';
import styled, {ThemeContext} from 'styled-components';
import { IPairParam } from "../helpers";
import {ChevronDown,ChevronUp, HelpCircle} from "react-feather";
import {ConfigContext, I18nContext} from "../providers";
const CContainer = styled.div`
   position: relative;
`;
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
`;
const CNetWork = styled.div`
		display: flex;
		flex-direction: row;
`;
const CImage = styled.img`
	width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
`;
const CImageMini = styled.img`
	width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
`;
const CText = styled.div`
  font-size: 16px;
  font-weight: 400;
	color: ${({ theme }) => theme.text6};
	margin-left: 10px;
`;
const CDownBox = styled.button<{active: boolean}>`
	cursor: pointer;
	border-radius: 2px;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	background:  ${({ theme }) => theme.bg7};
	border: none;
	padding: 0;
	margin: 0;
	box-shadow: ${({active, theme}) => active ? (`${theme.primary8} 0px 0px 10px`) : null} ;
	:focus{
	  outline: none;
	}
	:hover{
	  background: ${({ theme }) => theme.primary6};
	}
`;
const ChainPool = styled.div`
   position: absolute;
   left: 0;
   margin-top: 4px;
   border-radius: 4px;
	 box-shadow: 1px 1px 6px 0px ${({ theme }) => theme.shadow1};
	 background: ${({ theme }) => theme.bg1};
	 box-sizing: border-box;
   width: 100%;
   z-index: 999;
`;
const ChainItem = styled.div`
   padding: 10px 12px;
   font-size: 11px;
   color: ${({ theme }) => theme.text6};
   box-shadow: ${({ theme }) => `0px -1px 0px 0px ${theme.border1} inset`};
   display: grid;
   grid-template-columns: auto minmax(auto,1fr) 30px;
   grid-gap: 16px;
   cursor: pointer;
   box-sizing: border-box;
   :hover {
   		color: ${({ theme }) => theme.primary8};
   }
`;
const CurrentCoin = function({current,errorChainId, other, changeNetWork }: {current:IPairParam,other:IPairParam,errorChainId: boolean,changeNetWork: (network:IPairParam, changeChainId: number | undefined) => void }){
	const {logo, name, chainId: currChainId} = current;
	const {chainId: otherChainId} = other;
	const theme = React.useContext(ThemeContext);
	const $i18n = React.useContext<any>(I18nContext);
	const {chainPool} = React.useContext<any>(ConfigContext);
	const [poolList, setPoolList] = React.useState([]);
	const [isActive, setIsActive] = React.useState(false);
	React.useEffect(() => {
		const pools: any = [];
		chainPool.forEach((item:IPairParam) => {
			if(item.chainId != currChainId && item.chainId != otherChainId){
				pools.push(item)
			}
		})
		setPoolList(pools);
	}, [currChainId, otherChainId, chainPool, setPoolList])
	const handleFocus = React.useCallback(() => {
		setIsActive(true)
	}, [setIsActive])

	const handleBlur = React.useCallback(() => {
		setIsActive(false)
	}, [setIsActive])

	const handleToggle = React.useCallback(() => {
			setIsActive(!isActive);
	}, [isActive, setIsActive])


	return <CContainer>
		  <CLayout error={errorChainId}>
			  <CNetWork>
				  {logo ? <CImage src={logo}  /> : <HelpCircle size={44} color={theme.text6} strokeWidth={1} />}
				  {name ? <CText>
					  {name}
					  <br/>
					  {$i18n['network']}
				  </CText> : ''}
			  </CNetWork>
			  {
				   poolList.length ?  <CDownBox onFocus={handleFocus} onBlur={handleBlur} onClick={handleToggle} active={isActive}>
					  {
						  isActive ?  <ChevronUp size={18} color={theme.text6}/> :  <ChevronDown size={18} color={theme.text6}/>
					  }
				  </CDownBox> : null
			  }

		  </CLayout>
		 {
			 isActive ? <ChainPool>{
				 poolList.map((item: IPairParam, index) => {
					 return <ChainItem key={index} onMouseDown={() => changeNetWork(item, currChainId)}>
						 {logo ? <CImageMini src={logo}  /> : <HelpCircle size={20} color={theme.text6} strokeWidth={1} />}
						 {item.name} {$i18n['network']}
					 </ChainItem>
				 })
			 }</ChainPool> : null
		 }
		</CContainer>
}

export default CurrentCoin;