import { defineArrayMember, defineField, defineType } from "sanity";
import { GALLERY_CATEGORY_DEFINITIONS } from "../../lib/gallery-categories";

export const galleryCategories = GALLERY_CATEGORY_DEFINITIONS.map((category) => ({
  title: category.label,
  value: category.name
}));

export const managedPhoto = defineType({
  name: "managedPhoto",
  title: "Zdjęcie",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Plik zdjęcia",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required().error("Dodaj zdjęcie.")
    }),
    defineField({
      name: "title",
      title: "Krótka nazwa",
      type: "string",
      description: "Widoczna tylko w panelu i używana do opisu zdjęcia.",
      validation: (rule) => rule.required().max(70)
    }),
    defineField({
      name: "alt",
      title: "Opis zdjęcia dla Google i osób niewidomych",
      type: "string",
      description: "Jedno naturalne zdanie opisujące to, co naprawdę znajduje się na zdjęciu.",
      validation: (rule) => rule.required().min(10).max(180)
    }),
    defineField({
      name: "category",
      title: "Folder / kategoria galerii",
      type: "string",
      description: "Wybierz temat. Zdjęcie automatycznie trafi na odpowiednią podstronę galerii.",
      options: { list: [...galleryCategories], layout: "dropdown" },
      initialValue: "Portrety",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "visible",
      title: "Widoczne na stronie",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      visible: "visible"
    },
    prepare({ title, subtitle, media, visible }) {
      return {
        title: title || "Zdjęcie bez nazwy",
        subtitle: visible === false ? `${subtitle || "Bez kategorii"} · ukryte` : subtitle,
        media
      };
    }
  }
});

export const managedPhotoArrayMember = defineArrayMember({
  type: "managedPhoto"
});
