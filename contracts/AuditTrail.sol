// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title AuditTrail
 * @dev Immutable audit trail for NDA operations
 */
contract AuditTrail {
    struct AuditEntry {
        uint256 ndaId;
        address actor;
        string action;
        uint256 timestamp;
        bytes data;
    }

    AuditEntry[] public auditLog;

    event AuditLogged(
        uint256 indexed ndaId,
        address indexed actor,
        string action,
        uint256 timestamp
    );

    /**
     * @dev Log audit entry
     * @param _ndaId NDA ID
     * @param _actor Actor address
     * @param _action Action description
     * @param _data Additional data
     */
    function logAudit(
        uint256 _ndaId,
        address _actor,
        string memory _action,
        bytes memory _data
    ) public {
        auditLog.push(
            AuditEntry({
                ndaId: _ndaId,
                actor: _actor,
                action: _action,
                timestamp: block.timestamp,
                data: _data
            })
        );

        emit AuditLogged(_ndaId, _actor, _action, block.timestamp);
    }

    /**
     * @dev Get audit log entry
     * @param _index Entry index
     */
    function getAuditEntry(uint256 _index) public view returns (AuditEntry memory) {
        require(_index < auditLog.length, "Invalid index");
        return auditLog[_index];
    }

    /**
     * @dev Get audit log length
     */
    function getAuditLogLength() public view returns (uint256) {
        return auditLog.length;
    }

    /**
     * @dev Get all audit entries for NDA
     * @param _ndaId NDA ID
     */
    function getNDAAuditLog(uint256 _ndaId) public view returns (AuditEntry[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < auditLog.length; i++) {
            if (auditLog[i].ndaId == _ndaId) {
                count++;
            }
        }

        AuditEntry[] memory result = new AuditEntry[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < auditLog.length; i++) {
            if (auditLog[i].ndaId == _ndaId) {
                result[index] = auditLog[i];
                index++;
            }
        }

        return result;
    }
}
