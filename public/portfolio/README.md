# Portfolio images

Ten folder jest publiczny, więc powinny tu trafiać tylko pliki używane przez stronę.
Ciężkie oryginały i pliki robocze trzymaj poza `public`, np. w `content/portfolio-originals/`.

Na stronie głównej używane są zoptymalizowane pliki:

- `hero-opt.jpg`
- `about-opt.jpg`
- `gallery-01-opt.jpg` ... `gallery-06-opt.jpg`
- `service-portrait-opt.jpg`
- `service-plener-opt.jpg`
- `service-couple-opt.jpg`

Jeśli chcesz zmienić kolejność kadrów, podmieniamy mapowanie w `app/page.tsx`.

## Pełna galeria zdjęć

Pełna podstrona `/galeria-zdjec` korzysta z manifestu `content/gallery-manifest.json`.

Nowe zdjęcia dodawaj tak:

1. Wyeksportuj z Lightrooma tylko kadry zatwierdzone do publikacji.
2. Wrzuć je do `content/gallery-source/`.
3. Opcjonalnie opisz je w `content/gallery-source/gallery.json`.
4. Uruchom `npm run gallery:build`.
5. Sprawdź `/galeria-zdjec` lokalnie i dopiero wtedy publikuj zmiany.

Skrypt generuje zoptymalizowane pliki do `public/portfolio/gallery/` oraz aktualizuje manifest używany przez Next.js.
