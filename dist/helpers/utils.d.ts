import { ThemeColors, IThemesConfig } from "./types";
export declare function getThemeColors(theme: string | ThemeColors): ThemeColors;
export declare function setThemeColors(theme: IThemesConfig): void;
export declare function escapeRegExp(string: string): string;
export declare function debounce(fn: () => void, wait: number): () => void;
export declare function throttle(fn: () => void, delay?: number): () => void;
export declare function isAddress(value: any): string | false;
export declare function toThousands(num: any): string;
//# sourceMappingURL=utils.d.ts.map