# Installation Guide

## Multiple Installation Methods

Antigravity Tool Kit can be installed in several ways depending on your preference.

---

## Method 1: Direct npx (Recommended for Quick Use)

Run directly without installation:

```bash
npx github:Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit init
```

This will:
- Download the latest version from GitHub
- Install the `.agent` folder in your current directory
- No global installation needed

---

## Method 2: Global Installation from GitHub

Install globally to use across all projects:

```bash
npm install -g github:Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit
```

Then use anywhere:

```bash
antigravity-tool-kit init
# or use the short alias
atk init
```

---

## Method 3: Clone and Run Locally

Clone the repository and run directly:

```bash
# Clone the repository
git clone https://github.com/Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit.git

# Navigate to the directory
cd Antigravity-Tool-Kit

# Run the CLI
node bin/cli.js init --path /path/to/your/project
```

**Advantages:**
- Full control over the code
- Can modify and customize
- No npm installation needed
- Can contribute back to the project

---

## Method 4: Add as npm Dependency

Add to your project's package.json:

```bash
npm install github:Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit --save-dev
```

Then add a script to your package.json:

```json
{
  "scripts": {
    "setup-agents": "antigravity-tool-kit init"
  }
}
```

Run with:

```bash
npm run setup-agents
```

---

## Verification

After installation, verify it works:

```bash
# Check version
antigravity-tool-kit version
# or
atk version
# or (if cloned)
node bin/cli.js version

# Show help
antigravity-tool-kit --help
```

---

## Usage After Installation

### Initialize in Current Directory

```bash
antigravity-tool-kit init
```

### Initialize in Specific Directory

```bash
antigravity-tool-kit init --path ./my-project
```

### Update Existing Installation

```bash
antigravity-tool-kit update
```

### Check Installation Status

```bash
antigravity-tool-kit status
```

---

## CLI Options

| Option | Description |
|--------|-------------|
| `--force` | Overwrite existing .agent folder |
| `--path <dir>` | Install in specific directory |
| `--branch <name>` | Use specific git branch (default: main) |
| `--quiet` | Suppress output |
| `--dry-run` | Preview without executing |

### Examples

```bash
# Force overwrite existing installation
antigravity-tool-kit init --force

# Install in specific directory
antigravity-tool-kit init --path ./backend

# Use development branch
antigravity-tool-kit init --branch dev

# Quiet mode
antigravity-tool-kit init --quiet

# Preview what would be installed
antigravity-tool-kit init --dry-run
```

---

## Troubleshooting

### Issue: Command not found

**Solution 1:** Use full path
```bash
node /path/to/Antigravity-Tool-Kit/bin/cli.js init
```

**Solution 2:** Install globally
```bash
npm install -g github:Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit
```

### Issue: Permission denied

**Solution:** Use sudo (Linux/Mac) or run as Administrator (Windows)
```bash
sudo npm install -g github:Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit
```

### Issue: Git not found

**Solution:** Install Git first
- **Windows:** Download from [git-scm.com](https://git-scm.com/)
- **Mac:** `brew install git`
- **Linux:** `sudo apt-get install git` or `sudo yum install git`

### Issue: Node.js version too old

**Solution:** Update Node.js to version 18 or higher
- Download from [nodejs.org](https://nodejs.org/)
- Or use nvm: `nvm install 18`

---

## Requirements

- **Node.js**: >= 18.0.0 (LTS recommended)
- **Git**: Required for installation
- **npm**: Comes with Node.js
- **Operating System**: Works on macOS, Linux, and Windows

---

## What Gets Installed?

After running `init`, you'll have:

```
your-project/
└── .agent/
    ├── agents/          # 25+ specialist agents
    ├── skills/          # 60+ domain-specific skills
    ├── workflows/       # 18 workflow commands
    ├── rules/           # Configuration rules
    └── ARCHITECTURE.md  # Complete documentation
```

---

## Uninstallation

### Remove Global Installation

```bash
npm uninstall -g antigravity-tool-kit
```

### Remove from Project

```bash
rm -rf .agent
```

Or on Windows:

```cmd
rmdir /s .agent
```

---

## Getting Help

- **Documentation:** [README.md](README.md)
- **Issues:** [GitHub Issues](https://github.com/Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit/issues)
- **Repository:** [GitHub](https://github.com/Mohammad-Faiz-Cloud-Engineer/Antigravity-Tool-Kit)

---

## Next Steps

After installation:

1. Open your AI coding assistant (Claude, Gemini, Copilot, etc.)
2. Start using agents: `Use the frontend-specialist agent to...`
3. Try workflows: `/create a landing page with...`
4. Explore skills: They load automatically based on context
5. Read ARCHITECTURE.md in the .agent folder for complete documentation

---

**Happy Coding! 🚀**
