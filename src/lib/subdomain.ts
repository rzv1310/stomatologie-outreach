const BASE_DOMAIN = 'seo-doctor.ro';

export function getSubdomain(): string | null {
  const hostname = window.location.hostname;

  // Development: use ?subdomain= query parameter
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const params = new URLSearchParams(window.location.search);
    return params.get('subdomain');
  }

  // Production: extract subdomain from hostname
  if (hostname.endsWith('.' + BASE_DOMAIN)) {
    const subdomain = hostname.slice(0, -(BASE_DOMAIN.length + 1));
    return subdomain || null;
  }

  return null;
}
