// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MerkleNFT is ERC721, Ownable {
    bytes32 public merkleRoot;
    uint256 public nextTokenId;
    uint256 public constant MINT_PRICE = 0.01 ether;
    
    mapping(address => bool) public hasMinted;

    constructor(bytes32 _merkleRoot) ERC721("MerkleNFT", "MNFT") Ownable(msg.sender) {
        merkleRoot = _merkleRoot;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function whitelistMint(bytes32[] calldata proof) external payable {
        require(!hasMinted[msg.sender], "Already minted");
        require(msg.value >= MINT_PRICE, "Insufficient funds");

        // Verify Merkle Proof
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid Merkle Proof");

        hasMinted[msg.sender] = true;
        nextTokenId++;
        _safeMint(msg.sender, nextTokenId);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
