#!/usr/bin/env node

/**
 * Validate all Helix strategic thinking skills against quality criteria.
 * Usage: node scripts/validate-skills.js
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');

// Use flexible matching — check if ANY of the alternatives appears
const REQUIRED_PATTERNS = [
  { name: 'Overview', patterns: ['## Overview'] },
  { name: 'When to Use', patterns: ['## When to Use', '## When to Use This', '## Quick Diagnostic'] },
  { name: 'How It Works / Process', patterns: ['## How It Works', '## The Diagnosis', '## The Solution', '## Root Cause', '## The Strategy Framework', '## Diagnostic Questions', '## Solution'] },
  { name: 'Verification Checklist', patterns: ['## Verification Checklist'] },
  { name: 'Key Questions', patterns: ['## Key Questions'] },
];

const RECOMMENDED_PATTERNS = [
  { name: 'Application Example', patterns: ['## Application Example', '## Real-World Example'] },
  { name: 'AI Integration', patterns: ['## AI Integration', '## AI as', '## Human + AI'] },
  { name: 'Book Source Link', patterns: ['suhitanantula.com'] },
  { name: 'Pitfalls / Traps', patterns: ['## Mental Traps', '## Pitfalls', '## Traps to Avoid'] },
  { name: 'Combining with Other', patterns: ['## Combining with', '## Transition to', '## Cross-Reference'] },
];

const ENRICHMENT_PATTERNS = [
  '## Design Rules',
  '## EEE Activation',
  '## Human + AI',
  '## Practical Steps',
  '## Pitfalls',
  '## The Root Cause',
  '## The Strategy Framework',
  '## Transition to',
];

function validateSkill(skillDir) {
  const skillFile = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    return { name: path.basename(skillDir), error: 'No SKILL.md found' };
  }

  const content = fs.readFileSync(skillFile, 'utf-8');
  const issues = [];
  const warnings = [];
  const enrichment = [];

  // Check YAML frontmatter
  if (!content.startsWith('---')) {
    issues.push('Missing YAML frontmatter');
  } else {
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
      issues.push('Unclosed YAML frontmatter');
    } else {
      const frontmatter = content.substring(0, frontmatterEnd);
      if (!frontmatter.includes('name:')) {
        issues.push('Missing "name" in frontmatter');
      }
      if (!frontmatter.includes('description:')) {
        issues.push('Missing "description" in frontmatter');
      }
    }
  }

  // Check required sections (flexible matching)
  for (const req of REQUIRED_PATTERNS) {
    if (!req.patterns.some(p => content.includes(p))) {
      issues.push(`Missing required section: ${req.name}`);
    }
  }

  // Check recommended sections (flexible matching)
  for (const rec of RECOMMENDED_PATTERNS) {
    if (!rec.patterns.some(p => content.includes(p))) {
      warnings.push(`Missing recommended: ${rec.name}`);
    }
  }

  // Check enrichment sections
  for (const section of ENRICHMENT_PATTERNS) {
    if (content.includes(section)) {
      enrichment.push(section);
    }
  }

  // Check book source link
  if (!content.includes('suhitanantula.com')) {
    warnings.push('No link back to book (suhitanantula.com)');
  }

  // Word count
  const words = content.split(/\s+/).length;
  if (words < 500) {
    warnings.push(`Skill may be too short (${words} words, recommended 800+)`);
  }

  return {
    name: path.basename(skillDir),
    words,
    issues,
    warnings,
    enrichment: enrichment.length,
    score: calculateScore(issues, warnings, enrichment.length),
  };
}

function calculateScore(issues, warnings, enrichment) {
  let score = 100;
  score -= issues.length * 15;
  score -= warnings.length * 5;
  score += Math.min((enrichment || 0) * 3, 15);
  if (isNaN(score)) return 0;
  return Math.max(0, Math.min(100, score));
}

// Main
const skillDirs = fs
  .readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(SKILLS_DIR, d.name))
  .sort();

console.log(`\n🔍 Validating ${skillDirs.length} Helix strategic thinking skills...\n`);

const results = skillDirs.map(validateSkill);

for (const r of results) {
  if (r.error) {
    console.log(`❌ ${r.name}: ${r.error}`);
    continue;
  }
  const icon = r.score >= 90 ? '✅' : r.score >= 70 ? '⚠️' : '🔴';
  console.log(`${icon} ${r.name} — Score: ${r.score} (${r.words} words, ${r.enrichment} enrichment sections)`);
  for (const issue of r.issues) console.log(`   ❌ ${issue}`);
  for (const warning of r.warnings) console.log(`   ⚠️  ${warning}`);
}

const validResults = results.filter((r) => !r.error && !isNaN(r.score));
const totalScore = validResults.reduce((sum, r) => sum + r.score, 0);
const avgScore = validResults.length > 0 ? Math.round(totalScore / validResults.length) : 0;
const passing = validResults.filter((r) => r.score >= 80).length;

console.log(`\n📊 Summary: ${results.length} skills, ${passing} passing (≥80), average score: ${avgScore}`);
console.log(`\n${avgScore >= 85 ? '✅' : '⚠️'} Overall quality: ${avgScore}/100\n`);
