import { Text } from "@mantine/core";
import { IconCalendarOff } from "@tabler/icons-react";
import { format } from "date-fns";
import { useSettings } from "../SettingsContext";
import {
	type CalendarGridColumn,
	type CalendarGridExpiredColumn,
	type CalendarGridPriceColumn,
	ErrorReason,
} from "../types";
import { CalendarItemPrices } from "./CalendarItemPrices";
import { CalendarItemPricesError } from "./CalendarItemPricesError";
interface Props {
	item: CalendarGridColumn;
}
export const CalendarGridItem: React.FC<Props> = ({ item }) => {
	return item.type === "blank" ? (
		<BlankItem item={item} />
	) : (
		<div
			key={item.key}
			className="flex flex-1 border-r border-b border-gray-300 aspect-[5/1] lg:aspect-square"
		>
			{item.type === "price" ? (
				<Prices calendarDay={item.calendarDay} />
			) : (
				<Expired dateTZ={item.dateTZ} />
			)}
		</div>
	);
};

const Expired: React.FC<Pick<CalendarGridExpiredColumn, "dateTZ">> = ({
	dateTZ,
}) => {
	const { locale } = useSettings();
	return (
		<div className="flex flex-col basis-full bg-gray-200 relative px-4">
			<div>
				<HeaderText>
					{format(dateTZ, "EEE dd", { locale, weekStartsOn: 1 })}
				</HeaderText>
			</div>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<IconCalendarOff size={48} className="text-white items-stretch" />
			</div>
		</div>
	);
};

const Prices: React.FC<Pick<CalendarGridPriceColumn, "calendarDay">> = ({
	calendarDay,
}) => {
	const { locale } = useSettings();
	const { price, pricePMS, isError, errorReason } = calendarDay.room;

	return (
		<div className="flex flex-col basis-full px-4">
			<div className="">
				<HeaderText>
					{format(calendarDay.dateTZ, "EEE dd", { locale, weekStartsOn: 1 })}
				</HeaderText>
			</div>
			<div>
				{isError ? (
					<CalendarItemPricesError errorReason={errorReason} />
				) : (
					<CalendarItemPrices price={price} pricePMS={pricePMS} />
				)}
			</div>
		</div>
	);
};

const BlankItem = (item) => {
	return (
		<div
			key={item.key}
			className="hidden lg:flex flex-1 border-r border-b border-gray-300 aspect-[6/1] lg:visible lg:aspect-square"
		/>
	);
};

const HeaderText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<Text className="font-semibold text-gray-800 mb-4 mt-4">{children}</Text>
	);
};
