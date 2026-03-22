import { Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { ErrorReason, type RoomPrices } from "../types";

interface Props {
	errorReason: RoomPrices["errorReason"];
}
export const CalendarItemPricesError: React.FC<Props> = ({ errorReason }) => {
	const noMarketData = ErrorReason.NoMarketData === errorReason;
	return (
		<>
			{noMarketData ? (
				<div className="flex items-center mr-2">
					<IconAlertTriangle size={48} className="text-red-300 items-stretch" />
					<Text className=" text-gray-800 text-sm ml-2">
						Marked data is not available
					</Text>
				</div>
			) : (
				<div className="flex items-center">
					<IconAlertTriangle size={48} className="text-red-300 items-stretch" />
					<Text className=" text-gray-800 text-sm ml-2">
						Something went wrong
					</Text>
				</div>
			)}
		</>
	);
};
