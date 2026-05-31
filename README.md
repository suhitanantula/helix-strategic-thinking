# Helix Strategic Thinking

> **19 Original Strategic Thinking Frameworks from The Helix Moment**

A comprehensive collection of strategic thinking skills for [Claude Code](https://claude.ai/claude-code) and AI agents — built from the original frameworks in *The Helix Moment* by [Suhit Anantula](https://suhitanantula.com).

Unlike generic mental model collections, every framework here is **original IP** — born from real consulting practice and designed for organisations navigating strategy, design, and AI together.

[![License: CC-BY-NC-SA-4.0](https://img.shields.io/badge/License-CC--BY--NC--SA--4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Skills: 19](https://img.shields.io/badge/Skills-19-blue)](https://github.com/suhitanantula/helix-strategic-thinking)

## Why This Exists

Most strategy is static. A deck. A deadline. A decision frozen in time.

The Helix model treats strategy as a living system — two strands (Strategy × Design) spiralling upward, constantly informing and evolving each other. This collection distills that book into **actionable frameworks** you can use with any AI agent.

Every skill links back to the book chapter it came from — so you can go deeper when you need to.

## Quick Start

### One-Command Install (Recommended)

```bash
git clone https://github.com/suhitanantula/helix-strategic-thinking.git
cd helix-strategic-thinking
./install.sh              # Installs to both Claude Code + Hermes
./install.sh --claude     # Claude Code only
./install.sh --hermes     # Hermes only
./install.sh --uninstall  # Remove from both
```

This installs all 22 skills as a **single package** under:
- `~/.claude/skills/helix-strategic-thinking/` (Claude Code)
- `~/.hermes/skills/helix-strategic-thinking/` (Hermes)

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/suhitanantula/helix-strategic-thinking.git

# Copy skills to your Claude Code config
cp -r helix-strategic-thinking/skills/* ~/.claude/skills/

# Or to a specific project
cp -r helix-strategic-thinking/skills/* /path/to/project/.claude/skills/
```

### Usage

Invoke any skill by name in Claude Code:

```
> Use helix-router to find the right framework for our strategy problem
> Apply the seven-faces-diagnostic — our team is stuck in endless analysis
> Use 5p-perceive to help us sense what our customers actually need
> Apply lines-loops-vibes to diagnose why our strategy feels out of sync
> Use the eee-layer to evaluate our AI strategy ethically
```

## Available Skills

### 🧭 Start Here

| Skill | Description | Best For |
|-------|-------------|----------|
| `helix-router` | **START HERE** — Route to the right framework by problem type | Entry point for all skills |

### 🧬 Core Frameworks

| Skill | Description | Best For |
|-------|-------------|----------|
| `helix-model` | Strategy × Design as two intertwining strands | Rethinking strategy as a living system |
| `lines-loops-vibes` | Three rhythms of organisational intelligence (▲●〰) | Diagnosing rhythm mismatches |
| `co-intelligence` | Human + AI rhythmic partnership | Designing AI collaboration |
| `strategic-navigation` | Known/unknown matrix mapped to LLV | Choosing approach by uncertainty |

### 🎭 Seven Faces of Strategic Dysfunction

Each face has: **diagnosis** → **root cause** → **solution pathway** → **strategy framework** → **AI integration**

| Skill | Rhythm | Symptom | Solution |
|-------|--------|---------|----------|
| `seven-faces-diagnostic` | All | Which face am I? | Router to right face |
| `face-paralysis` | 〰〰〰 | Can't decide, endless analysis | Playing to Win |
| `face-beautiful-plan` | ▲▲▲ | Plans gather dust | Emergent Strategy |
| `face-ivory-tower` | ▲〰● | Strategy disconnected from teams | Collaborative Design |
| `face-hamster-wheel` | ●●● | Always busy, going nowhere | Theory of the Business |
| `face-whiplash` | ▲ vs 〰● | Strategy keeps changing direction | OODA Loop |
| `face-ai-fog` | 〰●▲? | AI pilots don't connect to strategy | Lean Strategy + Co-Intelligence |
| `face-safety-dance` | ▲▲▲ | Protecting the status quo | Platform + Innovation Portfolio |

### 🔄 5Ps of Loop Design

Each P has: **rhythm mode** → **human role** → **AI role** → **design rules** → **EEE activation** → **pitfalls**

| Skill | Rhythm | Focus | Best For |
|-------|--------|-------|----------|
| `5ps-loop-design` | All | Router to the right P | Strategic design |
| `5p-perceive` | 〰 Vibes | Sense unspoken needs | Before building |
| `5p-perform` | ▲ Lines | Convert insights to action | Execution |
| `5p-portfolio` | ● Loops | Maintain multiple pathways | Risk + innovation |
| `5p-pause-promote` | ●〰 | Choose what matters | Prioritisation |
| `5p-progress` | ▲● | Build learning systems | Capability building |

### 🔮 Advanced Frameworks

| Skill | Description | Best For |
|-------|-------------|----------|
| `eee-layer` | Ethics, Emotion, Emergence — the missing layer | Values-based design |
| `ai-in-the-loop` | 4 collaboration modes + Human-AI Spiral | AI workflow design |
| `co-intelligent-organisation` | 4 archetypes for org-scale AI | Transformation |

## The Rhythm System

Every framework uses the **Lines-Loops-Vibes** rhythm system:

- **▲ Lines** — Structured, intentional, systematic. Best when the path is clear.
- **● Loops** — Adaptive, experimental, resilient. Best when uncertainty is high.
- **〰 Vibes** — Emergent, sensing, cultural. Best when complexity defies planning.

Most strategic dysfunction happens when an organisation's rhythm doesn't match its environment.

## Quality Assurance

```bash
# Validate all skills
node scripts/validate-skills.js

# Get enhancement suggestions for a specific skill
node scripts/enhance-skill.js face-paralysis

# Summary of all skills
node scripts/enhance-skill.js
```

## The Book Behind the Skills

Every framework in this collection comes from **[The Helix Moment](https://suhitanantula.com/books/helix-moment)** — 33 chapters on strategy, design, and co-intelligence in motion.

Each skill links directly to the relevant chapter, so you can:
- Read the full reasoning behind each framework
- See the real-world examples in context
- Understand how frameworks connect to each other
- Follow the story from diagnosis to transformation

**Read the book:** [suhitanantula.com/books/helix-moment](https://suhitanantula.com/books/helix-moment)

## Contributing

This collection reflects the original frameworks from the book. If you have improvements to the skill format, examples, or clarity — contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

Please don't alter the core framework logic without alignment with the book's principles.

## License

CC-BY-NC-SA-4.0 — These frameworks are original intellectual property. You're free to use and adapt them with attribution, for non-commercial purposes, under the same license. The book content remains the authoritative source.

## Author

**Suhit Anantula** — [The Helix Lab](https://suhitanantula.com)

AI strategy consulting, use-case development, and the intersection of strategy, design, and co-intelligence.

---

**Found this useful?** Star the repo, read the book, and share it with someone who's stuck in one of the Seven Faces.
