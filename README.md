# Tycho Simulation TypeScript

TypeScript bindings for the Tycho simulation engine, providing DeFi protocol simulation capabilities.

## Features

- Spot price calculations for various DeFi protocols
- Support for Uniswap V2, V3, Curve, and Balancer pools
- Gas estimation for swaps
- TVL-based pool filtering

## Installation

1. Prerequisites:
   - Node.js 16.x or higher
   - Rust toolchain (latest stable)
   - Cargo package manager

2. Clone the repository:
```bash
git clone https://github.com/dewiz-xyz/tycho-simulation-ts.git
cd tycho-simulation-ts
```

3. Install dependencies:
```bash
npm install
```

4. Build the project:
```bash
npm run build-all
```

## Usage

1. Create a `.env` file in the project root with your Tycho API key:
```env
TYCHO_API_KEY=your_api_key_here
```

2. Run the spot price example:
```bash
npm run example
```

### Running the Spot Price Example

The spot price example demonstrates how to fetch prices between USDC and WETH:

```typescript
// examples/spot_price.ts
import { createClient } from '../';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
  // USDC and WETH addresses on Ethereum mainnet
  const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
  const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

  // Create client with your API key
  const client = await createClient(
    'https://api.tycho.xyz',
    process.env.TYCHO_API_KEY
  );

  // Get spot price
  const price = await client.getSpotPrice(USDC, WETH);
  console.log(`Current USDC/WETH price: ${price}`);

  // Get amounts out for different USDC amounts
  const amounts = [1000000, 10000000, 100000000]; // 1, 10, 100 USDC
  const result = await client.getAmountOut(USDC, WETH, amounts);
  
  console.log('\nSwap simulations:');
  result.forEach((pool, i) => {
    console.log(`\nPool ${i + 1} (${pool.poolAddress}):`);
    pool.amountsOut.forEach((amount, j) => {
      console.log(`${amounts[j] / 1e6} USDC -> ${amount / 1e18} WETH (Gas: ${pool.gasEstimates[j]})`);
    });
  });
}

main().catch(console.error);
```

To run this example:

1. Make sure you have a valid Tycho API key in your `.env` file
2. Build the project: `npm run build-all`
3. Run the example: `npm run example`

Expected output:
```
Current USDC/WETH price: 0.000625

Swap simulations:

Pool 1 (0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640):
1 USDC -> 0.000621 WETH (Gas: 90000)
10 USDC -> 0.006198 WETH (Gas: 90000)
100 USDC -> 0.061734 WETH (Gas: 90000)
```

### API Example

```typescript
import { createClient } from 'tycho-simulation-ts';

// Initialize the client
const client = await createClient('https://api.tycho.xyz', 'your_api_key');

// Get spot price between two tokens
const spotPrice = await client.getSpotPrice(
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'  // WETH
);

// Get amount out for a swap
const amountsOut = await client.getAmountOut(
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  [1000000] // Amount in (6 decimals for USDC)
);
```

## Development

- Build Rust library: `npm run build`
- Copy library files: `npm run copy-lib`
- Build everything: `npm run build-all`
- Run example: `npm run example`

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 