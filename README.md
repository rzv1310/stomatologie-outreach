# Stomatologie — Multi-Clinic Dental Website

Dynamic dental clinic website that serves 97 clinics from a single codebase using subdomain-based routing. Each clinic gets its own branded page with contact details, location map, and appointment info — all driven by a shared JSON data file.

## How It Works

The app detects which clinic to display based on the subdomain:

- **Production** — `xxx.seo-doctor.ro` where `xxx` is the clinic's subdomain key (e.g. `munteanu-alexei.seo-doctor.ro`)
- **Development** — `localhost:8080?subdomain=xxx` using a query parameter

Subdomain detection is handled in `src/lib/subdomain.ts`. If no valid subdomain is found (or the subdomain doesn't match any clinic), the site redirects.

## Getting Started

```sh
npm install
npm run dev
```

Open with a subdomain param to view a specific clinic:

```
http://localhost:8080?subdomain=munteanu-alexei
```

## Testing Different Clinics

| Subdomain             | Clinic                           | City   |
| --------------------- | -------------------------------- | ------ |
| `munteanu-alexei`     | Cabinet Dentar Munteanu Alexei   | Galați |
| `digitalsmiledesign`  | DigitalSmileDesign               | Bacău  |

Example dev URLs:

```
http://localhost:8080?subdomain=munteanu-alexei
http://localhost:8080?subdomain=digitalsmiledesign
```

## Adding or Editing Clinics

Clinic data lives in `data/contacts.json`. Each entry looks like:

```json
{
  "clinic_name": "CABINET DENTAR MUNTEANU ALEXEI SRL",
  "county": "Galați",
  "city": "Galați",
  "address": "Jud. Galați, Mun. Galați, Str. 1 Decembrie 1918, Nr.8, ...",
  "phone": "+40751106451",
  "administrator": "",
  "subdomain": "munteanu-alexei",
  "map": "https://www.google.com/maps/embed?pb=..."
}
```

After editing `data/contacts.json`, copy it to `src/data/contacts.json` so the app picks up the changes:

```sh
cp data/contacts.json src/data/contacts.json
```

## Production

In production, each clinic is accessed via its subdomain on `seo-doctor.ro`:

```
https://munteanu-alexei.seo-doctor.ro
https://digitalsmiledesign.seo-doctor.ro
```

DNS should be configured with a wildcard `*.seo-doctor.ro` record pointing to the hosting server. Unknown or missing subdomains trigger a redirect.

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool and dev server
- [React](https://react.dev/) — UI framework
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — component library



mail contact
