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
    "https://www.google.com/maps/place/JaniczekFoto/@49.9516995,20.2157268,10z/data=!4m10!1m2!2m1!1sJaniczek+Foto+Bochnia!3m6!1s0x2a65251ba686ea0f:0xbbc89602fd5ea0ed!8m2!3d49.9516995!4d20.2157268!15sChVKYW5pY3playBGb3RvIEJvY2huaWGSAQxwaG90b2dyYXBoZXLgAQA!16s%2Fg%2F11z1x7tcnq",
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
