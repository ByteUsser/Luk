# Lokalne SEO — zasady oparte na danych

## Kierunek

Publiczne treści lokalne odpowiadają na potwierdzone zapytania o fotografa w
konkretnej miejscowości. Nie publikujemy dokładnych tras sesji, najlepszego
światła, punktów dojścia ani innych notatek scoutingowych.

Aktualne strony priorytetowe:

- `/fotograf/bochnia`,
- `/fotograf/powiat-bochenski`,
- `/fotograf/nowy-wisnicz`,
- `/fotograf/trzciana`,
- `/fotograf/zegocina`.

Kraków i Tarnów pozostają dostępne dla klientów z bezpośredniego linku, ale
mają `noindex, follow` i nie występują w sitemapie. Dalszy dojazd nadal można
ustalić indywidualnie.

## Warunek utworzenia nowej strony

Nowa strona miejscowości powstaje wyłącznie, gdy łącznie spełnia trzy warunki:

1. Search Console pokazuje co najmniej 20 kwalifikowanych wyświetleń w pełnych
   28 dniach albo 2 kliknięcia w 90 dniach.
2. Miejscowość jest potwierdzonym obszarem działania.
3. Mamy unikalny materiał, prawdziwą realizację, opinię lub informację przydatną
   klientowi. Sama zamiana nazwy miejscowości w szablonie nie wystarcza.

Jeśli danych jest za mało, zapisujemy hipotezę i wracamy do niej po kolejnym
pełnym okresie pomiarowym. Nie tworzymy strony „na zapas”.

## Miesięczna kontrola

Porównuj pełne 28 dni z poprzednimi 28 dniami, używając tych samych filtrów:

- kliknięcia, wyświetlenia, CTR i średnia pozycja lokalnych zapytań,
- strony docelowe dla każdej frazy,
- wejścia z Google w Vercel Web Analytics,
- wizyty na `/cennik` i `/kontakt`,
- prawdziwe wiadomości oznaczone źródłem `landing-*`.

W raporcie zapisuj źródło, zakres dat i wielkość próbki. Dane z USA, podglądów
Vercela i testów własnych oznaczaj osobno. Nie traktuj pojedynczych tygodniowych
skoków jako trendu biznesowego.

## Reguły zmian

- Oddzielaj fakt od interpretacji.
- Zmieniaj jedną istotną hipotezę naraz i zapisuj bazę przed wdrożeniem.
- Po 7 dniach oceniaj tylko indeksowanie i błędy techniczne.
- Skuteczność treści oceniaj najwcześniej po pełnych 28 dniach.
- Nie zmieniaj co kilka dni tytułów, adresów ani canonicali.
- Jeśli po dwóch okresach 28-dniowych strona Trzciany nadal nie uzyska
  kliknięcia, a strona główna pozostanie co najmniej 3 pozycje wyżej,
  rozważ konsolidację z główną lub stroną powiatu.

Punkt odniesienia z 11 sierpnia 2026 znajduje się w
[`seo-baseline-2026-08-11.md`](seo-baseline-2026-08-11.md).
