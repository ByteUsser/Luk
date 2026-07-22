export type LeadAttribution = {
  source: string;
  landingPath: string;
  pagePath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
};

export const LEAD_ATTRIBUTION_STORAGE_KEY = "janiczekfoto:first-visit";

const EMPTY_ATTRIBUTION: LeadAttribution = {
  source: "",
  landingPath: "",
  pagePath: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  referrer: ""
};

function readParam(params: URLSearchParams, name: string): string {
  return (params.get(name) ?? "").trim().slice(0, 160);
}

function getSafeReferrer(): string {
  if (!document.referrer) {
    return "";
  }

  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin ? "wewnętrzne" : referrer.hostname;
  } catch {
    return "";
  }
}

export function createCurrentAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;

  return {
    source: readParam(params, "source") || (pathname === "/" ? "strona-glowna" : pathname.slice(1)),
    landingPath: pathname,
    pagePath: pathname,
    utmSource: readParam(params, "utm_source"),
    utmMedium: readParam(params, "utm_medium"),
    utmCampaign: readParam(params, "utm_campaign"),
    utmContent: readParam(params, "utm_content"),
    utmTerm: readParam(params, "utm_term"),
    referrer: getSafeReferrer()
  };
}

export function rememberFirstVisit(): void {
  try {
    if (!window.sessionStorage.getItem(LEAD_ATTRIBUTION_STORAGE_KEY)) {
      window.sessionStorage.setItem(
        LEAD_ATTRIBUTION_STORAGE_KEY,
        JSON.stringify(createCurrentAttribution())
      );
    }
  } catch {
    // Formularz nadal działa, gdy przeglądarka blokuje sessionStorage.
  }
}

export function getLeadAttribution(): LeadAttribution {
  const current = createCurrentAttribution();
  let firstVisit = EMPTY_ATTRIBUTION;

  try {
    const stored = window.sessionStorage.getItem(LEAD_ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      firstVisit = { ...EMPTY_ATTRIBUTION, ...(JSON.parse(stored) as Partial<LeadAttribution>) };
    }
  } catch {
    // Bieżąca strona jest wystarczającym źródłem awaryjnym.
  }

  return {
    source: current.source,
    landingPath: firstVisit.landingPath || current.landingPath,
    pagePath: current.pagePath,
    utmSource: current.utmSource || firstVisit.utmSource,
    utmMedium: current.utmMedium || firstVisit.utmMedium,
    utmCampaign: current.utmCampaign || firstVisit.utmCampaign,
    utmContent: current.utmContent || firstVisit.utmContent,
    utmTerm: current.utmTerm || firstVisit.utmTerm,
    referrer: firstVisit.referrer || current.referrer
  };
}
