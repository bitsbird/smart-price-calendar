import { useSuspenseQuery } from "@tanstack/react-query";
import { getPrices } from "./api";

export const useQueryHotelPrices = () => {
	const { data: priceData } = useSuspenseQuery({
		queryKey: ["prices"],
		queryFn: getPrices,
	});

	return { priceData };
};
