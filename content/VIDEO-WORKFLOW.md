# Wideo na stronę Janiczek Foto

Z jednego gotowego eksportu przygotuj komplet do panelu Sanity:

```bash
npm run video:build -- \
  --input "/sciezka/do/filmu.mp4" \
  --slug "krotka-nazwa" \
  --start 2
```

`--start` wskazuje sekundę, od której zaczyna się podgląd i z której powstaje
miniatura. Opcjonalne `--duration` może mieć od 4 do 15 sekund; domyślnie 10.

Pliki powstają w `/tmp/janiczek-video-web`:

- `*-full.mp4` — pełny film H.264, maksymalnie 1920 px na dłuższym boku;
- `*-preview.mp4` — pionowy, wyciszony podgląd 540 × 960 px;
- `*-poster.jpg` — pionowa miniatura 540 × 960 px.

Skrypt nie zmienia oryginału i nie nadpisuje istniejących plików. Wszystkie trzy
pliki dodaj do jednego wpisu filmu w panelu `/studio`.
