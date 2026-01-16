# asdf Setup Guide

## What is asdf?

asdf is a version manager that lets you install and manage multiple versions of tools (Node.js, Go, etc.) on the same machine. It's lightweight and doesn't require sudo.

## Installation (Already Done)

asdf is installed in `~/.asdf`. To use it in a new terminal:

```bash
source ~/.bashrc  # This loads asdf automatically
```

## Project Configuration

This project uses `.tool-versions` file to specify required versions:

```
nodejs 18.18.0
golang 1.22.0
```

When you enter the `vaultura/` directory, asdf automatically uses these versions.

## Verify Setup

```bash
# In any terminal, these should work:
node --version    # v18.18.0
npm --version     # 9.8.1
go version        # go1.22.0
```

## Adding More Tools

To add another tool (e.g., PostgreSQL):

```bash
asdf plugin add postgres
asdf install postgres 16.0
asdf global postgres 16.0
```

## Listing Installed Versions

```bash
asdf list nodejs
asdf list golang
asdf list all  # All tools
```

## Upgrading a Tool

```bash
asdf install nodejs 20.0.0
asdf global nodejs 20.0.0  # Switch globally
```

Or in specific directory:

```bash
echo "nodejs 20.0.0" >> .tool-versions
```

## Benefits

✓ No sudo required
✓ Multiple versions simultaneously
✓ Per-project version control
✓ Easy switching
✓ Consistent team environments

## Troubleshooting

**asdf command not found**: Run `source ~/.bashrc` in new terminal

**Wrong version showing**: Check `.tool-versions` in current directory

**Need to reinstall**: Run `asdf install` to fetch versions from `.tool-versions`
