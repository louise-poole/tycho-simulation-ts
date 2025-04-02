export interface SimulationClient {
    // Opaque client type
}

export interface SwapResult {
    poolAddress: string;
    amountsOut: bigint[];
    gasEstimates: bigint[];
    protocol: string;
}

export interface TychoSimulation {
    createClient: (
        url: string,
        apiKey?: string,
        tvlThreshold?: number,
        chain?: string,
        exchanges?: string[]
    ) => Promise<SimulationClient>;

    getAmountOut: (
        client: SimulationClient,
        tokenIn: string,
        tokenOut: string,
        amountsIn: bigint[]
    ) => Promise<SwapResult[]>;

    getSpotPrice(
        client: SimulationClient,
        token0: string,
        token1: string
    ): Promise<bigint>;
}
