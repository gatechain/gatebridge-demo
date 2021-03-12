import { IPairsParam } from '../helpers';
interface ICoreProps {
    gateLink: string;
    assetApplyLink: string;
    pairs: IPairsParam[];
    chainRule: object;
}
export declare class Core {
    private themeColors;
    constructor(opts: ICoreProps);
    renderExchange(wrapper?: HTMLHtmlElement): void;
    renderHistory(wrapper?: HTMLHtmlElement): void;
    private clearRender;
}
export {};
//# sourceMappingURL=index.d.ts.map