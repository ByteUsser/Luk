# Janiczek Foto Portfolio

Portfolio fotograficzne w stacku Next.js 14 + TypeScript + Tailwind CSS + Framer Motion.

## Start

```bash
npm install
npm run dev
```

## Zmienne środowiskowe

Skopiuj `.env.example` do `.env.local` i uzupełnij:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `CONTACT_TO`

## Deploy na Vercel + domena Hostido

1. Wrzuć repo na GitHub i zaimportuj projekt do Vercel.
2. W Vercel ustaw zmienne środowiskowe:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `RESEND_API_KEY`
   - `RESEND_FROM` (docelowo np. `Janiczek Foto <kontakt@janiczekfoto.pl>`)
   - `CONTACT_TO=janiczek.office@gmail.com`
3. W Vercel dodaj domeny:
   - `janiczekfoto.pl`
   - `www.janiczekfoto.pl`
4. W panelu DNS Hostido ustaw rekordy dokładnie takie, jakie pokazuje Vercel
   (najczęściej: `A @ -> 76.76.21.21` oraz `CNAME www -> cname.vercel-dns.com`).
5. Usuń konfliktujące stare rekordy dla `@`/`www` i odczekaj propagację DNS (czasem do kilku godzin).
6. Zweryfikuj działanie:
   - `https://janiczekfoto.pl`
   - `https://www.janiczekfoto.pl` (powinno przekierować na wersję bez `www`)
   - `https://janiczekfoto.pl/sitemap.xml`
   - `https://janiczekfoto.pl/robots.txt`

## Resend (mail z formularza)

1. Dodaj i zweryfikuj domenę nadawcy w Resend.
2. Przepisz rekordy DNS SPF/DKIM podane przez Resend do Hostido.
3. Dopiero po weryfikacji użyj produkcyjnego `RESEND_FROM` na własnej domenie.

## Twoje zdjęcia (lokalne)

Wrzuć zdjęcia do folderu `public/portfolio` z tymi nazwami:

- `hero.jpg`
- `about.jpg`
- `gallery-01.jpg` ... `gallery-06.jpg`
- `service-portrait.jpg`
- `service-plener.jpg`
- `service-couple.jpg`

Po podmianie plików (te same nazwy) strona od razu pokaże Twoje materiały.

## Struktura

- `app/layout.tsx`
- `app/page.tsx`
- `app/kontakt/page.tsx`
- `app/api/contact/route.ts`
- `components/*`
- `lib/cloudinary.ts`
