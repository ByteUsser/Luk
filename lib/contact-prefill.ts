type ContactPrefill = {
  notice: string;
  message: string;
};

function messageTemplate(topic: string) {
  return `Cześć,

Chcę zapytać o: ${topic}.
Miejsce:
Kiedy:
Co warto wiedzieć:`;
}

const cennikPrefills: Record<string, ContactPrefill> = {
  "cennik-portret": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("zdjęcia portretowe")
  },
  "cennik-dowod": {
    notice: "Masz gotowy szkic wiadomości.",
    message: `Cześć,

Chcę umówić zdjęcie do dowodu z dojazdem.
Miejscowość:
Adres podam po potwierdzeniu terminu.
Kiedy:`
  },
  "cennik-odbitki": {
    notice: "Masz gotowy szkic wiadomości o odbitkach.",
    message: `Cześć,

Chcę zamówić odbitki 10 × 15 cm.
Liczba odbitek:
Sposób dostawy: Paczkomat / kurier
Czy zdjęcia wymagają poprawek:
Co warto wiedzieć:`
  },
  "cennik-para": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("wspólne zdjęcia")
  },
  "cennik-komunia-chrzest": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("komunia / chrzest")
  },
  "cennik-slub": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("ślub / wesele")
  },
  "cennik-event": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("wydarzenie")
  },
  cennik: {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("zdjęcia")
  },
  galeria: {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("zdjęcia")
  },
  "galeria-portrety": {
    notice: "Masz gotowy szkic wiadomości o sesji portretowej.",
    message: messageTemplate("sesję portretową")
  },
  "galeria-sesje-dla-par": {
    notice: "Masz gotowy szkic wiadomości o sesji dla pary.",
    message: messageTemplate("sesję dla pary")
  },
  "galeria-uroczystosci": {
    notice: "Masz gotowy szkic wiadomości o uroczystości.",
    message: messageTemplate("fotografowanie uroczystości")
  },
  "galeria-eventy": {
    notice: "Masz gotowy szkic wiadomości o wydarzeniu.",
    message: messageTemplate("reportaż z wydarzenia")
  },
  "galeria-event-i-reportaz": {
    notice: "Masz gotowy szkic wiadomości o reportażu.",
    message: messageTemplate("reportaż fotograficzny")
  },
  "galeria-motoryzacja": {
    notice: "Masz gotowy szkic wiadomości o zdjęciach samochodu.",
    message: messageTemplate("sesję motoryzacyjną")
  },
  "galeria-podroze": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("zdjęcia")
  },
  "sticky-sitewide": {
    notice: "Masz gotowy szkic wiadomości.",
    message: messageTemplate("zdjęcia")
  },
  dojazd: {
    notice: "Masz gotowy szkic wiadomości.",
    message: `Cześć,

Chcę zapytać o zdjęcia i dojazd.
Miejscowość:
Kiedy:
Co mam sfotografować:`
  },
  lokalizacje: {
    notice: "Masz gotowy szkic wiadomości.",
    message: `Cześć,

Chcę zapytać o zdjęcia.
Miejscowość:
Kiedy:
Co mam sfotografować:`
  }
};

export function getContactPrefill(source: string | null, locationName?: string): ContactPrefill | null {
  if (locationName) {
    return {
      notice: "Masz gotowy szkic wiadomości.",
      message: `Cześć,

Chcę zapytać o zdjęcia w okolicy: ${locationName}
Kiedy:
Co mam sfotografować:
Co warto wiedzieć:`
    };
  }

  if (!source) {
    return null;
  }

  const normalizedSource = source.replace(/-(gora|dol)$/, "");
  return cennikPrefills[normalizedSource] ?? null;
}
