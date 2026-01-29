const hre = require("hardhat");

async function main() {
  // REPLACE this with the output from node generate_root.js
  const merkleRoot = "0x0000000000000000000000000000000000000000000000000000000000000000"; 

  if (merkleRoot === "0x0000000000000000000000000000000000000000000000000000000000000000") {
    console.warn("WARNING: Using empty Merkle Root. Run generate_root.js first!");
  }

  const MerkleNFT = await hre.ethers.getContractFactory("MerkleNFT");
  const nft = await MerkleNFT.deploy(merkleRoot);

  await nft.waitForDeployment();

  console.log("MerkleNFT deployed to:", nft.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
