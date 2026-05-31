# Contributing to Helix Strategic Thinking

Thank you for your interest in improving this collection!

## What We Welcome

- **Clarity improvements** — Making skills easier to understand and apply
- **Example additions** — New real-world examples that illustrate a framework
- **Format consistency** — Ensuring all skills follow the same structure
- **Validation fixes** — Fixing issues found by the validation script
- **Translation** — Helping make these frameworks accessible in other languages

## What We Don't Change

- **Core framework logic** — The frameworks come from *The Helix Moment* book. The book is the authoritative source.
- **Book references and links** — These must stay intact and accurate
- **Rhythm signatures** — ▲●〰 patterns are intentional and specific

## Skill Structure

Every skill must have:

```yaml
---
name: skill-name
description: Brief description under 200 chars
---
```

### Required Sections
1. **Overview** — Core principle and what the framework does
2. **When to Use** — Scenarios and decision flow
3. **How It Works** — Step-by-step process
4. **Application Example** — At least one real-world example
5. **Verification Checklist** — Checkboxes for self-assessment
6. **Key Questions** — Diagnostic questions from the book

### Recommended Sections
- **AI Integration** — How co-intelligence enhances the framework
- **Book Source** — Link to the relevant chapter
- **Mental Traps / Pitfalls** — What goes wrong
- **Combining with Other Frameworks** — Cross-references

## Validation

Before submitting, run:

```bash
node scripts/validate-skills.js
```

All skills should score 80+ before merging.

## License

By contributing, you agree your contributions will be licensed under CC-BY-NC-SA-4.0.
