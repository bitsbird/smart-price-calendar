import { Button } from "@mantine/core";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
export const QueryBoundary = ({ children, fallback }) => (
	<QueryErrorResetBoundary>
		{({ reset }) => (
			<ErrorBoundary
				onReset={reset}
				fallbackRender={({ resetErrorBoundary }) => (
					<div className="flex flex-col w-full bg-red-200 p-8">
						<h3 className="text-lg pb-4 text-center text-gray-700 font-semibold">
							{fallback}
						</h3>
						<div className="self-center">
							<Button onClick={() => resetErrorBoundary()}>Try Again</Button>
						</div>
					</div>
				)}
			>
				{children}
			</ErrorBoundary>
		)}
	</QueryErrorResetBoundary>
);
