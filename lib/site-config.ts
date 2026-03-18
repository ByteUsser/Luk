export const SITE_CONFIG = {
  name: "Janiczek Foto",
  owner: "Janiczek Łukasz",
  domain: "janiczekfoto.pl",
  url: "https://janiczekfoto.pl",
  updatedAt: "2026-03-18",
  city: "Bochnia",
  email: "janiczek.office@gmail.com",
  ogImage: "/og/cover-1200x630.jpg",
  social: {
    instagram: "https://www.instagram.com/janiczekfoto/",
    facebook: "https://www.facebook.com/profile.php?id=61586472251565"
  },
  googleBusinessProfile:
    "https://www.google.com/search?q=janiczekfoto&oq=janiczekfoto+&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARAjGCcyCAgCEEUYJxg7MgcIAxAAGO8FMgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxNjU1ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8",
  primaryAreas: [
    "Bochnia",
    "powiat bocheński",
    "Nowy Wiśnicz",
    "Królówka",
    "Trzciana",
    "Łapanów",
    "Łąkta Dolna",
    "Łąkta Górna",
    "Żegocina",
    "Limanowa",
    "Kraków"
  ]
} as const;

export const STATIC_ROUTES = ["/", "/fotograf", "/cennik", "/kontakt", "/polityka-prywatnosci"] as const;
