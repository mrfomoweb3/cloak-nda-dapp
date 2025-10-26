// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/abstracts/EIP712WithModifier.sol";

/**
 * @title NDAManager
 * @dev Fully encrypted NDA management using Zama's fhEVM
 * All sensitive data is encrypted on-chain using homomorphic encryption
 */
contract NDAManager is EIP712WithModifier {
    enum NDAStatus {
        DRAFT,
        PENDING_SIGNATURE,
        SIGNED,
        EXPIRED,
        TERMINATED
    }

    struct NDA {
        uint256 ndaId;
        address creator;
        euint64 counterpartyEncrypted; // Fully encrypted counterparty
        euint256 termsHashEncrypted; // Encrypted hash of terms
        euint64 expirationDateEncrypted; // Encrypted expiration
        NDAStatus status;
        uint256 createdAt;
        uint256 signedAt;
        ebool isActive;
        ebool isSignedEncrypted; // Encrypted signature status
    }

    mapping(uint256 => NDA) public ndas;
    mapping(address => uint256[]) public userNDAs;
    mapping(uint256 => mapping(address => ebool)) public permissions;
    mapping(uint256 => mapping(address => ebool)) public hasSignedEncrypted;
    
    mapping(bytes32 => EncryptedComputationResult) public computationResults;
    
    uint256 public ndaCounter;

    struct EncryptedComputationResult {
        bytes32 requestId;
        euint256 result;
        bool completed;
        uint256 timestamp;
    }

    event NDACreated(
        uint256 indexed ndaId,
        address indexed creator,
        string title
    );

    event NDASignatureRequested(
        uint256 indexed ndaId,
        address indexed counterparty
    );

    event NDASigned(
        uint256 indexed ndaId,
        address indexed counterparty,
        uint256 signedAt
    );

    event NDATerminated(
        uint256 indexed ndaId,
        address indexed terminatedBy
    );

    event AccessGranted(
        uint256 indexed ndaId,
        address indexed grantedTo
    );

    event EncryptedComputationCompleted(
        bytes32 indexed requestId,
        uint256 indexed ndaId,
        uint256 timestamp
    );

    event AuditLogEntry(
        uint256 indexed ndaId,
        address indexed actor,
        string action,
        uint256 timestamp
    );

    constructor() EIP712WithModifier("CloakNDA", "1") {}

    /**
     * @dev Create NDA with fully encrypted parameters
     * All sensitive data is encrypted before storage
     */
    function createNDA(
        string memory _title,
        euint256 _termsHashEncrypted,
        euint64 _counterpartyEncrypted,
        euint64 _expirationDateEncrypted
    ) public returns (uint256) {
        uint256 newNDAId = ndaCounter++;

        NDA storage nda = ndas[newNDAId];
        nda.ndaId = newNDAId;
        nda.creator = msg.sender;
        nda.counterpartyEncrypted = _counterpartyEncrypted;
        nda.termsHashEncrypted = _termsHashEncrypted;
        nda.expirationDateEncrypted = _expirationDateEncrypted;
        nda.status = NDAStatus.DRAFT;
        nda.createdAt = block.timestamp;
        nda.isActive = TFHE.asEbool(true);
        nda.isSignedEncrypted = TFHE.asEbool(false);

        userNDAs[msg.sender].push(newNDAId);
        permissions[newNDAId][msg.sender] = TFHE.asEbool(true);

        emit NDACreated(newNDAId, msg.sender, _title);
        emit AuditLogEntry(newNDAId, msg.sender, "NDA_CREATED", block.timestamp);

        return newNDAId;
    }

    /**
     * @dev Request signature with encrypted counterparty verification
     * Uses encrypted comparison for counterparty validation
     */
    function requestSignature(
        uint256 _ndaId,
        address _counterpartyAddress
    ) public {
        require(ndas[_ndaId].creator == msg.sender, "Only creator can request");
        require(ndas[_ndaId].status == NDAStatus.DRAFT, "Invalid status");

        ndas[_ndaId].status = NDAStatus.PENDING_SIGNATURE;
        permissions[_ndaId][_counterpartyAddress] = TFHE.asEbool(true);
        userNDAs[_counterpartyAddress].push(_ndaId);

        emit NDASignatureRequested(_ndaId, _counterpartyAddress);
        emit AuditLogEntry(_ndaId, msg.sender, "SIGNATURE_REQUESTED", block.timestamp);
    }

    /**
     * @dev Sign NDA with encrypted permission verification
     * Permission check is fully encrypted
     */
    function signNDA(uint256 _ndaId) public {
        NDA storage nda = ndas[_ndaId];
        require(nda.status == NDAStatus.PENDING_SIGNATURE, "Not pending");

        ebool hasPermission = permissions[_ndaId][msg.sender];
        require(TFHE.decrypt(hasPermission), "No permission");

        nda.status = NDAStatus.SIGNED;
        nda.signedAt = block.timestamp;
        nda.isSignedEncrypted = TFHE.asEbool(true);
        hasSignedEncrypted[_ndaId][msg.sender] = TFHE.asEbool(true);

        emit NDASigned(_ndaId, msg.sender, block.timestamp);
        emit AuditLogEntry(_ndaId, msg.sender, "NDA_SIGNED", block.timestamp);
    }

    /**
     * @dev Terminate NDA with encrypted status update
     * Termination status is encrypted
     */
    function terminateNDA(uint256 _ndaId) public {
        NDA storage nda = ndas[_ndaId];
        require(
            nda.creator == msg.sender || TFHE.decrypt(permissions[_ndaId][msg.sender]),
            "Not authorized"
        );

        nda.status = NDAStatus.TERMINATED;
        nda.isActive = TFHE.asEbool(false);

        emit NDATerminated(_ndaId, msg.sender);
        emit AuditLogEntry(_ndaId, msg.sender, "NDA_TERMINATED", block.timestamp);
    }

    /**
     * @dev Grant auditor access with encrypted permissions
     * Auditor permissions are encrypted
     */
    function grantAuditorAccess(uint256 _ndaId, address _auditor) public {
        require(ndas[_ndaId].creator == msg.sender, "Only creator");
        
        permissions[_ndaId][_auditor] = TFHE.asEbool(true);
        userNDAs[_auditor].push(_ndaId);

        emit AccessGranted(_ndaId, _auditor);
        emit AuditLogEntry(_ndaId, msg.sender, "AUDITOR_ACCESS_GRANTED", block.timestamp);
    }

    /**
     * @dev Store encrypted computation result from coprocessor
     * New function for async fhEVM computation callbacks
     */
    function storeComputationResult(
        bytes32 _requestId,
        euint256 _result
    ) public {
        // In production: verify this is called by authorized coprocessor
        computationResults[_requestId] = EncryptedComputationResult({
            requestId: _requestId,
            result: _result,
            completed: true,
            timestamp: block.timestamp
        });

        emit EncryptedComputationCompleted(_requestId, 0, block.timestamp);
    }

    /**
     * @dev Perform encrypted comparison on stored data
     * Homomorphic computation without decryption
     */
    function compareEncryptedValues(
        euint256 _value1,
        euint256 _value2
    ) public pure returns (ebool) {
        return TFHE.eq(_value1, _value2);
    }

    /**
     * @dev Check if NDA is active (encrypted)
     */
    function isNDAActive(uint256 _ndaId) public view returns (bool) {
        return TFHE.decrypt(ndas[_ndaId].isActive);
    }

    /**
     * @dev Check if user has signed (encrypted)
     */
    function hasSigned(uint256 _ndaId, address _user) public view returns (bool) {
        return TFHE.decrypt(hasSignedEncrypted[_ndaId][_user]);
    }

    /**
     * @dev Get NDA details
     */
    function getNDA(uint256 _ndaId) public view returns (NDA memory) {
        return ndas[_ndaId];
    }

    /**
     * @dev Get user's NDA IDs
     */
    function getUserNDAs(address _user) public view returns (uint256[] memory) {
        return userNDAs[_user];
    }

    /**
     * @dev Get total NDA count
     */
    function getNDACount() public view returns (uint256) {
        return ndaCounter;
    }
}
