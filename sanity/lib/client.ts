import { createClient } from "@sanity/client";
import { isSanityConfigured, sanityApiVersion, sanityDataset, sanityProjectId } from "@/sanity/env";

export function getSanityClient() {
  if (!isSanityConfigured) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: true,
    perspective: "published"
  });
}
