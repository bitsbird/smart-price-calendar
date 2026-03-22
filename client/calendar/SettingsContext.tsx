import { type Locale, enUS } from "date-fns/locale";
import React, {
	createContext,
	useCallback,
	useContext,
	useState,
	type ReactNode,
} from "react";
import type { PriceData } from "../../types";

interface SettingsContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	setCurrencyCode: (currencyCode: HotelCurrencyCode) => void;
	formatPrice: (price: number) => string;
}

type HotelCurrencyCode = PriceData["currency"]["code"];

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [locale, setLocale] = useState<Locale>(enUS);
	const [currencyCode, setCurrencyCode] = useState<
		PriceData["currency"]["code"] | null
	>(null);

	const formatPrice = useCallback(
		(price: number) => {
			const formatter = new Intl.NumberFormat(locale.code, {
				style: "currency",
				currency: currencyCode || "USD",
				currencyDisplay: "symbol",
			});

			return formatter.format(price);
		},
		[locale.code, currencyCode],
	);
	return (
		<SettingsContext.Provider
			value={{ locale, setLocale, setCurrencyCode, formatPrice }}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}

	return context;
};
