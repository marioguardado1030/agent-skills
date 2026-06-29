# agent-skills

This is the agent-skills project — a collection of production-grade engineering skills for AI coding agents.

## Project Structure

```
skills/               → 24 core skills (one SKILL.md per directory)
agents/               → 4 reusable agent personas
.claude/commands/     → 8 slash commands
hooks/                → Session lifecycle hooks + hook configuration
references/           → 7 reference checklists
docs/                 → Setup guides per tool + skill anatomy spec
plugin.json           → Plugin manifest (name: agent-skills, v1.0.0)
```

## Skills Catalog

<!-- AUTO:skills -->
| Phase | Skill | Description |
|-------|-------|-------------|
| Meta | `using-agent-skills` | How to get the most out of this skill pack |
| Define | `interview-me` | Structured interviewing to surface requirements |
| Define | `idea-refine` | Divergent/convergent thinking to sharpen ideas |
| Define | `spec-driven-development` | Write a spec before writing code |
| Plan | `planning-and-task-breakdown` | Decompose work into small, verifiable tasks |
| Build | `incremental-implementation` | Implement in thin vertical slices |
| Build | `test-driven-development` | Red-Green-Refactor loop |
| Build | `context-engineering` | Feed agents the right context at the right time |
| Build | `source-driven-development` | Ground implementation in official docs |
| Build | `doubt-driven-development` | Adversarial review while building |
| Build | `frontend-ui-engineering` | Component architecture, accessibility (WCAG) |
| Build | `api-and-interface-design` | Contract-first API design |
| Verify | `browser-testing-with-devtools` | Chrome DevTools MCP for end-to-end verification |
| Verify | `debugging-and-error-recovery` | 5-step systematic triage |
| Review | `code-review-and-quality` | 5-axis review (correctness, security, perf, readability, design) |
| Review | `code-simplification` | Reduce complexity without changing behavior |
| Review | `security-and-hardening` | OWASP Top 10 prevention |
| Review | `performance-optimization` | Core Web Vitals + profiling-first approach |
| Ship | `git-workflow-and-versioning` | Trunk-based development, clean history |
| Ship | `ci-cd-and-automation` | Shift-left quality gates |
| Ship | `deprecation-and-migration` | Code-as-liability, safe removal |
| Ship | `documentation-and-adrs` | ADRs, API docs, living documentation |
| Ship | `observability-and-instrumentation` | Structured logging, RED metrics |
| Ship | `shipping-and-launch` | Pre-launch checklists |
<!-- /AUTO:skills -->

## Agents

Four reusable agent personas in `agents/`:

- `code-reviewer.md` — Senior Staff Engineer perspective for code reviews
- `test-engineer.md` — QA Specialist for test coverage and quality
- `security-auditor.md` — Security Engineer for threat modeling and OWASP checks
- `web-performance-auditor.md` — Web Performance Engineer (pairs with `/webperf`)

## Slash Commands

Eight commands in `.claude/commands/`:

| Command | File | Core principle |
|---------|------|---------------|
| `/spec` | `spec.md` | Spec before code |
| `/plan` | `plan.md` | Small, atomic tasks |
| `/build` | `build.md` | One slice at a time |
| `/test` | `test.md` | Tests are proof |
| `/review` | `review.md` | Improve code health |
| `/code-simplify` | `code-simplify.md` | Clarity over cleverness |
| `/ship` | `ship.md` | Faster is safer |
| `/webperf` | `webperf.md` | Measure before you optimize |

## References

Seven reference checklists in `references/`:

| File | Purpose |
|------|--------|
| `definition-of-done.md` | The standing bar every change must clear |
| `testing-patterns.md` | Test structure, naming, and examples |
| `security-checklist.md` | Pre-commit security checks, OWASP mapping |
| `performance-checklist.md` | Core Web Vitals, measurement-first approach |
| `accessibility-checklist.md` | Keyboard nav, ARIA, WCAG 2.1 AA compliance |
| `observability-checklist.md` | Logging, RED/USE metrics, alerting |
| `orchestration-patterns.md` | Multi-agent patterns and anti-patterns |

## Hooks

Session lifecycle hooks in `hooks/`:

- `session-start.sh` — SessionStart hook; injects `using-agent-skills` context at session open
- `session-start-test.sh` — Validates session-start hook JSON output
- `sdd-cache-pre.sh` / `sdd-cache-post.sh` — SDD cache invalidation (see `hooks/SDD-CACHE.md`)
- `simplify-ignore.sh` — Prevents `/code-simplify` from touching files marked `# simplify-ignore`
- `simplify-ignore-test.sh` — Validates simplify-ignore rules

Hook configuration is in `hooks/hooks.json`. Copy relevant entries to your Claude Code settings to activate.

## Installation

**Claude Code (marketplace):**
```bash
claude plugin marketplace add https://github.com/marioguardado1030/agent-skills
```

**Claude Code (local install):** Clone the repo and point your `.claude/` config at the skill directories, or follow the guide in `docs/`.

**Other tools** — see `docs/` for per-tool setup:
- `docs/cursor-setup.md` — Cursor
- `docs/copilot-setup.md` — GitHub Copilot
- `docs/gemini-cli-setup.md` — Gemini CLI
- `docs/opencode-setup.md` — OpenCode
- `docs/windsurf-setup.md` — Windsurf
- `docs/antigravity-setup.md` — Antigravity CLI

## Conventions

- Every skill lives in `skills/<name>/SKILL.md`
- YAML frontmatter with `name` and `description` fields
- Description starts with what the skill does (third person), followed by trigger conditions ("Use when...")
- Every skill has: Overview, When to Use, Process, Common Rationalizations, Red Flags, Verification
- References are in `references/`, not inside skill directories
- Supporting files only created when content exceeds 100 lines

## Contributing

Before adding a new skill or significantly reworking an existing one, run the pre-flight checks in [CONTRIBUTING.md](CONTRIBUTING.md#before-proposing-a-new-skill): search the catalog, check open PRs, confirm the idea fits [docs/skill-anatomy.md](docs/skill-anatomy.md), and justify the gap. Prefer extending an existing skill over adding a near-duplicate. CONTRIBUTING.md is the single source of truth for this workflow; do not restate its checklist here or elsewhere, link to it.

## Commands

- `npm test` — Not applicable (this is a documentation project)
- Validate: Check that all SKILL.md files have valid YAML frontmatter with name and description
- `node scripts/update-claude-md.js` — Refresh the `<!-- AUTO:skills -->` block from `skills/` directory

## Pull Requests

PRs target the upstream repository's default branch. In a typical fork setup the upstream remote is `upstream` and your fork is `origin`, but the exact remote names are not what matters here.

- Before opening a PR, search the upstream repository's open PRs and issues for work that touches the same files or rules. If any overlaps, coordinate (build on it, align your rules with it, or rebase after it merges) instead of opening a conflicting PR.
- Prefer small, focused PRs over large refactors of widely shared files (for example, files under `scripts/`), which are more likely to collide with in-flight work.

## Boundaries

- Always: Run the CONTRIBUTING.md pre-flight checks before creating a new skill directory
- Always: Follow the skill-anatomy.md format for new skills
- Always: Check the upstream repo's open PRs and issues for overlap before opening a new PR
- Never: Add skills that are vague advice instead of actionable processes
- Never: Duplicate content between skills — reference other skills instead

## CLAUDE.md Maintenance

This file is validated on every push via `.github/workflows/update-claude-md.yml`, which checks:
- All `skills/` directory names appear in CLAUDE.md
- All `agents/*.md` filenames appear in CLAUDE.md
- Required sections are present

When you add a new skill, agent, command, or reference, update the relevant catalog section in this file in the same PR. The `<!-- AUTO:skills -->` block can also be refreshed automatically with `node scripts/update-claude-md.js`.
