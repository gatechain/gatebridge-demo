export interface ThemeColors {
    white: string;
    background: string;
    main: string;
    hover: string;
    border: string;
    modalBG: string;
    shadow1: string;
    border1: string;
    border2: string;
    border3: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    text6: string;
    text7: string;
    text8: string;
    text9: string;
    bg1: string;
    bg2: string;
    bg3: string;
    bg4: string;
    bg5: string;
    bg6: string;
    bg7: string;
    bg8: string;
    bg9: string;
    primaryText1: string;
    primary1: string;
    primary2: string;
    primary3: string;
    primary4: string;
    primary5: string;
    primary6: string;
    primary7: string;
    primary8: string;
    secondary1: string;
    secondary2: string;
    secondary3: string;
    red1: string;
    red2: string;
    red3: string;
    green1: string;
    green2: string;
    yellow1: string;
    yellow2: string;
    blue1: string;
}
export interface IThemesConfig {
    name: string;
    colors?: ThemeColors;
}
export declare type ThemesList = {
    [name: string]: IThemesConfig;
};
export interface IPairParam {
    name: string;
    symbol: string;
    chainId: number | undefined;
    logo: string;
    errorChainId?: boolean;
}
export interface IPairsParam {
    name: string;
    chainId: number;
    symbol: string;
    logo: string;
    bridgeAddress: string;
    decimals: number;
    handler: string;
    assetList: IAssetParam[];
}
export interface IAssetParam {
    symbol: string;
    name: string;
    decimals: string;
    address: string;
    logo: string;
}
export interface ICurrencys {
    currency: string;
    logo: string;
    tokenAddress: string;
    resourceId: string;
    amount: string;
    account: string;
    fee: string;
    decimals: number;
    balance: number;
    destChainId: number;
}
//# sourceMappingURL=types.d.ts.map