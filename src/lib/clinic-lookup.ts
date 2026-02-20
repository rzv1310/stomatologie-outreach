import contactsData from '@/data/contacts.json';
import type { ClinicContact, ClinicData } from '@/types/clinic';
import { formatPhoneForDisplay, formatPhoneForTel } from './phone';

const contacts = contactsData as ClinicContact[];

const clinicMap = new Map<string, ClinicContact>(
  contacts.map((c) => [c.subdomain, c]),
);

export function lookupClinic(subdomain: string): ClinicData | null {
  const contact = clinicMap.get(subdomain);
  if (!contact) return null;

  return {
    clinicName: contact.clinic_name,
    county: contact.county,
    city: contact.city,
    address: contact.address,
    phone: contact.phone,
    phoneFormatted: formatPhoneForDisplay(contact.phone),
    phoneTel: formatPhoneForTel(contact.phone),
    email: 'hello@email.ro',
    mapEmbedUrl: contact.map,
    subdomain: contact.subdomain,
  };
}

export function getAllSubdomains(): string[] {
  return contacts.map((c) => c.subdomain);
}
