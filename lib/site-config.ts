export const SITE_CONFIG = {
  name: "Janiczek Foto",
  owner: "Janiczek Łukasz",
  domain: "janiczekfoto.pl",
  url: "https://janiczekfoto.pl",
  updatedAt: "2026-07-22",
  city: "Bochnia",
  email: "janiczek.office@gmail.com",
  phone: "+48733416675",
  phoneDisplay: "733 416 675",
  ogImage: "/og/cover-final-1200x630.jpg",
  social: {
    instagram: "https://www.instagram.com/janiczekfoto/",
    facebook: "https://www.facebook.com/profile.php?id=61586472251565"
  },
  googleBusinessProfile:
    "https://www.google.com/maps?cid=13531230020019593453",
  primaryAreas: [
    "Bochnia",
    "powiat bocheński",
    "Kraków",
    "Tarnów",
    "Małopolska"
  ],
  secondaryAreas: [
    "Brzesko",
    "Rzezawa",
    "Nowy Wiśnicz"
  ]
} as const;

export const STATIC_ROUTES = ["/", "/galeria-zdjec", "/fotograf", "/cennik", "/o-mnie", "/kontakt", "/polityka-prywatnosci"] as const;
