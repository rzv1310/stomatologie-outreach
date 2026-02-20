import type { Context } from "https://edge.netlify.com";
import contacts from "../../data/contacts.json" with { type: "json" };

const BASE_DOMAIN = "seo-doctor.ro";

interface ClinicContact {
  clinic_name: string;
  county: string;
  city: string;
  subdomain: string;
  phone: string;
  address: string;
  administrator: string;
  map: string;
}

const clinicMap = new Map<string, ClinicContact>(
  (contacts as ClinicContact[]).map((c) => [c.subdomain, c]),
);

function buildOgTags(clinic: ClinicContact, url: string) {
  const title = `${clinic.clinic_name} | ${clinic.city}`;
  const description = `Cabinet stomatologic în ${clinic.city}, ${clinic.county}. Implantologie, ortodonție, estetică dentară și chirurgie orală. Programează o consultație.`;
  const ogImage = `${url}og/${clinic.subdomain}.png`;

  return { title, description, ogImage };
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  // Only process HTML page requests, not assets
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/html")) {
    return context.next();
  }

  // Skip for asset paths
  if (url.pathname.match(/\.(js|css|png|jpg|svg|ico|json|woff2?|ttf)$/)) {
    return context.next();
  }

  // Extract subdomain
  let subdomain: string | null = null;

  if (hostname.endsWith("." + BASE_DOMAIN)) {
    subdomain = hostname.slice(0, -(BASE_DOMAIN.length + 1));
  }

  if (!subdomain) {
    return context.next();
  }

  const clinic = clinicMap.get(subdomain);
  if (!clinic) {
    return context.next();
  }

  // Get the original response
  const response = await context.next();
  const html = await response.text();

  const { title, description, ogImage } = buildOgTags(
    clinic,
    `${url.protocol}//${url.host}/`,
  );

  // Replace OG tags in HTML
  const modifiedHtml = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${title}">`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${title}">`,
    )
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${description}">`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${description}">`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${ogImage}">`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${ogImage}">`,
    );

  return new Response(modifiedHtml, {
    status: response.status,
    headers: response.headers,
  });
};

