import { Box, Select } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { CalendarMonthOption } from "../types";

interface Props {
	optionMonths: CalendarMonthOption[];
	onChangeMonth: (month: string) => void;
	selectedMonth: string;
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
			onChangeMonth(optionMonths.at(index + 1).value);
		}
	};

	const onPrevMonth = () => {
		const index = optionMonths.findIndex(
			(item) => item.value === selectedMonth,
		);
		const isFirst = index === 0;
		if (!isFirst) {
			onChangeMonth(optionMonths.at(index - 1).value);
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
				onChange={(_value) => onChangeMonth(_value)}
				className="w-48"
			/>

			<ActionIcon size="m" onClick={onNextMonth}>
				<IconChevronRight />
			</ActionIcon>
		</Box>
	);
};
