# Tungi rejim qatlamini qayta hosil qilish

`theme-dark.css` qo'lda tahrirlanmaydi — u eski CSS qatlamlaridagi och fon / to'q matn / och chegara
qoidalarining tungi muqobili. Yangi CSS qo'shilganda (ayniqsa qattiq yozilgan `#fff` va h.k.) qayta hosil qiling:

```bash
npm run serve            # yoki: python3 -m http.server 8080
PORT=8080 node tools/dark-mode/rules.mjs      # barcha rang qoidalarini yig'adi -> tools/dark-mode/rules.json
python3 tools/dark-mode/gen_dark.py           # -> theme-dark.css
```

Aniq tuzatishlar (`html[data-theme="dark"] ...`) `theme.css` ga yoziladi — u keyin yuklanadi va ustun turadi.
Eng yaxshisi: yangi komponentlarda rang uchun `var(--zk-*)` tokenlaridan foydalaning — ular tungi rejimda o'zi almashadi.
