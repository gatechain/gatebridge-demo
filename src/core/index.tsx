import * as React from "react";
import * as ReactDOM from "react-dom";
import {ExchangeModal, HistoryModal} from '../components';
import  {BRIDGE_EXCHANGE_MODAL_ID, BRIDGE_HISTORY_MODAL_ID} from '../constants';
import {  getThemeColors, ThemeColors, IPairsParam} from '../helpers';
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {ConfigContext, I18nContext} from '../providers';
import languages from '../locales';
interface ICoreProps {
	gateLink: string,
	assetApplyLink: string,
	// customTheme?: IThemesConfig[],
	pairs: IPairsParam[],
	chainRule: object,
	locale: string
}

const initCoreState = {
	// themeName: 'default',
	// themeName: 'dark',
	pairs: [],
	chainRule: {},
	gateLink: '',
	assetApplyLink: '',
	locale: 'zh',
};

function getLibrary(provider: any): Web3Provider {
	const library = new Web3Provider(provider)
	library.pollingInterval = 12000
	return library
}

export class Core {
	private themeColors: ThemeColors;
	constructor(opts: ICoreProps) {
		if(opts){
			const {pairs, chainRule, gateLink, assetApplyLink, locale} = opts;
			// if(customTheme){
			// 	this.mergeDefaultThemeColors(customTheme);
			// 	initCoreState['themeName'] = theme.name;
			// }
			if(pairs){
				(initCoreState as any )['pairs'] = pairs;
			}

			if(chainRule){
				(initCoreState as any )['chainRule'] = chainRule;
			}

			if(gateLink){
				(initCoreState as any )['gateLink'] = gateLink;
			}

			if(assetApplyLink){
				(initCoreState as any )['assetApplyLink'] = assetApplyLink;
			}

			if(locale){
				(initCoreState as any )['locale'] = locale;
			}
		}

		this.themeColors = getThemeColors( initCoreState['themeName']);

	}


	public async renderExchange(wrapper?:HTMLHtmlElement){
		const {themeColors} = this;
		await this.clearRender();
		const fragment = document.createDocumentFragment();
		const el = document.createElement("div");
		el.id = BRIDGE_EXCHANGE_MODAL_ID;
		fragment.appendChild(el);
		wrapper ? wrapper.appendChild(el) : document.body.appendChild(el);
		ReactDOM.render(<ConfigContext.Provider value={{...initCoreState}}>
			<I18nContext.Provider value={{...languages[initCoreState['locale']]}}>
				<Web3ReactProvider  getLibrary={getLibrary}>
					  <ExchangeModal  themeColors={themeColors}  pairs={initCoreState.pairs}/>
					</Web3ReactProvider>
			</I18nContext.Provider>
			</ConfigContext.Provider>
			,document.getElementById(BRIDGE_EXCHANGE_MODAL_ID));
	}

	public async renderHistory(wrapper?:HTMLHtmlElement) {
		const {themeColors} = this;
		await this.clearRender();
		const fragment = document.createDocumentFragment();
		const el = document.createElement("div");
		el.id = BRIDGE_HISTORY_MODAL_ID;
		fragment.appendChild(el);
		wrapper ? wrapper.appendChild(el) : document.body.appendChild(el);
		ReactDOM.render(	<I18nContext.Provider value={{...languages[initCoreState['locale']]}}><HistoryModal  themeColors={themeColors} /></I18nContext.Provider>,document.getElementById(BRIDGE_HISTORY_MODAL_ID));
	}
	private async clearRender(){
		const HISTORY = document.getElementById(BRIDGE_HISTORY_MODAL_ID);
		const EXCHANGE = document.getElementById(BRIDGE_EXCHANGE_MODAL_ID);
		HISTORY && ReactDOM.unmountComponentAtNode(HISTORY);
		EXCHANGE && ReactDOM.unmountComponentAtNode(EXCHANGE);
		return true;
	}
	// private mergeDefaultThemeColors(theme: IThemesConfig[]): void {
	// 	console.log(theme, setThemeColors);
	//     // setThemeColors(theme);
	// }
}