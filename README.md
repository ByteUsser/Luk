# Janiczek Foto Portfolio

Portfolio fotograficzne w stacku Next.js 16 + React 19 + TypeScript + Tailwind CSS.

## Start

```bash
npm install
npm run dev
```

## Zmienne środowiskowe

Do lokalnego testu wysyłki skopiuj `.env.example` do `.env.local` i uzupełnij:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `CONTACT_TO`

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` jest opcjonalne przy obecnych lokalnych zdjęciach.
`NEXT_PUBLIC_SANITY_PROJECT_ID` i `NEXT_PUBLIC_SANITY_DATASET` mają bezpieczne,
publiczne wartości domyślne; ustawiaj je tylko przy tworzeniu osobnego środowiska testowego.
Nie zapisuj prawdziwych kluczy w repozytorium.

## Deploy na Vercel + domena Hostido

1. Wrzuć repo na GitHub i zaimportuj projekt do Vercel.
2. W Vercel ustaw zmienne środowiskowe dla środowiska Production:
   - `RESEND_API_KEY`
   - `RESEND_FROM` (docelowo np. `Janiczek Foto <kontakt@janiczekfoto.pl>`)
   - `CONTACT_TO=janiczek.office@gmail.com`
3. W Vercel dodaj domeny:
   - `janiczekfoto.pl`
   - `www.janiczekfoto.pl`
4. W panelu DNS Hostido ustaw rekordy dokładnie takie, jakie w danym momencie pokazuje Vercel.
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
4. Wykonaj ponowne wdrożenie po dodaniu zmiennych środowiskowych.
5. Wyślij jedną wiadomość testową z formularza na stronie i sprawdź:
   - czy dotarła na `CONTACT_TO`,
   - czy odpowiedź w kliencie pocztowym kieruje na adres wpisany w formularzu,
   - czy klient otrzymał automatyczne potwierdzenie,
   - czy w wiadomości widać źródło zapytania,
   - czy formularz pokazuje komunikat powodzenia.

## Pomiar konwersji

1. W projekcie Vercel włącz Web Analytics.
2. Po wdrożeniu sprawdź rejestrowanie odsłon.
3. Jeśli plan obsługuje Custom Events, sprawdź zdarzenia formularza, telefonu,
   galerii, opinii Google i głównych przycisków kontaktowych.
4. Do zdarzeń nie są wysyłane dane wpisywane przez klienta.

## Zdjęcia i galeria

### Panel właściciela

1. Otwórz `/studio`. Strona przekieruje Cię do bezpiecznego panelu hostowanego przez Sanity.
2. Zaloguj się kontem Google właściciela projektu.
3. Wybierz jedyny dokument „Zdjęcia strony”.
4. Edytuj odpowiednią zakładkę: „Strona główna”, „Pełna galeria” albo „O mnie”.
5. Kolejność zmieniaj przeciąganiem. Na stronie głównej można opublikować maksymalnie 5 zdjęć.
6. Kliknij „Publish”. Publiczna strona odświeży treść najpóźniej w ciągu około minuty.

Panel przechowuje pliki w Sanity, a publiczna strona pobiera tylko opublikowane treści.
Jeżeli usługa jest chwilowo niedostępna, strona zachowuje lokalną galerię awaryjną.

### Galerie tematyczne

Każde zdjęcie dodane w zakładce „Pełna galeria” może trafić do jednej z pięciu
podstron: „Portrety”, „Sesje dla par”, „Event i reportaż”, „Motoryzacja” albo
„Podróże”. Wystarczy wybrać wartość w polu „Folder / kategoria galerii” i
opublikować dokument — nie trzeba ręcznie tworzyć folderów ani nowych stron.

Podstrony galerii:

- `/galeria-zdjec/portrety`
- `/galeria-zdjec/sesje-dla-par`
- `/galeria-zdjec/event-i-reportaz`
- `/galeria-zdjec/motoryzacja`
- `/galeria-zdjec/podroze`

Dla dobrego wyglądu i SEO każde zdjęcie powinno mieć krótki tytuł oraz naturalny
opis alternatywny. Kolejność zdjęć na stronie jest taka sama jak w panelu Sanity.
Zdjęcia na stronie głównej wybiera się osobno, maksymalnie pięć najmocniejszych kadrów.

### Lokalny import awaryjny

1. Wrzuć zatwierdzone eksporty do `content/gallery-source/`.
2. Opcjonalnie uzupełnij `content/gallery-source/gallery.json`.
3. Uruchom `npm run gallery:build`.
4. Sprawdź `/galeria-zdjec` oraz stronę główną.

Skrypt tworzy zoptymalizowane pliki w `public/portfolio/gallery/` i aktualizuje
`content/gallery-manifest.json`. Szczegóły znajdują się w `public/portfolio/README.md`.

Jednorazowy import lokalnej galerii do pustego panelu wykonuje `npm run cms:migrate`.
Skrypt nie nadpisze istniejącego dokumentu panelu bez jawnego użycia opcji `--force`.

## Struktura

- `app/layout.tsx`
- `app/page.tsx`
- `app/kontakt/page.tsx`
- `app/api/contact/route.ts`
- `components/*`
- `lib/cloudinary.ts`
