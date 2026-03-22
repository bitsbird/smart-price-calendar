import { Box, LoadingOverlay } from "@mantine/core";
export const LoadingFallback = () => {
	return (
		<Box className="flex flex-1">
			<LoadingOverlay
				visible
				zIndex={1000}
				overlayProps={{ radius: "sm", blur: 2 }}
				loaderProps={{ color: "blue", type: "bars" }}
			/>
		</Box>
	);
};
