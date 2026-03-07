export const SITE_CONFIG = {
  name: "Janiczek Foto",
  owner: "Janiczek Łukasz",
  domain: "janiczekfoto.pl",
  url: "https://janiczekfoto.pl",
  city: "Bochnia",
  email: "janiczek.office@gmail.com",
  ogImage: "/og/cover-1200x630.jpg",
  social: {
    instagram: "https://www.instagram.com/janiczekfoto/",
    facebook: "https://www.facebook.com/profile.php?id=61586472251565"
  },
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

export const STATIC_ROUTES = ["/", "/fotograf", "/kontakt", "/polityka-prywatnosci"] as const;
