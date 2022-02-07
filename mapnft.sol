// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NFTravel is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // キーがアドレス、バリューがtrue or false
    mapping(address => bool) Fees;
    //mapping(uint256 => bool) canTransfer;
    address payable public owner;

    constructor () ERC721 ("NFTravel", "NFTRAVEL") {}
    // choice関数2次流通の可能はtrue,不可はfalse 
    function choice(bool _canTransfer1) public {
        Fees[msg.sender] = _canTransfer1;
    }
    //　2次流通trueの人のみCAにデポジットできる
    function deposit() public payable {
        require(Fees[msg.sender]);
    }

    // 2次流通trueの人のmint関数
    //function secondmint(string memory tokenURI, bool _canTransfer) public returns (uint256) {
    function secondmint(string memory tokenURI) public returns (uint256) {        
        require(Fees[msg.sender]);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;

    }
    // 2次流通falseの人のmint関数
    function onlymint(string memory tokenURI) public returns (uint256) {
        require(Fees[msg.sender] == false);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    
    // _beforeTokenTransferフックの呼び出し
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        //require(from == address(0));
        if(from != address(0)) {
            // require(Fees[msg.sender] == false);
            //require(canTransfer[tokenId]);
            require(Fees[msg.sender]);
        }
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
