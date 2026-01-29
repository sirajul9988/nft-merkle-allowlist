const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Example Whitelist Addresses
const whitelistAddresses = [
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const rootHash = merkleTree.getHexRoot();

console.log("-----------------------------------------");
console.log("Merkle Root:", rootHash);
console.log("-----------------------------------------");

// Example of generating a proof for the first address
const claimingAddress = whitelistAddresses[0];
const hexProof = merkleTree.getHexProof(keccak256(claimingAddress));
console.log(`Proof for ${claimingAddress}:`);
console.log(JSON.stringify(hexProof));
