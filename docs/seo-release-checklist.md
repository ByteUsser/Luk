# Publikacja i pomiar SEO — Bochnia

## Zakres przygotowany

1. Oferta na istniejącym `/fotograf/bochnia`: usługi, ceny początkowe ze wspólnego
   źródła cennika, linki do galerii, przebieg zamówienia i autor fotografii.
2. Naprawa brakujących opcjonalnych wpisów w `package-lock.json`, które blokowały
   czystą instalację zależności.
3. Pomiar kliknięć galerii usług i cennika; rozróżnianie docelowych ścieżek bez
   danych osobowych i parametrów URL.

Nie jest to potwierdzenie wdrożenia. Repozytorium: `ByteUsser/Luk`.
Gałąź lokalna: `seo/bochnia-offer-2026-10-13`.

Sprawdzenia zakończone 13 października: lint zmienionego kodu, kompilacja
TypeScript, pełny `npm run build` oraz 16 przypadków klasyfikacji linków
(galerie usług, cennik, kontakt, kotwice, telefon, Mapy, linki zewnętrzne,
nieprawidłowe wartości i odrzucanie parametrów). To potwierdza działanie kodu
lokalnie, a nie odbiór danych przez produkcyjny panel analityczny.

## Warunki publikacji

- Dostęp GitHub do `Luk` potwierdzony 13 października po aktualizacji przez
  właściciela. Zdalna gałąź została utworzona; wcześniejsza blokada 403 rozwiązana.
- W Vercel ustalić aktualny deployment produkcyjny i jego źródło. Produkcyjny
  katalog `clean-20261012` nie występuje w main z 2 października. Nie traktować
  daty w nazwie katalogu jako dowodu daty wdrożenia. Zgrać bieżące zmiany do
  repozytorium, a następnie przenieść tylko przygotowane poprawki na świeży kod.
- Zapisać poprzedni deployment do ewentualnego przywrócenia. Najpierw preview,
  dopiero po jego sprawdzeniu publikacja na domenie.

## Kontrola preview i domeny po publikacji

Sprawdzić stronę główną, Bochnię, cennik, kontakt oraz wszystkie galerie usług:

- status 200 i właściwe adresy canonical;
- brak niezamierzonego `noindex` na produkcji;
- zachowane aktualne fotografie i ich kolejność;
- oferta Bochni obecna w HTML przed wykonaniem JavaScript;
- ceny zgodne z cennikiem i linki do właściwych galerii;
- na telefonie brak poziomego przewijania, czytelne ceny i działające przyciski;
- link do kontaktu zachowuje `source=landing-bochnia` i lokalizację;
- podgląd nie trafia do indeksu; produkcyjna mapa witryny pozostaje poprawna;
- jeśli Custom Events są dostępne: `click_gallery`, `click_pricing`,
  `click_contact`, `phone_click` docierają do panelu; nie zawierają danych klienta.

Przy błędach 5xx, braku formularza lub utracie bieżącej galerii przywrócić
poprzedni deployment i poprawić przyczynę. Przy braku wzrostu pozycji w kilka
dni nie cofać treści i nie zmieniać ponownie adresów.

## Aktualny punkt odniesienia Search Console

Dotyczy usługi domenowej `sc-domain:janiczekfoto.pl`, wyszukiwanie internetowe.
Dotychczasowy dokument sierpniowy jest historyczny i nie zastępuje eksportu.

1. Porównać 1 lipca–30 września 2026 z 1 kwietnia–30 czerwca 2026.
   Różnica długości okresów: 92 i 91 dni; uwzględnić ją w interpretacji.
2. Sprawdzić analogiczny okres 2025 tylko jeśli są rzeczywiste dane.
   Braku danych nie przedstawiać jako zera lub procentowego wzrostu.
3. Dla krótkoterminowej bazy: 13 września–10 października oraz
   16 sierpnia–12 września (po 28 dni). Jeśli dane nie są pełne, przesunąć
   oba zakresy do ostatniego kompletnego dnia, zachowując długość.
4. Wyeksportować kliknięcia, wyświetlenia, CTR i pozycję według zapytań, stron,
   urządzeń i krajów. Analizę biznesową prowadzić osobno dla Polski, a dane
   wszystkich krajów zachować do wykrycia anomalii.
5. Oddzielić markę: zapytania zawierające `janiczek` oraz zweryfikowane odmiany.
   Zapytanie o fotografa Janika nie jest zapytaniem o Janiczek Foto.
6. Dla `fotograf bochnia`, `bochnia fotograf`, fraz cennikowych oraz usługowych
   sprawdzić wymiary zapytanie + strona. W interfejsie GSC wybrać zapytanie,
   potem zakładkę Strony; same dwa osobne eksporty nie dają tej relacji.
7. W inspekcji URL sprawdzić `/`, `/fotograf/bochnia`, `/cennik`,
   `/galeria-zdjec/sluby`, `/galeria-zdjec/portrety`, `/fotograf/trzciana`:
   indeksowanie, canonical wybrany przez Google, ostatni crawl i pobranie strony.

Suma widocznych zapytań może być mniejsza od sumy strony z powodu anonimizacji.
Zmiany średniej pozycji interpretować razem ze zmianą zestawu zapytań.
Nie wyciągać wniosku o kanibalizacji wyłącznie z istnienia strony głównej
i strony Bochni. Dane kont i eksporty przechowywać prywatnie, poza tym
publicznym repozytorium; nie dodawać tokenów ani haseł.

## Następne decyzje biznesowe

- Potwierdzić rzeczywistą bazę działalności i czy klienci mogą ją odwiedzać.
  Bochnia jako obszar obsługi nie oznacza biura lub studia w Bochni.
- Wybrać dwie usługi o największym znaczeniu biznesowym i potwierdzić zasady
  pakietów: czas pracy, liczba zdjęć, oddanie, rezerwacja, dojazd.
- Wybrać rzeczywiste realizacje z regionu z prawem do publikacji zdjęć.
  Nie podpisywać zdjęć z innych miejsc jako realizacji w Bochni.
- W Profilu Firmy zweryfikować kategorię główną i dodatkowe kategorie, telefon,
  godziny, usługi, adres lub obszar obsługi oraz link oznaczony UTM.
- Opinie pozyskiwać po prawdziwych zleceniach, bez kupowania, nagród i filtrowania
  klientów według zadowolenia. Nie wysyłać wiadomości w imieniu firmy bez osobnej
  autoryzacji wysyłki.
- Kolejne treści tworzyć na podstawie zapytań GSC i brakujących informacji
  klienta, zgodnie z `docs/local-seo.md`. Nie powielać podstron miast.

## Ocena efektów

Po 7 dniach: błędy techniczne i indeksowanie. Po pełnych 28 dniach: zapytania,
strony, kliknięcia bez nazwy firmy i kwalifikowane kontakty; osobno Profil Firmy.
Po 60–90 dniach: powtórzenie porównania i decyzja o kolejnej usłudze lub realizacji.
Zapisywać daty publikacji, promocji i zmian oferty. Uwzględniać sezonowość
wesel i komunii oraz małą próbkę. Jest to kolejność pracy, nie termin obiecanego
wzrostu.

## Dokumentacja źródłowa

- https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=pl
- https://support.google.com/business/answer/7091?hl=pl
- https://support.google.com/business/answer/9918094?hl=pl
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
