# Antigravity Bootstrap Prompt

You are setting up Antigravity on the same macOS machine to continue the `fbromance` / `poi5on.m3` project from the current Codex checkpoint.

## Goal
Mirror the Codex environment closely enough that you can continue the project without losing MCP access, skill coverage, visual-browser capability, or project context.

## Ground Rules
- Do **not** duplicate an MCP server or skill that already exists in Antigravity.
- Reuse Antigravity's own credential store / env system wherever possible.
- Do **not** paste literal API keys or tokens into the project or into committed files.
- Read local config and skill directories directly from disk on this machine.
- Finish environment parity **before** touching the project code.

## Step 1: Mirror MCP server definitions from Codex
Read the Codex MCP config from:
- `/Users/joeyq/.codex/config.toml`

Recreate the same MCP surface in Antigravity, using Antigravity-compatible configuration and secret storage.

### Required MCPs for this project
Prioritize these first and verify they work:
- `reactbits`
- `magicuidesign`
- `aceternityui`
- `ascii-motion`
- `morph-mcp`
- `figma`
- `perplexity`

### Secondary parity MCPs
Mirror these too if practical:
- `neon`
- `openmemory`
- `pencil`
- `shadcn-ui` (currently disabled in Codex config; preserve disabled state if mirrored)

### Important
- If a server is already installed in Antigravity, keep it and do not install a duplicate.
- Use the same server names where possible.
- Use Antigravity's own env/secret system instead of copying any token literals from Codex config.

## Step 2: Mirror local skills from Codex and Agents
Mirror the available skill directories from these paths:
- `/Users/joeyq/.codex/skills`
- `/Users/joeyq/.codex/superpowers/skills`
- `/Users/joeyq/.agents/skills`

If Antigravity supports importing or symlinking local skills, do that. If not, manually install the closest equivalent set.

### Minimum skill set that must be working
If full parity fails, ensure these are available at minimum:
- `using-superpowers`
- `brainstorming`
- `writing-plans`
- `nextjs-expert`
- `building-components`
- `design-system-components`
- `data-analysis`
- `analyze`
- `algorithmic-art`
- `imagegen`
- `web-researcher`
- `reddit-research`
- `verification-before-completion`
- `test-driven-development`
- `systematic-debugging`

## Step 3: Smoke-test the critical MCPs
Run small smoke tests for:
- `reactbits`
- `magicuidesign`
- `aceternityui`
- `ascii-motion`
- `morph-mcp`

Also confirm that:
- `figma` is reachable
- `perplexity` is reachable
- Antigravity's built-in browser is working and can be used for visual inspection / screenshots

The smoke test does not need full implementation. It only needs to prove the tool surface is visible and responsive.

## Step 4: Report environment parity
Return a short checklist with these sections:
- `Already present in Antigravity`
- `Installed now`
- `Failed or blocked`
- `Needs manual credentials`

Do not start design or code changes yet. Stop after environment parity is complete.


## Step 5: Browser note
Do **not** install or prioritize Playwright just to mirror Codex. For Antigravity, use the built-in browser as the primary visual-inspection tool unless a local reason emerges to add Playwright later.
