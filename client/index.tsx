/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";
import "./index.css";

import { Box, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RoomPriceGenieLogo } from "./roompricegenie-logo";
import { Calendar } from './components/calendar/Calendar';
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<Box p="sm">
					<RoomPriceGenieLogo />
				</Box>
				<Calendar/>
			</MantineProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
