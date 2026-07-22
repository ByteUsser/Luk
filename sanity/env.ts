// Project ID and dataset are public identifiers, not credentials. The environment
// variables allow staging overrides, while these defaults keep production deploys usable.
export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "ogu8s3po";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const sanityApiVersion = "2026-07-01";

export const isSanityConfigured = /^[a-z0-9-]+$/.test(sanityProjectId) && sanityProjectId.length >= 6;
