// Repozitoriyga maxfiy kalit yoki parol tushib qolmaganini tekshiradi.
// Firebase web "apiKey" (AIza...) maxfiy emas — u faqat firebase-config.js da bo'lishi mumkin.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter((f) => f && !/\.(png|webp|jpg|jpeg|ico|zip|pdf)$/.test(f) && !f.startsWith('node_modules/') && f !== 'package-lock.json');

const PATTERNS = [
  [/sk-(proj-)?[A-Za-z0-9_-]{20,}/, 'OpenAI API kaliti'],
  [/sk-ant-[A-Za-z0-9_-]{20,}/, 'Anthropic API kaliti'],
  [/-----BEGIN (RSA |EC )?PRIVATE KEY-----/, 'maxfiy kalit (private key)'],
  [/"private_key"\s*:\s*"/, 'Google service account kaliti'],
  [/AKIA[0-9A-Z]{16}/, 'AWS kaliti'],
  [/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/, 'GitHub tokeni'],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, 'Slack tokeni'],
];

test('repozitoriyda maxfiy kalitlar yo\'q', () => {
  const found = [];
  for (const f of files) {
    if (f === 'tests/unit/no-secrets.test.mjs') continue;
    const txt = readFileSync(f, 'utf8');
    for (const [re, name] of PATTERNS) if (re.test(txt)) found.push(`${f}: ${name}`);
  }
  assert.deepEqual(found, []);
});

test('Firebase web apiKey faqat firebase-config.js da', () => {
  const where = files.filter((f) => f !== 'firebase-config.js' && !f.startsWith('tests/') && /AIza[0-9A-Za-z_-]{35}/.test(readFileSync(f, 'utf8')));
  assert.deepEqual(where, []);
});

test('.env va secret fayllar git\'ga qo\'shilmagan', () => {
  const bad = files.filter((f) => /(^|\/)\.env(\.|$)|\.secret\.local$|serviceAccount.*\.json$|\.runtimeconfig\.json$/.test(f));
  assert.deepEqual(bad, []);
});
