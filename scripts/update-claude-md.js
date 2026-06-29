#!/usr/bin/env node
// Refreshes the <!-- AUTO:skills --> block in CLAUDE.md from skills/ directory YAML frontmatter.
// Run: node scripts/update-claude-md.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CLAUDE_MD = path.join(ROOT, 'CLAUDE.md');

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^"|"$/g, '');
    fm[key] = val;
  }
  return fm;
}

const PHASE_MAP = {
  'using-agent-skills': 'Meta',
  'interview-me': 'Define',
  'idea-refine': 'Define',
  'spec-driven-development': 'Define',
  'planning-and-task-breakdown': 'Plan',
  'incremental-implementation': 'Build',
  'test-driven-development': 'Build',
  'context-engineering': 'Build',
  'source-driven-development': 'Build',
  'doubt-driven-development': 'Build',
  'frontend-ui-engineering': 'Build',
  'api-and-interface-design': 'Build',
  'browser-testing-with-devtools': 'Verify',
  'debugging-and-error-recovery': 'Verify',
  'code-review-and-quality': 'Review',
  'code-simplification': 'Review',
  'security-and-hardening': 'Review',
  'performance-optimization': 'Review',
  'git-workflow-and-versioning': 'Ship',
  'ci-cd-and-automation': 'Ship',
  'deprecation-and-migration': 'Ship',
  'documentation-and-adrs': 'Ship',
  'observability-and-instrumentation': 'Ship',
  'shipping-and-launch': 'Ship',
};

function buildSkillCatalog() {
  const skillsDir = path.join(ROOT, 'skills');
  const dirs = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  const lines = [
    '| Phase | Skill | Description |',
    '|-------|-------|-------------|',
  ];

  for (const dir of dirs) {
    const skillMd = path.join(skillsDir, dir, 'SKILL.md');
    if (!fs.existsSync(skillMd)) continue;
    const content = fs.readFileSync(skillMd, 'utf8');
    const fm = extractFrontmatter(content);
    const desc = (fm.description || '').split('.')[0].trim();
    const phase = PHASE_MAP[dir] || 'Other';
    lines.push(`| ${phase} | \`${dir}\` | ${desc} |`);
  }

  return lines.join('\n');
}

if (!fs.existsSync(CLAUDE_MD)) {
  console.error('CLAUDE.md not found at', CLAUDE_MD);
  process.exit(1);
}

const claudeMd = fs.readFileSync(CLAUDE_MD, 'utf8');
const catalog = buildSkillCatalog();
const newBlock = `<!-- AUTO:skills -->\n${catalog}\n<!-- /AUTO:skills -->`;
const updated = claudeMd.replace(
  /<!-- AUTO:skills -->[\s\S]*?<!-- \/AUTO:skills -->/,
  newBlock
);

if (updated === claudeMd) {
  console.log('No AUTO:skills markers found in CLAUDE.md - no changes made.');
  console.log('Add <!-- AUTO:skills --> and <!-- /AUTO:skills --> markers to enable auto-update.');
  process.exit(0);
}

fs.writeFileSync(CLAUDE_MD, updated);
console.log(`Updated AUTO:skills section (${catalog.split('\n').length - 2} skills).`);
