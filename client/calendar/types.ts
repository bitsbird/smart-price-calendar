import type { TZDate } from "@date-fns/tz";

export interface CalendarDay {
	dateTZ: TZDate;
	yearTZ: number;
	monthTZ: number;
	rooms: RoomPrices[];
}

export interface CalendarDayRoom {
	dateTZ: TZDate;
	yearTZ: number;
	monthTZ: number;
	room: RoomPrices;
}

export type CalendarMonthYear =
	`${CalendarDay["monthTZ"]}:${CalendarDay["yearTZ"]}`;

export interface RoomPrices {
	id: string;
	price?: number;
	pricePMS?: number;
	isError: boolean;
	errorReason?: string;
}
export interface RoomType {
	id: string;
	name: string;
	type: "reference" | "derived";
}

export interface CalendarMonthOption {
	label: string;
	value: CalendarMonthYear;
}
interface CalendarGridBaseColumn {
	key: string;
}
export interface CalendarGridBlankColumn extends CalendarGridBaseColumn {
	type: "blank";
}

export interface CalendarGridExpiredColumn extends CalendarGridBaseColumn {
	dateTZ: TZDate;
	type: "expired";
}

export interface CalendarGridPriceColumn extends CalendarGridBaseColumn {
	type: "price";
	calendarDay: CalendarDayRoom;
}

export type CalendarGridColumn =
	| CalendarGridBlankColumn
	| CalendarGridExpiredColumn
	| CalendarGridPriceColumn;

export enum ErrorReason {
	NoMarketData = "NO_AVAILABLE_MARKET_DATA",
}
