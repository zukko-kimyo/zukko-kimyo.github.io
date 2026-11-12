/* Run with: node tests/ptable.test.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'ptable.js'), 'utf8');
const window = {};
vm.runInNewContext(source, { window });
const { EL, BY, shells, config, confStr } = window.PT;

assert.equal(EL.length, 118, 'All known chemical elements should appear');
assert.equal(new Set(EL.map(e => e.s)).size, 118, 'Symbols must be unique');
assert.equal(new Set(EL.map(e => e.row + ':' + e.col)).size, 118, 'Grid positions must not overlap');
assert.equal(EL[0].s, 'H');
assert.equal(EL[117].s, 'Og');
assert.equal(BY.O.z, 8);
assert.equal(BY.Au.z, 79);
for (const element of EL) {
  assert.equal(element.z, EL.indexOf(element) + 1, 'Atomic number should be sequential');
  assert.equal(shells(element.z).reduce((a, b) => a + b, 0), element.z, element.s + ': electron count mismatch');
  assert.ok(element.uz && element.en && element.m, element.s + ': missing localized name or mass');
  assert.ok(element.cat && element.state && element.block, element.s + ': missing classification');
  assert.ok(confStr(element.z).length > 0, element.s + ': missing configuration');
}
assert.deepEqual(Array.from(shells(11)), [2,8,1]);
assert.deepEqual(Array.from(shells(17)), [2,8,7]);
assert.deepEqual(Array.from(shells(26)), [2,8,14,2]);
console.log('Periodic table tests passed: 118 elements, unique grid, electron sums and sample shells');
