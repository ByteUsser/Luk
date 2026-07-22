import { defineField, defineType } from "sanity";
import { managedPhotoArrayMember } from "./managedPhoto";
import { managedVideoArrayMember } from "./managedVideo";

export const siteContent = defineType({
  name: "siteContent",
  title: "Materiały strony",
  type: "document",
  groups: [
    { name: "home", title: "Strona główna", default: true },
    { name: "video", title: "Wideo" },
    { name: "gallery", title: "Pełna galeria" },
    { name: "about", title: "O mnie" }
  ],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Nazwa",
      type: "string",
      initialValue: "Janiczek Foto",
      readOnly: true,
      hidden: true
    }),
    defineField({
      name: "heroImage",
      title: "Główne zdjęcie otwierające stronę",
      type: "image",
      group: "home",
      options: { hotspot: true },
      description: "Ustaw punkt kadrowania na twarzy lub najważniejszym elemencie zdjęcia."
    }),
    defineField({
      name: "homepageGallery",
      title: "Zdjęcia na stronie głównej",
      type: "array",
      group: "home",
      description: "Przeciągnij zdjęcia, aby zmienić kolejność. Strona pokazuje maksymalnie pięć.",
      of: [managedPhotoArrayMember],
      options: { sortable: true },
      validation: (rule) => rule.max(5).error("Na stronie głównej może być maksymalnie 5 zdjęć.")
    }),
    defineField({
      name: "homepageVideos",
      title: "Filmy na stronie głównej",
      type: "array",
      group: "video",
      description: "Dodawaj filmy i zmieniaj ich kolejność przeciąganiem. Sekcja znika, gdy lista jest pusta.",
      of: [managedVideoArrayMember],
      options: { sortable: true }
    }),
    defineField({
      name: "gallery",
      title: "Pełna galeria",
      type: "array",
      group: "gallery",
      description:
        "Dodaj zdjęcia, wybierz dla każdego folder / kategorię i ustaw kolejność przeciąganiem. Podstrony tematyczne zaktualizują się automatycznie.",
      of: [managedPhotoArrayMember],
      options: { sortable: true }
    }),
    defineField({
      name: "aboutImage",
      title: "Zdjęcie na stronie O mnie",
      type: "image",
      group: "about",
      options: { hotspot: true },
      description: "Najlepiej sprawdzi się pionowe zdjęcie. Punkt kadrowania zachowamy również na telefonie."
    })
  ],
  preview: {
    prepare() {
      return { title: "Materiały Janiczek Foto", subtitle: "Strona główna, wideo, galeria i O mnie" };
    }
  }
});
