// Barcha CSS qoidalaridan och fon / to'q matn / och chegara qo'ygan qoidalarni yig'adi (tungi rejim generatori uchun).
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises'; import { join } from 'node:path';
const THREE=process.env.THREE_DIR || '';
const browser = await chromium.launch({ args:['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 1366, height: 860 } });
await ctx.route(/firebase-config\.js/,(r)=>r.fulfill({contentType:'application/javascript',body:"window.ZK_CONFIG={firebase:{},loginDomain:'zukko-kimyo.uz'};"}));
if (THREE) await ctx.route(/three@0\.160\.0\//,async(r)=>{const rel=r.request().url().split('three@0.160.0/')[1];try{r.fulfill({contentType:'application/javascript',body:await readFile(join(THREE,rel))})}catch{r.abort()}});
await ctx.route(/fonts\.(googleapis|gstatic)\.com/,(r)=>r.fulfill({contentType:'text/css',body:''}));
const page = await ctx.newPage();
await page.goto(`http://localhost:${process.env.PORT || 8080}/index.html?mock#home`); await page.waitForSelector('.zk-gate form',{timeout:30000});
const gateRules = await page.evaluate(() => [...document.querySelectorAll('style')].map((s) => s.id || s.textContent.slice(0, 60)));
await page.fill('#zkL','admin'); await page.fill('#zkP','admin123'); await page.click('.zk-gate .go'); await page.locator('.zk-gate .alt').click();
await page.waitForFunction(()=>!document.querySelector('.zk-gate')&&document.querySelector('#app')?.children.length,null,{timeout:30000});
for (const h of ['home','g6','g6-5','tests','lab','lab-soda-vinegar','ptable','me','certificate','admin','teacher','book-g6']) { await page.evaluate((h)=>{location.hash='#'+h},h); await page.waitForTimeout(1500); }
const out = await page.evaluate(() => {
  const res = [];
  const walk = (rules, media, src) => {
    for (const r of rules) {
      if (r.type === 4) { walk(r.cssRules, (media ? media + ' and ' : '') + r.conditionText, src); continue; }
      if (r.type === 12 || r.cssRules && !r.selectorText) { if (r.cssRules) walk(r.cssRules, media, src); continue; }
      if (r.type !== 1) continue;
      const st = r.style; const pick = {};
      for (const p of ['background-color', 'background-image', 'color', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color', 'outline-color', 'fill', 'stroke']) {
        const v = st.getPropertyValue(p); if (v) pick[p] = [v, st.getPropertyPriority(p)];
      }
      if (Object.keys(pick).length) res.push({ sel: r.selectorText, media, src, pick });
    }
  };
  for (const sh of document.styleSheets) {
    let src = sh.href ? sh.href.split('/').pop().split('?')[0] : (sh.ownerNode && (sh.ownerNode.id || 'inline:' + [...document.querySelectorAll('style')].indexOf(sh.ownerNode)));
    try { walk(sh.cssRules, '', src); } catch (e) { res.push({ err: String(e), src }); }
  }
  return res;
});
await writeFile(new URL('./rules.json', import.meta.url), JSON.stringify(out));
console.log(out.length, 'rules; sources:', [...new Set(out.map((o) => o.src))].join(', '));
console.log('gate styles', gateRules);
await browser.close();
