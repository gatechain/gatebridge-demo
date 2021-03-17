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
    renderExchange(wrapper?: HTMLHtmlElement): Promise<void>;
    renderHistory(wrapper?: HTMLHtmlElement): Promise<void>;
    private clearRender;
}
export {};
//# sourceMappingURL=index.d.ts.map