# Oferta Bochni — przygotowanie zmiany, 13 października 2026

Status: przygotowane do weryfikacji; ten zapis nie potwierdza publikacji.

## Jedna hipoteza

Ułatwienie wyboru usługi na `/fotograf/bochnia` przez pokazanie zakresu,
cen początkowych i linków do właściwych galerii powinno poprawić użyteczność
strony dla osoby szukającej fotografa. Wpływ na kliknięcia i kontakty wymaga
pomiaru; nie ma gwarancji poprawy pozycji.

Potwierdzony stan przed zmianą: strona miała ogólny opis, miejsce, dojazd,
link do całego portfolio i cennika, ale bez bezpośrednich linków do galerii
poszczególnych usług w głównej treści. Nowe opisy wykorzystują istniejący
publiczny cennik, `lib/gallery-service-seo.ts` i opis współpracy.
Kwoty są pobierane z tego samego źródła co cennik.

Zmiana dotyczy wyłącznie treści Bochni. Nie zmienia adresów, canonicali,
title, robots, pozostałych lokalizacji, zdjęć, CMS ani formularza.

## Weryfikacja lokalna

- `npm run lint`: zakończone poprawnie.
- `npm run build`: zakończone poprawnie na Next.js 16.2.10, wraz z kontrolą
  TypeScript, galerii (163 zdjęcia w repozytorium) i generowaniem 30 stron.
- Nowa oferta występuje w HTML wygenerowanym na serwerze dla Bochni;
  pięć linków usług prowadzi do istniejących wygenerowanych stron.
  Sekcja nie występuje na stronie Trzciany; canonical Bochni pozostaje bez zmian.
- Nie wykonano testu wizualnego w przeglądarce ani testowego wysłania formularza.
- Pierwsze `npm ci` na Node 24.19.0 / npm 11.9.0 zakończyło się błędem:
  w istniejącym lockfile brakowało opcjonalnych pakietów Rolldown.
  `npm install` uzupełniło wyłącznie brakujące wpisy (309 dodanych linii),
  bez zmiany `package.json` i bez zmiany istniejących wpisów lockfile.
  Następne `npm ci --ignore-scripts --dry-run --no-audit --no-fund`
  zakończyło się poprawnie. Naprawa lockfile jest oddzielną zmianą techniczną.

## Dostęp GitHub

Pierwsza próba utworzenia gałęzi przez integrację GitHub zwróciła
403 `Resource not accessible by integration`. Po rozszerzeniu dostępu przez
właściciela 13 października utworzono zdalną gałąź
`seo/bochnia-offer-2026-10-13`. Blokada zapisu została usunięta.
Publikacja na domenie wymaga jeszcze uzgodnienia źródła bieżącej produkcji.

## Punkt odniesienia i pomiar

- Historyczne dane w `seo-baseline-2026-08-11.md` są zapisem wcześniejszego
  raportu, a nie odczytem API wykonanym 13 października.
- Przed publikacją uzupełnić aktualne pełne 28 dni i poprzednie 28 dni GSC:
  wyszukiwanie internetowe, Polska, dokładna strona
  `https://janiczekfoto.pl/fotograf/bochnia`; eksport zapytań i urządzeń.
- Osobno sprawdzić zapytania o Bochnię dla całej witryny i ich strony docelowe.
  Nie zakładać kanibalizacji bez tego porównania.
- Zapisać datę rzeczywistego wdrożenia. Po 7 dniach sprawdzić dostępność
  i indeksowanie; wynik treści oceniać po pełnych 28 dniach, uwzględniając
  sezonowość i małą próbkę.
- Porównać kliknięcia bez nazwy firmy, przejścia do usług/cennika i prawdziwe
  kontakty z istniejącym oznaczeniem `landing-bochnia`. Sam klik przycisku
  nie jest pozyskanym klientem.

## Warunek bezpiecznej publikacji

Punkt wyjścia: `ByteUsser/Luk`, main `6288b801abc9180c6401475bedd22352ff13f72a`
z 2 października. GitHub zapisuje udane wdrożenie Vercel tego commita.
W publicznej galerii i sitemapie 13 października są jednak ścieżki
`/portfolio/gallery/clean-20261012/`, których nie ma w tym commicie.
Przed wdrożeniem trzeba ustalić źródło aktualnej produkcji i zachować późniejsze
zmiany. Nie wdrażać całego snapshotu z 2 października na podstawie samej
zgodności nazw repozytorium i projektu Vercel.

## Informacje do następnego etapu

Od właściciela: dwie priorytetowe usługi; faktyczne zasady pakietów
(zakres, liczba zdjęć, czas pracy, termin oddania); realizacje z Bochni,
które można opisać i opublikować. Bez tych danych nie dodawać deklaracji
o cenach końcowych, dostępnych terminach, liczbie zdjęć ani lokalizacji sesji.
