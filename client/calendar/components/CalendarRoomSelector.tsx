import { Box, type ComboboxData, Select } from "@mantine/core";
interface Props {
	roomTypeOptions: ComboboxData;
	selectedRoomType: string | null;
	onChangeRoomType: (selected: string) => void;
}

export const CalendarRoomSelector: React.FC<Props> = ({
	roomTypeOptions,
	selectedRoomType,
	onChangeRoomType,
}) => {
	return (
		<div className="flex justify-center w-56 py-4">
			<Select
				data={roomTypeOptions}
				value={selectedRoomType}
				onChange={(_value) => {
					if (_value) {
						onChangeRoomType(_value);
					}
				}}
				className="w-48"
			/>
		</div>
	);
};
