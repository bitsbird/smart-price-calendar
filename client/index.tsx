/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";
import "./index.css";
import { Box, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { SettingsProvider } from "./calendar/SettingsContext";
import { Calendar } from "./calendar/components/Calendar";
import { LoadingFallback } from "./components/LoadingFallback";
import { QueryBoundary } from "./components/QueryBoundary";
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<QueryBoundary fallback="Something went wrong on our system">
					<Suspense fallback={<LoadingFallback />}>
						<SettingsProvider>
							<Box p="sm">
								<Calendar />
							</Box>
						</SettingsProvider>
					</Suspense>
				</QueryBoundary>
			</MantineProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
