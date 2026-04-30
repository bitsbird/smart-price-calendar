import { Box, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
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

	useEffect(() => {
		setLocale(dateLocale);
	}, [dateLocale, setLocale]);

	useEffect(() => {
		setCurrencyCode(priceData.currency.code);
	}, [priceData.currency.code, setCurrencyCode]);
	const calendarDays = useMemo(() => {
		return toCalendarDays(priceData, settings, dateLocale);
	}, [priceData, settings, dateLocale]);
	const [selectedMonth, setSelectedMonth] = useState<CalendarMonthYear | null>(
		null,
	);
	const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);

	const calendarMonthOptions = useMemo(() => {
		return buildCalendarMonthOptions(calendarDays, dateLocale);
	}, [calendarDays, dateLocale]);

	const roomTypeOptions = useMemo(() => {
		const roomTypes = toRoomTypes(settings.rooms);
		return roomTypes.map((roomType) => {
			return { label: roomType.name, value: roomType.id };
		});
	}, [settings.rooms]);

	const defaultMonth = calendarMonthOptions.at(0)?.value ?? null;
	const defaultSelectedRoomType = useMemo(() => {
		const roomTypes = toRoomTypes(settings.rooms);
		return roomTypes.find((roomType) => roomType.type === "reference")?.id ?? null;
	}, [settings.rooms]);

	useEffect(() => {
		if (!selectedMonth && defaultMonth) {
			setSelectedMonth(defaultMonth);
		}
	}, [selectedMonth, defaultMonth]);

	useEffect(() => {
		if (!selectedRoomType && defaultSelectedRoomType) {
			setSelectedRoomType(defaultSelectedRoomType);
		}
	}, [selectedRoomType, defaultSelectedRoomType]);

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
		if (!selectedMonthCalendarDays || !selectedRoomType) return null;
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
				<CalendarGrid calendarDays={filteredCalendarDays ?? []} />
			</div>
		</div>
	);
};

export { Calendar };
