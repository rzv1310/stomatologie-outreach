import { createContext, useContext, type ReactNode } from 'react';
import type { ClinicData } from '@/types/clinic';
import { getSubdomain } from '@/lib/subdomain';
import { lookupClinic, getAllSubdomains } from '@/lib/clinic-lookup';

const ClinicContext = createContext<ClinicData | null>(null);

export function ClinicProvider({ children }: { children: ReactNode }) {
  const subdomain = getSubdomain();
  const isDev = import.meta.env.DEV;

  if (!subdomain) {
    if (isDev) {
      const subdomains = getAllSubdomains();
      return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            No subdomain specified
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Add a <code>?subdomain=xxx</code> query parameter. Available subdomains:
          </p>
          <ul style={{ columns: 3, gap: '1rem' }}>
            {subdomains.map((s) => (
              <li key={s} style={{ marginBottom: '0.25rem' }}>
                <a
                  href={`?subdomain=${s}`}
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    window.location.href = 'https://seo-doctor.ro';
    return null;
  }

  const clinic = lookupClinic(subdomain);

  if (!clinic) {
    if (isDev) {
      const subdomains = getAllSubdomains();
      return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            Unknown subdomain: "{subdomain}"
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            That subdomain was not found in contacts.json. Available subdomains:
          </p>
          <ul style={{ columns: 3, gap: '1rem' }}>
            {subdomains.map((s) => (
              <li key={s} style={{ marginBottom: '0.25rem' }}>
                <a
                  href={`?subdomain=${s}`}
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    window.location.href = 'https://seo-doctor.ro';
    return null;
  }

  return (
    <ClinicContext.Provider value={clinic}>{children}</ClinicContext.Provider>
  );
}

export function useClinic(): ClinicData {
  const clinic = useContext(ClinicContext);
  if (!clinic) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return clinic;
}
