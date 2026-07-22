import { defineArrayMember, defineField, defineType } from "sanity";

export const managedVideo = defineType({
  name: "managedVideo",
  title: "Film",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Pełny film",
      type: "file",
      options: { accept: "video/mp4" },
      description: "Film otwierany po kliknięciu. Najlepiej MP4 w pionie, przygotowany do internetu.",
      validation: (rule) => rule.required().error("Dodaj pełny film.")
    }),
    defineField({
      name: "preview",
      title: "Lekki podgląd",
      type: "file",
      options: { accept: "video/mp4" },
      description: "Krótki, wyciszony fragment odtwarzany na karcie. Zalecane 8–12 sekund.",
      validation: (rule) => rule.required().error("Dodaj lekki podgląd filmu.")
    }),
    defineField({
      name: "poster",
      title: "Miniatura",
      type: "image",
      options: { hotspot: true },
      description: "Pionowy kadr widoczny zanim podgląd zacznie się odtwarzać.",
      validation: (rule) => rule.required().error("Dodaj miniaturę.")
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (rule) => rule.required().max(55)
    }),
    defineField({
      name: "label",
      title: "Krótka kategoria",
      type: "string",
      description: "Na przykład: Reportaż albo Produkt.",
      validation: (rule) => rule.max(35)
    }),
    defineField({
      name: "visible",
      title: "Widoczny na stronie",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label",
      media: "poster",
      visible: "visible"
    },
    prepare({ title, subtitle, media, visible }) {
      return {
        title: title || "Film bez tytułu",
        subtitle: visible === false ? `${subtitle || "Wideo"} · ukryty` : subtitle || "Wideo",
        media
      };
    }
  }
});

export const managedVideoArrayMember = defineArrayMember({
  type: "managedVideo"
});
