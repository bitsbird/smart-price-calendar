import { Text } from "@mantine/core";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import { useSettings } from "../SettingsContext";
import type { RoomPrices } from "../types";
interface Props {
	price: RoomPrices["price"];
	pricePMS: RoomPrices["pricePMS"];
}

export const CalendarItemPrices: React.FC<Props> = ({ price, pricePMS }) => {
	const { formatPrice } = useSettings();

	const isPriceUp = isSignificantIncrease(price, pricePMS);
	const isPriceDown = isSignificantDecrease(price, pricePMS);
	const isPrice = !isPriceDown && !isPriceUp && !!price;
	return (
		<>
			{isPriceUp && (
				<div className="flex flex-row mr-2">
					<Text className=" text-gray-800 text-sm  mr-2">
						Price: {formatPrice(price)}
					</Text>
					<div className="bg-green-200 rounded-full padding-x-20 padding-y-20">
						<IconArrowNarrowUp size={20} />
					</div>
				</div>
			)}

			{isPriceDown && (
				<div className="flex flex-row">
					<Text className=" text-gray-800 text-sm mr-2 text-nowrap">
						Price: {formatPrice(price)}
					</Text>
					<div className="bg-red-200 rounded-full padding-x-20 padding-y-20">
						<IconArrowNarrowDown size={20} />
					</div>
				</div>
			)}

			{isPrice && (
				<Text className=" text-gray-800 text-sm">
					Price: {formatPrice(price)}
				</Text>
			)}

			<Text className=" text-gray-800 text-sm">
				PricePMS: {formatPrice(pricePMS)}
			</Text>
		</>
	);
};

const isSignificantIncrease = (price: number, pricePMS: number): boolean => {
	const threshold = pricePMS * 1.04;
	return price > threshold;
};

const isSignificantDecrease = (price: number, pricePMS: number): boolean => {
	const threshold = pricePMS * 0.96;
	return price < threshold;
};
