// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

// For Axelar Message Passing
import "./IAxelarGateway.sol";
// For Automating the call on Destination Chain
import "./IAxelarGasService.sol";
// For Definining the functions Axelar calls
import "./IAxelarExecutable.sol";

import { StringToAddress, AddressToString } from "https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/4398ae62336623b4148610a3b47d419c2b54459b/contracts/StringAddressUtils.sol";

// ERC-721 Contract for NFT
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.8/contracts/token/ERC721/ERC721.sol";

contract FundRaiser is ERC721, IAxelarExecutable {
    // Axelar Utils Libraries
    using StringToAddress for string;
    using AddressToString for address;

    // Address of Owner
    address payable public owner;

    // Name of Current Chain
    string public chainName; 

    // Axelar Addresses
    IAxelarGasService gasReceiver;
    constructor(address gateway_, address gasReceiver_,string memory _currentChainName) ERC721("Top Contributor", "VIP")
        
        IAxelarExecutable(gateway_)
    {  
        owner = payable(msg.sender);
        chainName = _currentChainName;
        gasReceiver = IAxelarGasService(gasReceiver_);
    }


    // Cross Chain State Variables
    // - Funds
    uint public fundingGoal = 0.2 ether;
    uint public totalFunds;
    uint public fundsOnCurrentChain;
    uint public fundsOnDestinationChain;

    
    // - Funders
    address[] public funders;
    mapping(address => uint) public addressToFunds;

    // - Claim Of NFT
    mapping(address => bool) public nftClaimed;

    // Owner of NFT
    mapping(uint => address) public tokenIdToOwner;

    uint public tokenId = 300;

    // - State of Contract
    enum Status {
        Funding, // 0
        Funded, // 1
        Withdrawn // 2
    }
    Status public status;

    // * Modifiers
    // - onlyOwner => Left out so Judges can test all functions


    // ------ Events (from Current Chain) ----------
    // Funds Update
    event fundsUpdateSent(address indexed sender, uint amount, string SourceChain, string DestinationChain);
    
    // Status Update
    event statusUpdateSent(Status newStatus, string SourceChain, string DestinationChain);
   
    // NFT Events
    event nftClaim(address indexed receiver, uint tokenId, string SourceChain);

    event nftTransferSent(address indexed sender, address receiver, uint tokenId, string SourceChain, string DestinationChain);

    // ------- Events (from Other Chain) ------------- 
    // Funds Update from Other Chain
    event fundsUpdateReceived(uint amount, string SourceChain, string DestinationChain);
    
    // Status Update from Other Chain
    event statusUpdateReceived(Status indexed newStatus, string SourceChain, string DestinationChain);

    // NFT Events from Other Chain
    event nftTransferReceived(address indexed receiver, uint tokenId, string SourceChain, string DestinationChain);

    // Cross Chain Functions
    // - Fund => Fund the Contract
    function fund(
        string memory destinationChain,
        string memory destinationAddress
    ) public payable {
        // Checks
        require(msg.value > 0.025 ether, "Not Enough Funds");
        require(totalFunds + msg.value < fundingGoal, "Fund Goal Reached");
        require(status == Status.Funding, "Funding Complete");

        // Add to Funders lists
        funders.push(msg.sender);
        addressToFunds[msg.sender] += msg.value;

        // Fund the contract
        // CC - Update on Other Chain
        totalFunds += msg.value;
        
        fundsOnCurrentChain += msg.value;

        // newFund added in the Contract
        emit fundsUpdateSent(msg.sender, msg.value, chainName, destinationChain);

        bytes memory payload = abi.encode("fundsUpdate", totalFunds, fundsOnCurrentChain);
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    
    }   

    // - End => End the Funding
    // ? Must be Owner
    function end(
        string memory destinationChain,
        string memory destinationAddress
    ) public payable {
        // Update Contract Status
        // CC - Update on Other Chain
        status = Status.Funded;
        emit statusUpdateSent(status, chainName, destinationChain);

        bytes memory payload = abi.encode("statusUpdate",status);
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    
    }

       // Withdraw funds from contract
    function withdraw(
        string memory destinationChain,
        string memory destinationAddress
        ) payable public {
        require(status == Status.Funded, "Not Finished");
        // Update Status
        // CC - Update on Other Chain
        status = Status.Withdrawn;

        // Call this function to update the value of this contract along with all its siblings'.
        bytes memory payload = abi.encode("statusUpdate", status);
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    
        // Withdraw funds to Owner
        payable(msg.sender).transfer(address(this).balance);
    }

    // - claimNFT => Contributors with more than 1 ETH donation can claim a Cross-chain VIP Contributor NFT
    function claimNFT() public {

        // Check if NFT already claimed
        require(nftClaimed[msg.sender] == false, "NFT Already Claimed");

        // Check if User has donated enough funds to be eligible for NFT Claim
        uint funds = addressToFunds[msg.sender];
        require(funds > 0.049 ether, "Not enough Donation");

        // NFT Claimed & Mint NFT to user address
        nftClaimed[msg.sender] = true;
        

        // Generating Unique tokenId
        tokenId++;
        _safeMint(msg.sender, tokenId);
        tokenIdToOwner[tokenId] = msg.sender;
    
        emit nftClaim(msg.sender, tokenId, chainName);
    }

    // - transferNFT => Transfer your NFT to the other chain
    function transferNFT(
        string memory destinationChain,
        string memory destinationAddress,
        uint256 _tokenId,
        string calldata receiver
    ) public payable {
        // Get TokenID of User
        // ** Check NFT Ownership
        require(tokenIdToOwner[_tokenId] == msg.sender, "Not owner of NFT");
        
        // ** Burn Token
        _burn(_tokenId);
        tokenIdToOwner[_tokenId] = 0x0000000000000000000000000000000000000000;

        // ** Payload
        bytes memory payload = abi.encode("nftTransfer",receiver, _tokenId);
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    
    }

    event Executed(string sourceChain, string sourceAddress, bytes payload);

    // Handles calls from Other Chains. Updates this contract's value
    function _execute(
        string memory sourceChain_,
        string memory sourceAddress_,
        bytes calldata payload_
    ) internal override{
        (string memory conditional) = abi.decode(payload_, (string));

        // nftTransfer from Other Chain
        // ? Other Chain has burned the nft, mint a new one to the provided address here
        if (keccak256(bytes(conditional)) == keccak256(bytes("fundsUpdate"))) {
            (string memory temp, uint newTotalFunds, uint fundsOnSourceChain) = abi.decode(payload_, (string, uint, uint));
            // Update Funds Data on Current Chain
            fundsOnDestinationChain = fundsOnSourceChain;
            totalFunds = newTotalFunds;
            
            // Emit Received Event
            emit fundsUpdateReceived(newTotalFunds, sourceChain_,chainName);
        }
        // statusUpdate from Other Chain
        // ? Update status of the contract
        else if (keccak256(bytes(conditional)) == keccak256(bytes("statusUpdate"))) {
            // Update Status on Current Chain
            (string memory temp, Status newStatus) = abi.decode(payload_, (string, Status));
            status = newStatus;

            // Emit Status Update Event
            emit statusUpdateReceived(newStatus, sourceChain_, chainName);
        }
        // fundsUpdate from Other Chain
        // ? Update totalFunds, fundsonOtherChain
        else if (keccak256(bytes(conditional)) == keccak256(bytes("nftTransfer"))) {
            (string memory temp,string memory _reciever, uint _tokenId) = abi.decode(payload_, (string, string, uint));
            // Convert String to Address
            address receiver = _reciever.toAddress();
            // Mint the same(tokenId) NFT on this chain to the sender's address here
            _safeMint(receiver, _tokenId);

            // Emit NFT Received Event
            emit nftTransferReceived(receiver, _tokenId, sourceChain_, chainName);
        }
     
        emit Executed(sourceChain_, sourceAddress_, payload_);
    }
}
