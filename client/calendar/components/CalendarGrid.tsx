import {
	createEmptyDaysColumns,
	createExpiredDaysColumns,
} from "../calendarUtils";
import type {
	CalendarDayRoom,
	CalendarGridColumn,
	CalendarGridPriceColumn,
} from "../types";
import { CalendarGridItem } from "./CalendarGridItem";
interface Props {
	calendarDays: CalendarDayRoom[];
}

export const CalendarGrid: React.FC<Props> = ({ calendarDays }) => {
	const { dateTZ } = calendarDays.at(0);
	const expiredColumns = createExpiredDaysColumns(dateTZ);
	const priceColumns: CalendarGridPriceColumn[] = calendarDays.map(
		(calendarDay) => {
			return {
				key: calendarDay.dateTZ.toISOString(),
				type: "price",
				calendarDay,
			};
		},
	);
	const blankColums = createEmptyDaysColumns(dateTZ);
	const gridColumns: CalendarGridColumn[] = [
		...expiredColumns,
		...priceColumns,
		...blankColums,
	];
	return (
		<div className="grid grid-cols-1 lg:grid-cols-7 border-l border-t border-gray-300">
			{gridColumns.map((column) => (
				<CalendarGridItem key={column.key} item={column} />
			))}
		</div>
	);
};
