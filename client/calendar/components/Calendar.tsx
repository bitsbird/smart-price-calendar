import { Box, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { loadDateLocale } from "../../utils/loadDateLocale";
import { useQueryHotelPrices } from "../../hooks/useQueryHotelPrices";
import { useQueryHotelSettings } from "../../hooks/useQueryHotelSettings";
import { useSettings } from "../SettingsContext";
import type { CalendarDay, CalendarDayRoom, CalendarMonthYear } from "../types";
import {
	buildCalendarMonthOptions,
	filterCalendarByMonth,
	splitMontYear,
	toCalendarDays,
	toRoomTypes,
} from "./../calendarUtils";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarNav } from "./CalendarNav";
import { CalendarRoomSelector } from "./CalendarRoomSelector";
const Calendar = () => {
	const { priceData } = useQueryHotelPrices();
	const { settings } = useQueryHotelSettings();
	const dateLocale = loadDateLocale(settings.hotel.locale);
	const { setLocale, setCurrencyCode } = useSettings();
	setLocale(dateLocale);
	setCurrencyCode(priceData.currency.code);
	const calendarDays = useMemo(() => {
		return toCalendarDays(priceData, settings, dateLocale);
	}, [priceData, settings, dateLocale]);
	const [selectedMonth, setSelectedMonth] = useState<CalendarMonthYear | null>(
		null,
	);
	const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);

	const calendarMonthOptions = useMemo(() => {
		const options = buildCalendarMonthOptions(calendarDays, dateLocale);
		const defaultMonth = options[0].value;
		setSelectedMonth(defaultMonth);
		return options;
	}, [calendarDays, dateLocale]);

	const roomTypeOptions = useMemo(() => {
		const roomTypes = toRoomTypes(settings.rooms);
		const options = roomTypes.map((roomType) => {
			return { label: roomType.name, value: roomType.id };
		});
		const defaultSelected = roomTypes.find(
			(roomType) => roomType.type === "reference",
		);
		setSelectedRoomType(defaultSelected.id);
		return options;
	}, [settings.rooms]);

	const onChangeRoomType = (roomType: string) => {
		setSelectedRoomType(roomType);
	};

	const selectedMonthCalendarDays: CalendarDay[] | null = useMemo(() => {
		if (!selectedMonth) return null;
		const { monthTZ, yearTZ } = splitMontYear(selectedMonth);
		return filterCalendarByMonth(
			calendarDays,
			Number.parseInt(monthTZ),
			Number.parseInt(yearTZ),
		);
	}, [calendarDays, selectedMonth]);

	const filteredCalendarDays: CalendarDayRoom[] | null = useMemo(() => {
		if (!selectedMonthCalendarDays || !selectedRoomType) return;
		const filtered = selectedMonthCalendarDays.map((calendarDay) => {
			const room = calendarDay.rooms.find(
				(room) => room.id === selectedRoomType,
			);
			const { rooms, ...calendarDayProps } = calendarDay;
			return { ...calendarDayProps, room };
		});
		return filtered;
	}, [selectedMonthCalendarDays, selectedRoomType]);

	const onChangeMonth = (month: CalendarMonthYear) => {
		setSelectedMonth(month);
	};

	return (
		<div>
			<Box mb={16}>
				<Text tt={"uppercase"} size="xl" c="blue" fw={700}>
					room prices calendar
				</Text>
			</Box>
			<Box className="flex flex-col md:flex-row basis-full bg-gray-300 rounded-t-lg">
				<CalendarNav
					optionMonths={calendarMonthOptions}
					selectedMonth={selectedMonth}
					onChangeMonth={onChangeMonth}
				/>
				<Box className="md:flex-grow md:justify-items-end">
					<CalendarRoomSelector
						onChangeRoomType={onChangeRoomType}
						roomTypeOptions={roomTypeOptions}
						selectedRoomType={selectedRoomType}
					/>
				</Box>
			</Box>
			<div>
				<CalendarGrid calendarDays={filteredCalendarDays} />
			</div>
		</div>
	);
};

export { Calendar };
