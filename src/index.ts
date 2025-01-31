import { TychoSimulation, SwapResult } from './types';

const tychoSim = require('../index.node') as TychoSimulation;

export const createClient = async (
    tychUrl: string = "tycho-beta.propellerheads.xyz",
    apiKey: string,
    tvlThreshold: number = 1000
) => {
    const client = await tychoSim.createClient(
        tychUrl,
        apiKey,
        tvlThreshold
    );
    console.log("Tycho Simulation Client created successfully");


    return {
        getAmountsOut: (tokenIn: string, tokenOut: string, amountsIn: bigint[]): Promise<SwapResult[]> => 
            tychoSim.getAmountOut(client, tokenIn, tokenOut, amountsIn),

        getSpotPrice: (tokenIn: string, tokenOut: string) => 
            tychoSim.getSpotPrice(client, tokenIn, tokenOut)
    }
}