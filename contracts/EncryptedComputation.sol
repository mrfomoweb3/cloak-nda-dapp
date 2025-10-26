// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/abstracts/EIP712WithModifier.sol";

/**
 * @title EncryptedComputation
 * @dev Handles complex encrypted computations for NDA verification
 * New contract for advanced fhEVM operations
 */
contract EncryptedComputation is EIP712WithModifier {
    
    // Storage for encrypted computation requests
    mapping(bytes32 => ComputationRequest) public requests;
    mapping(bytes32 => euint256) public results;

    struct ComputationRequest {
        bytes32 requestId;
        address requester;
        string operationType;
        uint256 createdAt;
        bool completed;
    }

    event ComputationRequested(
        bytes32 indexed requestId,
        address indexed requester,
        string operationType
    );

    event ComputationCompleted(
        bytes32 indexed requestId,
        uint256 timestamp
    );

    constructor() EIP712WithModifier("CloakNDAComputation", "1") {}

    /**
     * @dev Request encrypted computation
     * Initiates async fhEVM coprocessor operation
     */
    function requestEncryptedComputation(
        string memory _operationType,
        euint256 _operand1,
        euint256 _operand2
    ) public returns (bytes32) {
        bytes32 requestId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, _operationType)
        );

        requests[requestId] = ComputationRequest({
            requestId: requestId,
            requester: msg.sender,
            operationType: _operationType,
            createdAt: block.timestamp,
            completed: false
        });

        emit ComputationRequested(requestId, msg.sender, _operationType);
        return requestId;
    }

    /**
     * @dev Store result from fhEVM coprocessor
     * Callback function for async computation results
     */
    function storeComputationResult(
        bytes32 _requestId,
        euint256 _result
    ) public {
        require(requests[_requestId].requester != address(0), "Invalid request");
        require(!requests[_requestId].completed, "Already completed");

        results[_requestId] = _result;
        requests[_requestId].completed = true;

        emit ComputationCompleted(_requestId, block.timestamp);
    }

    /**
     * @dev Perform encrypted addition
     * Homomorphic addition without decryption
     */
    function encryptedAdd(
        euint256 _a,
        euint256 _b
    ) public pure returns (euint256) {
        return TFHE.add(_a, _b);
    }

    /**
     * @dev Perform encrypted subtraction
     * Homomorphic subtraction without decryption
     */
    function encryptedSub(
        euint256 _a,
        euint256 _b
    ) public pure returns (euint256) {
        return TFHE.sub(_a, _b);
    }

    /**
     * @dev Perform encrypted multiplication
     * Homomorphic multiplication without decryption
     */
    function encryptedMul(
        euint256 _a,
        euint256 _b
    ) public pure returns (euint256) {
        return TFHE.mul(_a, _b);
    }

    /**
     * @dev Perform encrypted comparison
     * Homomorphic comparison without decryption
     */
    function encryptedEq(
        euint256 _a,
        euint256 _b
    ) public pure returns (ebool) {
        return TFHE.eq(_a, _b);
    }

    /**
     * @dev Perform encrypted less than
     * Homomorphic less than without decryption
     */
    function encryptedLt(
        euint256 _a,
        euint256 _b
    ) public pure returns (ebool) {
        return TFHE.lt(_a, _b);
    }

    /**
     * @dev Get computation result
     */
    function getResult(bytes32 _requestId) public view returns (euint256) {
        require(requests[_requestId].completed, "Not completed");
        return results[_requestId];
    }

    /**
     * @dev Check if computation is completed
     */
    function isCompleted(bytes32 _requestId) public view returns (bool) {
        return requests[_requestId].completed;
    }
}
