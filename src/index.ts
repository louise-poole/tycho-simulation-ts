import { TychoSimulation, SwapResult } from "./types";

const tychoSim = require("../index.node") as TychoSimulation;

interface TychoClient {
    getAmountsOut: (
        tokenIn: string,
        tokenOut: string,
        amountsIn: bigint[]
    ) => Promise<SwapResult[]>;
    getSpotPrice: (tokenIn: string, tokenOut: string) => Promise<bigint>;
}

export const createClient = async (
    tychoUrl: string = "tycho-beta.propellerheads.xyz",
    apiKey: string,
    tvlThreshold: number = 1000,
    chain: string = "ethereum",
    exchanges: string[] = ["uniswap_v2", "uniswap_v3", "sushiswap_v2", "pancakeswap_v3"]
): Promise<TychoClient> => {
    const client = await tychoSim.createClient(
        tychoUrl,
        apiKey,
        tvlThreshold,
        chain,
        exchanges
    );
    console.log("Tycho Simulation Client created successfully");

    return {
        getAmountsOut: (
            tokenIn: string,
            tokenOut: string,
            amountsIn: bigint[]
        ): Promise<SwapResult[]> =>
            tychoSim.getAmountOut(client, tokenIn, tokenOut, amountsIn),

        getSpotPrice: (tokenIn: string, tokenOut: string): Promise<bigint> =>
            tychoSim.getSpotPrice(client, tokenIn, tokenOut),
    };
};
