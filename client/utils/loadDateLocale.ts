import type { Locale } from "date-fns";

let localeData: Locale = null;
let localePromise: Promise<void> | null = null;
let localeError: Error = null;

export function loadDateLocale(localeCode: string) {
	if (localeData) return localeData;
	console.log(localeData);
	if (localeError) throw localeError;

	if (!localePromise) {
		localePromise = import(
			`../../node_modules/date-fns/locale/${localeCode}.js`
		)
			.then((module) => {
				localeData = module.default || module;
			})
			.catch((err) => {
				localeError = err;
			});
	}

	throw localePromise;
}
