const WEDDING_HIGHLIGHTS = [
  "DSC01813.jpg",
  "DSC00073.jpg",
  "DSC00815.jpg",
  "DSC00156.jpg",
  "DSC01992.jpg",
  "DSC02406.jpg",
  "DSC09933.jpg",
  "DSC09574.jpg"
] as const;

const WEDDING_GALLERY_SEQUENCE = [
  "DSC09574.jpg",
  "DSC09582.jpg",
  "DSC09600.jpg",
  "DSC09614.jpg",
  "DSC09634.jpg",
  "DSC09652.jpg",
  "DSC09672.jpg",
  "DSC09678.jpg",
  "DSC09689.jpg",
  "DSC09698.jpg",
  "DSC09703.jpg",
  "DSC09718.jpg",
  "DSC09835.jpg",
  "DSC09887.jpg",
  "DSC09898.jpg",
  "DSC09905.jpg",
  "DSC09907.jpg",
  "DSC09908.jpg",
  "DSC09910.jpg",
  "DSC09933.jpg",
  "DSC09951.jpg",
  "DSC09975.jpg",
  "DSC01759.jpg",
  "DSC00022.jpg",
  "DSC00053.jpg",
  "DSC00073.jpg",
  "DSC00085.jpg",
  "DSC00089.jpg",
  "DSC00107.jpg",
  "DSC00110.jpg",
  "DSC00130.jpg",
  "DSC00156.jpg",
  "DSC00160.jpg",
  "DSC00165.jpg",
  "DSC00196.jpg",
  "DSC00247.jpg",
  "DSC00303.jpg",
  "DSC00400.jpg",
  "DSC00571.jpg",
  "DSC00755.jpg",
  "DSC00815.jpg",
  "DSC00832.jpg",
  "DSC00848.jpg",
  "DSC00953.jpg",
  "DSC00989.jpg",
  "DSC01043.jpg",
  "DSC01129.jpg",
  "DSC01288.jpg",
  "DSC01294.jpg",
  "DSC01302.jpg",
  "DSC01303.jpg",
  "DSC01306.jpg",
  "DSC01336.jpg",
  "DSC01369.jpg",
  "DSC01403.jpg",
  "DSC01446.jpg",
  "DSC01450.jpg",
  "DSC01497.jpg",
  "DSC01546.jpg",
  "DSC01663.jpg",
  "DSC01754.jpg",
  "DSC01757.jpg",
  "DSC01771.jpg",
  "DSC01786.jpg",
  "DSC01807.jpg",
  "DSC01813.jpg",
  "DSC01834.jpg",
  "DSC01867.jpg",
  "DSC01873.jpg",
  "DSC01893.jpg",
  "DSC01901.jpg",
  "DSC01932.jpg",
  "DSC01939.jpg",
  "DSC01972.jpg",
  "DSC01992.jpg",
  "DSC02001.jpg",
  "DSC02023.jpg",
  "DSC02031.jpg",
  "DSC02041.jpg",
  "DSC02072.jpg",
  "DSC02096.jpg",
  "DSC02128.jpg",
  "DSC02162.jpg",
  "DSC02172.jpg",
  "DSC02175.jpg",
  "DSC02190.jpg",
  "DSC02203.jpg",
  "DSC02219.jpg",
  "DSC02231.jpg",
  "DSC02265.jpg",
  "DSC02406.jpg",
  "DSC02428.jpg",
  "DSC02430.jpg",
  "DSC02496.jpg",
  "DSC02546.jpg"
] as const;

const weddingHighlightSet = new Set<string>(WEDDING_HIGHLIGHTS);
const orderedWeddingFiles = [
  ...WEDDING_HIGHLIGHTS,
  ...WEDDING_GALLERY_SEQUENCE.filter((file) => !weddingHighlightSet.has(file))
];
const weddingGalleryRank = new Map(
  orderedWeddingFiles.map((file, index) => [file.toLowerCase(), index])
);

function normalizedWeddingFilename(value?: string) {
  const filename = value?.split("?")[0].split("/").at(-1);
  return filename?.match(/DSC\d+\.jpg/i)?.[0].toLowerCase();
}

function rankForWeddingPhoto(value?: string) {
  const filename = normalizedWeddingFilename(value);
  return filename ? weddingGalleryRank.get(filename) ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
}

export function reorderWeddingGallery<T>(
  items: T[],
  categoryOf: (item: T) => string | undefined,
  filenameOf: (item: T) => string | undefined
) {
  const weddings = items
    .filter((item) => categoryOf(item) === "Śluby")
    .sort((a, b) => rankForWeddingPhoto(filenameOf(a)) - rankForWeddingPhoto(filenameOf(b)));

  let weddingIndex = 0;
  return items.map((item) =>
    categoryOf(item) === "Śluby" ? weddings[weddingIndex++] : item
  );
}
