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
	if (!calendarDays.length || calendarDays.length === 0) {
		return (
			<div className="grid grid-cols-1 lg:grid-cols-7 border-l border-t border-gray-300" />
		);
	}

	const firstDay = calendarDays.at(0);
	const expiredColumns = createExpiredDaysColumns(firstDay.dateTZ);
	const priceColumns: CalendarGridPriceColumn[] = calendarDays.map(
		(calendarDay) => {
			return {
				key: calendarDay.dateTZ.toISOString(),
				type: "price",
				calendarDay,
			};
		},
	);
	const blankColums = createEmptyDaysColumns(firstDay.dateTZ);
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
