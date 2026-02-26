# Contributing to Antigravity Tool Kit

Thank you for your interest in contributing! This document provides guidelines and standards for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a positive community

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/antigravity-tool-kit.git
   cd antigravity-tool-kit
   ```
3. Install dependencies (if any added in future)
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Coding Standards

### JavaScript Style Guide

- Use strict mode: `'use strict';`
- Use const/let, never var
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Handle errors properly with try-catch
- Validate all inputs

### File Structure

```
antigravity-tool-kit/
├── .agent/              # Agent templates (main content)
├── bin/                 # CLI executable
├── scripts/             # Build and validation scripts
├── test/                # Test files
├── README.md            # Main documentation
├── CHANGELOG.md         # Version history
└── package.json         # Package configuration
```

## Testing

Before submitting a PR, ensure all tests pass:

```bash
npm test
npm run validate
```

### Writing Tests

- Add tests for new features
- Ensure tests are deterministic
- Use descriptive test names
- Test both success and failure cases

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Test additions or changes
- chore: Build process or auxiliary tool changes

### Examples

```
feat(cli): add --verbose flag for detailed output

Add verbose logging option to help with debugging
installation issues.

Closes #123
```

```
fix(validate): handle missing SKILL.md files gracefully

Previously crashed when SKILL.md was missing.
Now shows clear error message.
```

## Pull Request Process

1. Update documentation for any changed functionality
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md with your changes
5. Create a pull request with a clear description

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Commit messages follow guidelines
- [ ] No unnecessary files included

## Adding New Components

### Adding a New Agent

1. Create a new .md file in `.agent/agents/`
2. Follow the existing agent template structure
3. Include clear role definition and capabilities
4. Update documentation

### Adding a New Skill

1. Create a new directory in `.agent/skills/`
2. Add a SKILL.md file with skill documentation
3. Follow existing skill structure
4. Update the count in README.md

### Adding a New Workflow

1. Create a new .md file in `.agent/workflows/`
2. Define clear workflow steps
3. Include usage examples
4. Update documentation

## Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

## Questions?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Antigravity Tool Kit!
