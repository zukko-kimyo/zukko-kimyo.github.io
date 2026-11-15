# 0006 — "Shisha 2.0" dizayni va tungi rejim

Sana: 2026-11-15 · Holat: taklif (PR orqali ko'rib chiqiladi)

## Kontekst
Foydalanuvchi tungi rejim, silliqroq animatsiyalar va mashhur saytlardan ilhomlangan yangilangan dizaynni so'radi.
Uchta variant (A "Shisha" — Apple, B "Aniq" — Linear/Vercel, C "O'yinli" — Duolingo) dizayn maydonida taqdim etildi;
A tanlandi va dizayn tanqidi hamda WCAG AA tekshiruvidan o'tkazildi.

## Qaror
- Mavjud qatlamlar (index.html ichki CSS, design-refresh, visual-v3, brand-entry, brand) o'zgartirilmaydi.
  Yangi ko'rinish oxirgi qatlam `theme.css` da; mantiq va darslik tuzilishi o'zgarmaydi.
- Tungi rejim `<html data-theme="dark">` orqali. Tokenlar (`--zk-*`) qayta belgilanadi; eski qatlamlardagi
  qattiq yozilgan oq/kulrang ranglar uchun `theme-dark.css` avtomatik hosil qilinadi:
  - neytral och fon → shisha yuza (`--zk-surface-2`) yoki yengil shaffof oq;
  - rangli pastel fon → shu rangning shaffof tusi (rang ma'nosi saqlanadi);
  - to'q matn → och matn; och chegara → `--zk-hair`;
  - keyinroq qoida bilan almashtirilgan (superseded) qoidalar o'tkazib yuboriladi.
  Qayta hosil qilish: `tools/dark-mode/README.md`.
- Bo'lim rangi ustidagi matn rangi JS da hisoblanadi (`onCol`, `ucStrong`): katta matn 3:1, kichik matn 4.5:1.

## Oqibatlar
- Yangi komponent qo'shilganda tungi rejim uchun tokenlardan (`var(--zk-*)`) foydalanish kerak — shunda qo'shimcha ish kerak bo'lmaydi.
- 3D sahnalar (laboratoriya xonasi) ikkala rejimda ham o'z yorug'ligida qoladi.
