const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "demo";
const LOCAL_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48cmVjdCB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIGZpbGw9JyNGQUY4RjQnLz48L3N2Zz4=";

type ImageOptions = {
  width?: number;
  quality?: "auto" | number;
  crop?: "fill" | "fit" | "scale";
};

function buildTransformation(options?: ImageOptions): string {
  const width = options?.width ?? 1600;
  const quality = options?.quality ?? "auto";
  const crop = options?.crop;
  const parts = [`f_auto`, `q_${quality}`, `w_${width}`];

  if (crop) {
    parts.push(`c_${crop}`);
  }

  return parts.join(",");
}

export function cloudinaryUrl(publicId: string, options?: ImageOptions): string {
  if (publicId.startsWith("/")) {
    return publicId;
  }

  const transformations = buildTransformation(options);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export function cloudinaryBlur(publicId: string): string {
  if (publicId.startsWith("/")) {
    return LOCAL_BLUR_DATA_URL;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/e_blur:2000,q_1,f_auto,w_40/${publicId}`;
}

export function cloudinaryAsset(publicId: string, options?: ImageOptions) {
  return {
    src: cloudinaryUrl(publicId, options),
    blurDataURL: cloudinaryBlur(publicId)
  };
}
