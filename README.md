# Antigravity Tool Kit

> **Production-ready AI agent templates for enhanced development workflows**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![npm version](https://img.shields.io/npm/v/antigravity-tool-kit.svg)](https://www.npmjs.com/package/antigravity-tool-kit)

A comprehensive collection of AI agent templates, skills, and workflows designed to supercharge your development with intelligent coding assistance. Built for developers who want to maximize productivity with AI-powered tools.

---

## What's Inside

| Component | Count | Description |
|-----------|-------|-------------|
| **Agents** | 16 | Specialist AI personas for different domains |
| **Skills** | 40 | Domain-specific knowledge modules |
| **Workflows** | 11 | Production-ready command procedures |

---

## Quick Start

### Installation

Install the toolkit in your project with a single command:

```bash
npx antigravity-tool-kit init
```

Or install globally for use across all projects:

```bash
npm install -g antigravity-tool-kit
antigravity-tool-kit init
```

**Short alias available:**

```bash
atk init
```

This creates a `.agent` folder in your project containing all templates.

---

## Features

### 16 Specialist Agents

Role-based AI personas that provide expert guidance:

- **orchestrator** - Multi-agent coordination
- **project-planner** - Project planning and architecture
- **frontend-specialist** - Web UI/UX development
- **backend-specialist** - API and server-side logic
- **database-architect** - Database design and optimization
- **mobile-developer** - iOS, Android, React Native
- **game-developer** - Game logic and mechanics
- **devops-engineer** - CI/CD and deployment
- **security-auditor** - Security compliance and auditing
- **penetration-tester** - Offensive security testing
- **test-engineer** - Testing strategies and automation
- **debugger** - Root cause analysis
- **performance-optimizer** - Performance optimization
- **seo-specialist** - SEO and web visibility
- **documentation-writer** - Technical documentation
- **explorer-agent** - Codebase analysis

### 40 Skills

Domain-specific knowledge modules loaded on-demand:

**Frontend & UI**
- React patterns, Next.js best practices, Tailwind patterns
- Frontend design, UI/UX Pro Max (50 styles, 21 palettes)

**Backend & API**
- API patterns (REST, GraphQL, tRPC)
- Node.js, NestJS, Python patterns

**Database**
- Database design, Prisma expert, schema optimization

**Testing & Quality**
- Testing patterns, TDD workflow, webapp testing
- Code review checklist, lint and validate

**Security**
- Vulnerability scanner, red team tactics

**Architecture**
- System architecture, app builder, pattern selection

**Mobile**
- Mobile design patterns, platform-specific guidelines

**DevOps**
- Docker expert, deployment procedures, server management

**And more...**
- Game development, SEO fundamentals, i18n localization

### 11 Workflows

Slash command procedures for common tasks:

| Command | Description |
|---------|-------------|
| `/brainstorm` | Explore ideas and options before implementation |
| `/create` | Create new features or applications |
| `/debug` | Systematic debugging and troubleshooting |
| `/deploy` | Deploy applications to production |
| `/enhance` | Improve and refactor existing code |
| `/orchestrate` | Coordinate multiple agents for complex tasks |
| `/plan` | Create detailed task breakdowns |
| `/preview` | Preview changes locally |
| `/status` | Check project status and health |
| `/test` | Generate and run tests |
| `/ui-ux-pro-max` | Design with 50+ professional styles |

---

## Usage

### Using Agents

Invoke specialist agents by mentioning them in your AI assistant:

```
Use the security-auditor agent to review my authentication code
```

```
Use the frontend-specialist to create a responsive navbar component
```

```
Use the database-architect to design a schema for an e-commerce platform
```

### Using Skills

Skills are automatically loaded based on your task context. The AI reads skill descriptions and applies relevant knowledge without manual intervention.

### Using Workflows

Invoke workflows with slash commands:

```
/brainstorm authentication system with OAuth and JWT
```

```
/create landing page with hero section and feature cards
```

```
/debug why my API returns 500 errors
```

```
/deploy to production with zero downtime
```

---

## CLI Commands

| Command | Description |
|---------|-------------|
| `atk init` | Install .agent folder in current directory |
| `atk update` | Update to latest version |
| `atk status` | Check installation status |
| `atk version` | Show version number |
| `atk help` | Display help information |

### CLI Options

```bash
atk init --force        # Overwrite existing installation
atk init --path ./app   # Install in specific directory
atk init --branch dev   # Use specific git branch
atk init --quiet        # Suppress output
atk init --dry-run      # Preview without executing
```

---

## Project Structure

After installation, your project will have:

```
your-project/
└── .agent/
    ├── agents/          # 16 specialist agents
    ├── skills/          # 40 domain-specific skills
    ├── workflows/       # 11 workflow commands
    ├── rules/           # Configuration rules
    └── ARCHITECTURE.md  # Complete documentation
```

---

## Examples

### Example 1: Build a REST API

```
Use the backend-specialist agent to create a REST API for a blog with:
- Posts CRUD operations
- User authentication with JWT
- Comment system
- Rate limiting
- Input validation
```

### Example 2: Create a Landing Page

```
/create a modern landing page with:
- Hero section with gradient background
- Feature showcase cards
- Testimonials section
- Call-to-action
- Fully responsive design
```

### Example 3: Security Audit

```
Use the security-auditor agent to perform a comprehensive security audit of my application
```

### Example 4: Performance Optimization

```
Use the performance-optimizer agent to analyze and improve my React app's performance
```

---

## Requirements

- **Node.js**: >= 18.0.0
- **Git**: Required for installation
- **AI Assistant**: Compatible with Gemini, Claude, Copilot, and other AI coding assistants

---

## Documentation

Complete documentation is available in `.agent/ARCHITECTURE.md` after installation.

---

## Development

### Clone and Test

```bash
# Clone repository
git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/antigravity-tool-kit.git
cd antigravity-tool-kit

# Run tests
npm test

# Validate components
npm run validate
```

### Run Tests

```bash
npm test
```

All tests must pass before deployment.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Mohammad Faiz

---

## Support

- **Issues**: [GitHub Issues](https://github.com/Mohammad-Faiz-Cloud-Engineer/antigravity-tool-kit/issues)
- **Repository**: [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/antigravity-tool-kit)
- **Author**: Mohammad Faiz

---

## Why Antigravity Tool Kit?

- **Production-Ready**: Battle-tested patterns and best practices
- **Comprehensive**: 16 agents + 40 skills + 11 workflows
- **Modular**: Load only what you need
- **Easy to Use**: Simple CLI, intuitive commands
- **Well-Documented**: Complete documentation included
- **Actively Maintained**: Regular updates and improvements
- **Zero Dependencies**: Pure Node.js, no external dependencies

---

**Built with ❤️ by Mohammad Faiz**

*Supercharge your development workflow with AI-powered assistance*
