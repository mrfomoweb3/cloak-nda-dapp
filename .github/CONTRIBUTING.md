# Contributing to CloakNDA

## Development Setup

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Start Zama Devnet: \`npm run setup-devnet\`
4. Deploy contracts: \`npm run hardhat:deploy\`
5. Start backend: \`npm run backend:dev\`
6. Start frontend: \`npm run dev\`

## Code Standards

- Use TypeScript for all new code
- Follow Solidity style guide for contracts
- Write tests for all new features
- Ensure all tests pass before submitting PR

## Testing

Run tests with: \`npm test\`

Run specific test: \`npm test -- test/NDAManager.test.ts\`

## Commit Messages

Use conventional commits:
- \`feat:\` for new features
- \`fix:\` for bug fixes
- \`docs:\` for documentation
- \`test:\` for tests
- \`refactor:\` for refactoring

## Pull Request Process

1. Create a feature branch: \`git checkout -b feature/your-feature\`
2. Make your changes and commit
3. Push to your fork
4. Create a pull request with a clear description
5. Ensure CI/CD checks pass
6. Request review from maintainers
