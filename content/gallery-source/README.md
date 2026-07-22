# Zdjęcia źródłowe do galerii strony

Eksportuj tutaj tylko zdjęcia zatwierdzone do publikacji. Jeśli kadr dotyczy klienta, upewnij się, że masz
zgodę na pokazanie go na stronie.

## Ile zdjęć przygotować

Na pierwszą mocną wersję galerii przygotuj 45-70 zdjęć:

- `Portrety`: 18-24 zdjęcia, w tym 6-8 pionowych mocnych kadrów.
- `Sesje dla par`: 8-12 zdjęć z emocją, ruchem i naturalną bliskością.
- `Event i reportaż`: 8-12 zdjęć z momentami, detalami, ludźmi i atmosferą.
- `Motoryzacja`: 4-8 zdjęć, jeśli ta kategoria ma zostać częścią portfolio.
- `Podróże`: 4-8 zdjęć tylko wtedy, gdy pasują do tonu marki.

Na homepage wybierz osobno 6 najmocniejszych zdjęć: 2 portrety, 1 para/lifestyle, 1 reportaż/event,
1 plener i 1 kadr charakterystyczny dla Twojego stylu.

## Eksport z Lightrooma

- Format: JPG.
- Kolor: sRGB.
- Dłuższy bok: 2400-3000 px.
- Jakość: 80-90.
- Bez danych prywatnych/GPS, jeśli zdjęcie dotyczy klienta.

## Wrzucenie na stronę

Wrzuć eksporty do tego folderu, a potem uruchom:

```bash
npm run gallery:build
```

Skrypt zapisze zoptymalizowane pliki do `public/portfolio/gallery/` i zaktualizuje
`content/gallery-manifest.json`.

Opcjonalne opisy możesz dodać w `gallery.json` obok zdjęć:

```json
[
  {
    "file": "IMG_001.jpg",
    "title": "Miejski portret",
    "alt": "Naturalny portret w Bochni - Janiczek Foto",
    "category": "Portrety",
    "featured": true
  }
]
```

Dozwolone kategorie: `Portrety`, `Sesje dla par`, `Motoryzacja`, `Podróże`, `Event i reportaż`.

Po wygenerowaniu sprawdź lokalnie:

```bash
npm run dev
```

Wejdź na `/galeria-zdjec`, sprawdź filtry i podgląd zdjęć, a przed publikacją uruchom:

```bash
npm run build
```
