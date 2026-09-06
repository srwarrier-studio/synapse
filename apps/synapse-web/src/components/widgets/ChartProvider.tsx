import { createContext, useContext } from "react";
import type { ChartAdapter } from "./chart-adapter";
import { reactChartsAdapter } from "./adapters/react-charts-adapter";

const ChartAdapterContext = createContext<ChartAdapter>(reactChartsAdapter);

interface ChartProviderProps {
	adapter?: ChartAdapter;
	children: React.ReactNode;
}

export function ChartProvider({ adapter = reactChartsAdapter, children }: ChartProviderProps) {
	return (
		<ChartAdapterContext.Provider value={adapter}>
			{children}
		</ChartAdapterContext.Provider>
	);
}

export function useChartAdapter(): ChartAdapter {
	return useContext(ChartAdapterContext);
}
