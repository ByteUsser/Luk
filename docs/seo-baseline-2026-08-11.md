# Baza SEO i ruchu — 11 sierpnia 2026

Raport zawiera wyłącznie zagregowane dane. Nie przechowuje danych logowania,
adresów użytkowników ani treści zapytań z formularza.

## Google Search Console

Źródło: raport „Skuteczność”, wyszukiwarka internetowa, cała domena.

### 10 maja–9 sierpnia 2026

- 49 kliknięć,
- 1690 wyświetleń,
- CTR 2,9%,
- średnia pozycja 9,3,
- 52 widoczne zapytania; część rzadkich zapytań jest anonimizowana przez Google,
- urządzenia mobilne: 37 kliknięć i 1313 wyświetleń.

Najważniejsze zapytania:

| Zapytanie | Kliknięcia | Wyświetlenia | CTR | Pozycja |
| --- | ---: | ---: | ---: | ---: |
| fotograf Bochnia | 2 | 200 | 1,0% | 21,3 |
| fotograf Trzciana | 3 | 158 | 1,9% | 5,0 |
| fotograf Nowy Wiśnicz | 0 | 129 | 0% | 5,9 |
| fotograf Bochnia cennik | 2 | 78 | 2,6% | 9,2 |

Najważniejsze strony:

| Strona | Kliknięcia | Wyświetlenia | CTR | Pozycja |
| --- | ---: | ---: | ---: | ---: |
| `/` | 33 | 1021 | 3,2% | 6,4 |
| `/fotograf/nowy-wisnicz` | 5 | 322 | 1,6% | 6,1 |
| `/fotograf/zegocina` | 5 | 31 | 16,1% | 4,1 |
| `/fotograf/bochnia` | 4 | 197 | 2,0% | 19,7 |
| `/cennik` | 2 | 143 | 1,4% | 11,1 |
| `/fotograf/trzciana` | 0 | 236 | 0% | 9,8 |
| `/fotograf/krakow` | 0 | 47 | 0% | 6,6 |

W widocznych 52 zapytaniach nie było fraz odnoszących się do konkretnych
plenerów. To nie dowodzi zerowego popytu, ponieważ Google anonimizuje część
rzadkich zapytań, ale nie daje podstawy do budowy publicznego klastra miejsc.

### 13 lipca–9 sierpnia 2026

- 13 kliknięć,
- 520 wyświetleń,
- CTR 2,5%,
- średnia pozycja 11,1.

## Vercel Web Analytics

Źródło: środowisko Production, 12 lipca–11 sierpnia 2026.

- 87 użytkowników,
- 283 odsłony,
- współczynnik odrzuceń 46%,
- 12 użytkowników z `google.com`,
- 82% użytkowników z Polski i 16% z USA,
- urządzenia: 55% desktop, 45% mobile.

Najczęściej odwiedzane strony:

| Strona | Użytkownicy | Odsłony |
| --- | ---: | ---: |
| `/` | 78 | 135 |
| `/cennik` | 28 | 43 |
| `/kontakt` | 20 | 26 |
| `/galeria-zdjec` | 17 | 30 |
| `/o-mnie` | 10 | 14 |
| `/fotograf/bochnia` | 7 | 7 |

Liczby stron nie tworzą lejka kohortowego: ta sama osoba mogła odwiedzić kilka
adresów, a zagregowane dane nie pokazują kolejności wizyt.

## Vercel Speed Insights

Źródło: Production, ostatnie 7 dni przed 11 sierpnia 2026.

| Urządzenie | RES | LCP | INP | CLS | Punkty danych |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile | 100 | 1,63 s | 88 ms | 0 | 15 |
| Desktop | 100 | 1,14 s | 24 ms | 0 | 20 |

Próbka jest mała. Wyniki uzasadniają zachowanie obecnej architektury wydajności,
ale nie pozwalają wyciągać daleko idących wniosków o każdym typie urządzenia.
