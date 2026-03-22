import { TZDate } from "@date-fns/tz";
import type { Locale } from "date-fns";
import {
	addDays,
	format,
	getDaysInMonth,
	lastDayOfMonth,
	startOfMonth,
} from "date-fns";
import type { PriceData, SettingsData } from "../../types";
import type {
	CalendarDay,
	CalendarGridBlankColumn,
	CalendarGridExpiredColumn,
	CalendarMonthOption,
	CalendarMonthYear,
	RoomPrices,
	RoomType,
} from "./types";

export const toCalendarDays: (
	pricesData: PriceData,
	settings: SettingsData,
	dateLocale: Locale,
) => CalendarDay[] = (pricesData, settings, dateLocale) => {
	const { timezone } = settings.hotel;
	const { prices } = pricesData;

	const calendarDays = Object.entries(prices.data).map(
		([dayData, priceDataForDay]) => {
			const rooms: RoomPrices[] = Object.entries(priceDataForDay).map(
				([roomNumberData, pricesData]) => {
					return {
						id: roomNumberData,
						price: pricesData.error ? undefined : pricesData.price,
						pricePMS: pricesData.error ? undefined : pricesData.price_in_pms,
						isError: !!pricesData.error,
						errorReason: pricesData.error_reason,
					};
				},
			);
			const dateTZ = new TZDate(dayData, timezone);
			const calendarDay: CalendarDay = {
				dateTZ,
				monthTZ: dateTZ.getMonth(),
				yearTZ: dateTZ.getFullYear(),
				rooms,
			};
			return calendarDay;
		},
		[],
	);

	return calendarDays;
};

export const buildCalendarMonthOptions: (
	calendarDays: CalendarDay[],
	dateLocale: Locale,
) => CalendarMonthOption[] = (calendarDays, dateLocale) => {
	const optionsMap: Map<CalendarMonthYear, CalendarMonthOption> =
		calendarDays.reduce((acc, calendarDay) => {
			const monthYear = concatMonthYear(calendarDay);
			const localisedMonthName = format(calendarDay.dateTZ, "MMMM yyyy", {
				locale: dateLocale,
			});
			if (!acc.has(monthYear)) {
				acc.set(monthYear, {
					label: localisedMonthName,
					value: monthYear,
				});
			}
			return acc;
		}, new Map<CalendarMonthYear, CalendarMonthOption>());

	return [...optionsMap.values()];
};

export const filterCalendarByMonth: (
	calendarDays: CalendarDay[],
	monthTZ: number,
	yearTZ: number,
) => CalendarDay[] = (calendarDays, monthTZ, yearTZ) => {
	return calendarDays.filter(
		(item) => item.monthTZ === monthTZ && item.yearTZ === yearTZ,
	);
};

export const splitMontYear: (uniqueMonth: CalendarMonthYear) => {
	monthTZ: string;
	yearTZ: string;
} = (uniqueMonth) => {
	const [monthTZ, yearTZ] = uniqueMonth.split(":");
	return { monthTZ, yearTZ };
};

export const concatMonthYear: ({
	yearTZ,
	monthTZ,
}: CalendarDay) => CalendarMonthYear = ({ yearTZ, monthTZ }) => {
	return `${monthTZ}:${yearTZ}`;
};

export const createExpiredDaysColumns: (
	currentDate: TZDate,
) => CalendarGridExpiredColumn[] = (currentDate) => {
	const amount = currentDate.getDate() - 1;
	const startDate = startOfMonth(currentDate);
	const columns: Array<CalendarGridExpiredColumn> = Array(amount)
		.fill(null)
		.map((_, index) => {
			const dateTZ = addDays(startDate, index);
			return {
				key: dateTZ.toISOString(),
				dateTZ: dateTZ,
				type: "expired",
			};
		});
	return columns;
};

export const createEmptyDaysColumns: (
	currentDate: TZDate,
) => CalendarGridBlankColumn[] = (date) => {
	const totalDays = getDaysInMonth(date);
	const lastDay = lastDayOfMonth(date);
	const numRows = Math.ceil(getDaysInMonth(date) / 7);
	const amount = 7 * numRows - totalDays;
	const columns: Array<CalendarGridBlankColumn> = Array(amount)
		.fill(null)
		.map((_, index) => {
			const dateTZ = addDays(lastDay, index);
			return {
				key: dateTZ.toISOString(),
				type: "blank",
			};
		});
	return columns;
};

export const toRoomTypes: (rooms: SettingsData["rooms"]) => RoomType[] = (
	rooms,
) => {
	const { reference, derived } = rooms;

	const roomMapping = Object.entries(derived)
		.map(([id, { name }]) => {
			return { id, name, type: "derived" as const } as RoomType;
		})
		.concat({
			id: reference.id.toString(),
			name: reference.name,
			type: "reference" as const,
		});
	return roomMapping;
};
