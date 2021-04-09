import { themesList } from "../themes";
import { getAddress } from '@ethersproject/address';
import {
	ThemeColors,
	IThemesConfig
} from "./types";

export function getThemeColors(theme: string | ThemeColors): ThemeColors  {
	// @ts-ignore
	return typeof theme === "string" ? themesList[theme].colors : themesList['default'].colors;
}

export function setThemeColors(theme: IThemesConfig): void{
	 themesList[theme.name] = {
		 name: theme.name,
		 colors: theme.colors
	 };
}

export function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function debounce(fn:() => void, wait: number){
	let timer: any = null;
	return function(){
		if(timer !== null){
			clearTimeout(timer);
		}
		timer = setTimeout(fn,wait);
	}
}

export function throttle(fn: () => void,  delay = 1000) {
	let prevTime = Date.now();
	return function () {
		let curTime = Date.now();
		if (curTime - prevTime > delay) {
			// @ts-ignore
			fn.apply(this, arguments);
			prevTime = curTime;
		}
	};
}

export function isAddress(value: any): string | false {
	try {
		return getAddress(value)
	} catch {
		return false
	}
}

export function toThousands(num: any) {
	var initNum = (num || 0).toString(), result = '', formatNum = '';
	if (initNum.indexOf('.') > -1) formatNum = (num || 0).toString().split('.')
	var num = formatNum ? formatNum[0] : initNum;
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	if (num) { result = formatNum ? num + result + '.' + formatNum[1] : num + result; }
	return result;
}
