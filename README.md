# NFT Merkle Allowlist

This repository demonstrates how to implement a gas-efficient allowlist for NFT minting using Merkle Proofs. Instead of storing thousands of addresses in a smart contract mapping (which is expensive), we store a single 32-byte cryptographic root.

## Features
- **ERC-721 Standard:** Fully compliant Non-Fungible Token.
- **Merkle Proofs:** Verify allowlist status off-chain and validate on-chain.
- **Gas Efficient:** O(1) storage cost regardless of allowlist size.

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
