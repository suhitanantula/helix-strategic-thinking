#!/usr/bin/env node

/**
 * Generate improvement prompts for enhancing Helix skills.
 * Usage: node scripts/enhance-skill.js [skill-name]
 * Without args: shows summary of all skills needing attention.
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');

function analyzeSkill(skillDir) {
  const skillFile = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillFile)) return null;

  const content = fs.readFileSync(skillFile, 'utf-8');
  const name = path.basename(skillDir);

  const checks = {
    hasFrontmatter: content.startsWith('---'),
    hasOverview: content.includes('## Overview'),
    hasWhenToUse: content.includes('## When to Use'),
    hasHowItWorks: content.includes('## How It Works'),
    hasChecklist: content.includes('## Verification Checklist'),
    hasQuestions: content.includes('## Key Questions'),
    hasExamples: content.includes('## Application Example'),
    hasAI: content.includes('## AI Integration'),
    hasBookLink: content.includes('suhitanantula.com'),
    hasDesignRules: content.includes('## Design Rules'),
    hasHumanAI: content.includes('## Human + AI') || content.includes('Human Contribution'),
    hasPitfalls: content.includes('## Pitfalls') || content.includes('## Mental Traps'),
    hasEEE: content.includes('## EEE'),
    wordCount: content.split(/\s+/).length,
  };

  return { name, checks };
}

const skillName = process.argv[2];

if (skillName) {
  const skillDir = path.join(SKILLS_DIR, skillName);
  const analysis = analyzeSkill(skillDir);
  if (!analysis) {
    console.log(`Skill "${skillName}" not found.`);
    process.exit(1);
  }

  console.log(`\n📝 Enhancement Prompt for: ${skillName}\n`);
  console.log('```');
  console.log(`Improve the "${skillName}" skill with the following enhancements:\n`);

  if (!analysis.checks.hasExamples) {
    console.log('1. Add a detailed "Application Example" section with a real-world scenario');
  }
  if (!analysis.checks.hasAI) {
    console.log('2. Add an "AI Integration" section explaining how co-intelligence enhances this framework');
  }
  if (!analysis.checks.hasHumanAI) {
    console.log('3. Add a "Human + AI Collaboration" section breaking down what each brings');
  }
  if (!analysis.checks.hasPitfalls) {
    console.log('4. Add a "Pitfalls to Avoid" or "Mental Traps" section');
  }
  if (!analysis.checks.hasDesignRules) {
    console.log('5. Add "Design Rules" — specific actionable rules from the Helix Moment framework');
  }
  if (!analysis.checks.hasEEE) {
    console.log('6. Add "EEE Activation" — how Ethics, Emotion, Emergence apply to this framework');
  }
  if (analysis.checks.wordCount < 800) {
    console.log(`7. Expand the content (currently ${analysis.checks.wordCount} words, target 800-1200)`);
  }

  console.log('\nMaintain the existing YAML frontmatter and structure. Preserve all book references and chapter links.');
  console.log('```');
} else {
  // Summary of all skills
  const dirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => analyzeSkill(path.join(SKILLS_DIR, d.name)))
    .filter(Boolean);

  console.log('\n📊 Skill Enhancement Summary\n');
  for (const { name, checks } of dirs) {
    const missing = Object.entries(checks)
      .filter(([k, v]) => !k.startsWith('has') || !v)
      .map(([k]) => k.replace('has', ''));
    const score = Object.values(checks).filter(v => v === true).length;
    const total = Object.keys(checks).filter(k => k.startsWith('has')).length;
    console.log(`  ${score >= total - 1 ? '✅' : '⚠️ '} ${name} — ${score}/${total} checks passed (${checks.wordCount} words)`);
  }
  console.log('');
}
