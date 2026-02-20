export interface ClinicContact {
  clinic_name: string;
  county: string;
  city: string;
  address: string;
  phone: string;
  administrator: string;
  subdomain: string;
  map: string;
}

export interface ClinicData {
  clinicName: string;
  county: string;
  city: string;
  address: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  email: string;
  mapEmbedUrl: string;
  subdomain: string;
}
