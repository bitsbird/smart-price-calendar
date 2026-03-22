import { useSuspenseQuery } from "@tanstack/react-query";
import { getSettings } from "./api";

export const useQueryHotelSettings = () => {
	const { data: settings } = useSuspenseQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});

	return { settings };
};
