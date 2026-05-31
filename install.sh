#!/usr/bin/env bash
# helix-strategic-thinking — combined installer
# Installs all 19 Helix frameworks as skills for Claude Code and/or Hermes.
#
# Usage:
#   ./install.sh              # Install to Claude Code + Hermes
#   ./install.sh --claude     # Claude Code only
#   ./install.sh --hermes     # Hermes only
#   ./install.sh --uninstall  # Remove from both
#
# After install, invoke in Claude Code:
#   > Use helix-router to find the right framework
#   > Apply face-paralysis to diagnose our strategy problem
#   > Use 5p-perceive to sense what our customers need
#
# Book: https://suhitanantula.com/books/helix-moment
# Repo: https://github.com/suhitanantula/helix-strategic-thinking

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_NAME="helix-strategic-thinking"
SKILLS_SRC="$REPO_DIR/skills"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}✓${NC} $*"; }
warn()  { echo -e "${YELLOW}⚠${NC} $*"; }
error() { echo -e "${RED}✗${NC} $*"; exit 1; }

count_skills() {
  ls -1d "$SKILLS_SRC"/*/SKILL.md 2>/dev/null | wc -l | tr -d ' '
}

install_claude() {
  local target="$HOME/.claude/skills/$PACKAGE_NAME"
  
  # Remove old flat install if it exists
  for skill_dir in "$HOME/.claude/skills"/{helix-model,helix-router,lines-loops-vibes,co-intelligence,strategic-navigation,seven-faces-diagnostic,face-*,5p-*,eee-layer,ai-in-the-loop,co-intelligent-organisation}; do
    if [ -d "$skill_dir" ] && [ ! -L "$skill_dir" ]; then
      local skill_name=$(basename "$skill_dir")
      if grep -q 'helix-router\|face-paralysis\|face-beautiful-plan\|5p-perceive\|eee-layer\|co-intelligence\|lines-loops-vibes\|strategic-navigation\|seven-faces-diagnostic' "$skill_dir/SKILL.md" 2>/dev/null; then
        rm -rf "$skill_dir"
        warn "Removed old flat install: $skill_name"
      fi
    fi
  done
  
  # Create package directory and copy skills
  mkdir -p "$target"
  cp -r "$SKILLS_SRC"/* "$target/"
  
  local count=$(ls -1d "$target"/*/SKILL.md 2>/dev/null | wc -l | tr -d ' ')
  info "Claude Code: $count skills installed to $target"
}

install_hermes() {
  local target="$HOME/.hermes/skills/$PACKAGE_NAME"
  
  mkdir -p "$target"
  cp -r "$SKILLS_SRC"/* "$target/"
  
  local count=$(ls -1d "$target"/*/SKILL.md 2>/dev/null | wc -l | tr -d ' ')
  info "Hermes: $count skills installed to $target"
}

uninstall() {
  local removed=0
  
  # Claude Code
  if [ -d "$HOME/.claude/skills/$PACKAGE_NAME" ]; then
    rm -rf "$HOME/.claude/skills/$PACKAGE_NAME"
    info "Claude Code: removed $PACKAGE_NAME"
    removed=$((removed + 1))
  fi
  
  # Hermes
  if [ -d "$HOME/.hermes/skills/$PACKAGE_NAME" ]; then
    rm -rf "$HOME/.hermes/skills/$PACKAGE_NAME"
    info "Hermes: removed $PACKAGE_NAME"
    removed=$((removed + 1))
  fi
  
  # Old flat installs
  for skill_dir in "$HOME/.claude/skills"/{helix-model,helix-router,lines-loops-vibes,co-intelligence,strategic-navigation,seven-faces-diagnostic,face-*,5p-*,eee-layer,ai-in-the-loop,co-intelligent-organisation}; do
    if [ -d "$skill_dir" ]; then
      rm -rf "$skill_dir"
      warn "Removed old flat install: $(basename $skill_dir)"
    fi
  done
  
  if [ $removed -eq 0 ]; then
    warn "Nothing to uninstall"
  fi
}

# Main
SKILL_COUNT=$(count_skills)
echo ""
echo "  ╔══════════════════════════════════════════════════════╗"
echo "  ║  Helix Strategic Thinking — $SKILL_COUNT frameworks       ║"
echo "  ║  From The Helix Moment by Suhit Anantula            ║"
echo "  ╚══════════════════════════════════════════════════════╝"
echo ""

case "${1:-}" in
  --claude)
    install_claude
    ;;
  --hermes)
    install_hermes
    ;;
  --uninstall)
    uninstall
    ;;
  *)
    install_claude
    install_hermes
    ;;
esac

echo ""
info "Installation complete."
echo ""
echo "  Quick start:"
echo "    Claude Code:  Use helix-router to find the right framework"
echo "    Hermes:       Load helix-router skill"
echo "    Book:         https://suhitanantula.com/books/helix-moment/skills"
echo "    GitHub:       https://github.com/suhitanantula/helix-strategic-thinking"
echo ""
