# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in CloakNDA, please email security@cloaknda.dev instead of using the issue tracker.

## Security Considerations

### Smart Contracts

- All sensitive data is encrypted using Zama's fhEVM
- Access control is enforced at the contract level
- Audit trail is immutable on-chain
- No plaintext data is stored or logged

### Backend

- Encryption keys are managed securely
- API endpoints require authorization
- All communications should use HTTPS in production
- Environment variables should never be committed

### Frontend

- Private keys are never stored in browser storage
- All transactions are signed by the user's wallet
- No sensitive data is logged to console in production

## Audit

CloakNDA undergoes regular security audits. Latest audit report available upon request.

## Responsible Disclosure

We appreciate responsible disclosure of security vulnerabilities. Please allow 90 days for us to address the issue before public disclosure.
