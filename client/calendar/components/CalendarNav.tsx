import { Box, Select } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { CalendarMonthOption, CalendarMonthYear } from "../types";

interface Props {
	optionMonths: CalendarMonthOption[];
	onChangeMonth: (month: CalendarMonthYear) => void;
	selectedMonth: CalendarMonthYear | null;
}

export const CalendarNav: React.FC<Props> = ({
	optionMonths,
	onChangeMonth,
	selectedMonth,
}) => {
	const onNextMonth = () => {
		const index = optionMonths.findIndex(
			(item) => item.value === selectedMonth,
		);
		const isLast = index === optionMonths.length - 1;
		if (!isLast) {
			const nextMonth = optionMonths.at(index + 1)?.value;
			if (nextMonth) {
				onChangeMonth(nextMonth);
			}
		}
	};

	const onPrevMonth = () => {
		const index = optionMonths.findIndex(
			(item) => item.value === selectedMonth,
		);
		const isFirst = index === 0;
		if (!isFirst) {
			const prevMonth = optionMonths.at(index - 1)?.value;
			if (prevMonth) {
				onChangeMonth(prevMonth);
			}
		}
	};
	return (
		<Box className="flex flex-row gap-1 p-4">
			<ActionIcon size="m" onClick={onPrevMonth}>
				<IconChevronLeft />
			</ActionIcon>
			<Select
				data={optionMonths}
				value={selectedMonth}
				onChange={(_value) => {
					if (_value) {
						onChangeMonth(_value as CalendarMonthYear);
					}
				}}
				className="w-48"
			/>

			<ActionIcon size="m" onClick={onNextMonth}>
				<IconChevronRight />
			</ActionIcon>
		</Box>
	);
};
