# Linki kampanii i miesięczny pomiar zapytań

Konwersją jest prawdziwe zapytanie otrzymane z formularza. Vercel Web Analytics
służy do oceny ruchu i zachowania na stronach; płatne Custom Events nie są
wymagane.

## Stałe linki

Używaj wyłącznie domeny produkcyjnej. Dzięki temu ruch z podglądów Vercela nie
miesza się z ruchem potencjalnych klientów.

- Profil firmy w Google:
  `https://janiczekfoto.pl/?utm_source=google&utm_medium=organic&utm_campaign=profil_firmy`
- Bio na Instagramie:
  `https://janiczekfoto.pl/?utm_source=instagram&utm_medium=social&utm_campaign=profil`
- Profil na Facebooku:
  `https://janiczekfoto.pl/?utm_source=facebook&utm_medium=social&utm_campaign=profil`

## Posty i rolki

Do linku dodaj `utm_content`, aby rozpoznać konkretną publikację. Stosuj małe
litery, podkreślenia i datę bez danych klienta, np.:

```text
https://janiczekfoto.pl/cennik?utm_source=instagram&utm_medium=social&utm_campaign=sesje_portretowe&utm_content=rolka_2026_08_05
```

Nie zmieniaj nazw parametrów w trakcie tej samej kampanii. Przed publikacją
otwórz link w prywatnym oknie i sprawdź, czy prowadzi na właściwą stronę.

## Kontrola raz w miesiącu

1. W skrzynce wyszukaj wiadomości o temacie zaczynającym się od `[LEAD]`.
2. Policz prawdziwe zapytania według etykiety i źródła w temacie wiadomości.
3. W Vercel Web Analytics zapisz dla domeny produkcyjnej:
   - użytkowników i odsłony,
   - wejścia na `/cennik` oraz `/kontakt`,
   - współczynnik odrzuceń,
   - najważniejsze źródła ruchu,
   - podział mobile/desktop.
4. Oceniaj pełne 30 dni. Przy tym poziomie ruchu pojedynczy tydzień jest zbyt
   małą próbą do wyciągania wniosków.

Punkt odniesienia za 30.06–30.07.2026: 62 użytkowników, 228 odsłon i 40%
odrzuceń. Ruch z USA oraz serie wejść na adresy `*.vercel.app` mogą pochodzić
z botów lub testów i nie powinny być traktowane jak zapytania klientów.

## Google Search Console

Stan sprawdzony 30.07.2026:

- usługa domenowa `janiczekfoto.pl` jest już zweryfikowana,
- mapa `https://janiczekfoto.pl/sitemap.xml` ma status „Sukces”,
- Search Console wykrywa obecnie 17 stron,
- po wdrożeniu nowych stron lokalnych liczba wykrytych adresów powinna wzrosnąć.

Nie dodawaj usługi ani mapy ponownie. Raz w miesiącu sprawdzaj zapytania,
kliknięcia, wyświetlenia i indeksowanie. Strony dla Trzciany i Nowego Wiśnicza
powstały na podstawie faktycznych wyświetleń w Search Console, bez deklarowania
niepotwierdzonych realizacji w tych miejscowościach.

## Profil Firmy Google

- nazwa pozostaje zgodna z marką: `Janiczek Foto`, bez dopisywania miejscowości
  i fraz usługowych,
- link do strony używa przygotowanego wariantu UTM dla profilu firmy,
- usługi i obszar działania muszą zgadzać się z informacjami na stronie,
- publikuj tylko prawdziwe zdjęcia własnych realizacji lub rekonesansów,
- odpowiadaj naturalnie na opinie, bez kopiowania tej samej odpowiedzi,
- raz w miesiącu zestaw dane profilu z leadami oznaczonymi `[LEAD]`.
