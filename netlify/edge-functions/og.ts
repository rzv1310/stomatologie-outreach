import type { Context } from "https://edge.netlify.com";

const BASE_DOMAIN = "seo-doctor.ro";

interface Clinic {
  n: string;
  ci: string;
  co: string;
}

const clinics = new Map<string, Clinic>([
  ["munteanu-alexei", { n: "CABINET DENTAR MUNTEANU ALEXEI SRL", ci: "Galați", co: "Galați" }],
  ["digitalsmiledesign", { n: "DIGITALSMILEDESIGN SRL", ci: "Bacău", co: "Bacău" }],
  ["andrei-alexandru-pirvuica", { n: "DR. ANDREI ALEXANDRU PIRVUICA SRL", ci: "Filiași", co: "Dolj" }],
  ["lucdental", { n: "LUCDENTAL SRL", ci: "Oradea", co: "Bihor" }],
  ["batar-svetlana", { n: "CABINET DENTAR BATAR SVETLANA SRL", ci: "Galați", co: "Galați" }],
  ["3dental", { n: "3DENTAL SRL", ci: "Timișoara", co: "Timiș" }],
  ["prime-dental-center", { n: "PRIME DENTAL CENTER SRL", ci: "Sectorul 2", co: "Municipiul București" }],
  ["rotaras-dent", { n: "ROTARAS DENT SRL", ci: "Bârlad", co: "Vaslui" }],
  ["aadento-group", { n: "AADENTO GROUP SRL", ci: "Voluntari", co: "Ilfov" }],
  ["smileline-ortho", { n: "SMILELINE ORTHO SRL", ci: "Sibiu", co: "Sibiu" }],
  ["asire", { n: "ASIRE SRL", ci: "Timișoara", co: "Timiș" }],
  ["chc-dental-clinic", { n: "CHC DENTAL CLINIC BY DR. CORINA CHIRIAC SRL", ci: "Valea Râmnicului", co: "Buzău" }],
  ["meetdent", { n: "MEETDENT SRL", ci: "Craiova", co: "Dolj" }],
  ["endodent-clinic-pitila", { n: "ENDODENT CLINIC PITILA SRL", ci: "Sectorul 3", co: "Municipiul București" }],
  ["cora-dental", { n: "CORA DENTAL SRL", ci: "Satu Mare", co: "Satu Mare" }],
  ["orthodent-tm", { n: "ORTHODENT TM SRL", ci: "Hunedoara", co: "Hunedoara" }],
  ["boca-dental-clinics", { n: "BOCA DENTAL CLINICS SRL", ci: "Suceava", co: "Suceava" }],
  ["iosif-dent", { n: "IOSIF DENT SRL", ci: "Tunari", co: "Ilfov" }],
  ["brident-clinic", { n: "BRIDENT CLINIC SRL", ci: "Dobroești", co: "Ilfov" }],
  ["one-dental", { n: "ONE DENTAL SRL", ci: "Craiova", co: "Dolj" }],
  ["tame", { n: "TAME SRL", ci: "Brașov", co: "Brașov" }],
  ["angelica-florentina", { n: "DR. ANGELICA -FLORENTINA SRL", ci: "Roșiori de Vede", co: "Teleorman" }],
  ["mitis", { n: "MITIS SRL", ci: "Zetea", co: "Harghita" }],
  ["mariana-berbec", { n: "DR.MARIANA BERBEC SRL", ci: "Sectorul 3", co: "Municipiul București" }],
  ["timus-dental-clinic", { n: "TIMUS DENTAL CLINIC SRL", ci: "Brașov", co: "Brașov" }],
  ["happy-tooth", { n: "HAPPY TOOTH SRL", ci: "Șelimbăr", co: "Sibiu" }],
  ["dental-code", { n: "DENTAL CODE SRL", ci: "Sectorul 1", co: "Municipiul București" }],
  ["ajia-dent", { n: "AJIA DENT SRL", ci: "Tismana", co: "Gorj" }],
  ["ana-martin-dental", { n: "ANA MARTIN DENTAL SRL", ci: "Constanța", co: "Constanța" }],
  ["axissmile", { n: "AXISSMILE SRL", ci: "Bistrița", co: "Bistrița-Năsăud" }],
  ["team-implant", { n: "TEAM IMPLANT SRL", ci: "Sectorul 2", co: "Municipiul București" }],
  ["access-smile", { n: "ACCESS SMILE SRL", ci: "Sectorul 1", co: "Municipiul București" }],
  ["nobelledent-solutions", { n: "NOBELLEDENT SOLUTIONS SRL", ci: "Topoloveni", co: "Argeș" }],
  ["dental-by-dr-ligia", { n: "DENTAL BY DR. LIGIA SRL", ci: "Bârsa", co: "Arad" }],
  ["dentivia", { n: "DENTIVIA SRL", ci: "Tunari", co: "Ilfov" }],
  ["ar-smile-dental", { n: "AR SMILE DENTAL SRL", ci: "Frâncești, Peștișani", co: "Gorj" }],
  ["teeth-ub", { n: "TEETH UB SRL", ci: "Caransebeș", co: "Caraș-Severin" }],
  ["sairident", { n: "SAIRIDENT SRL", ci: "Suceava", co: "Suceava" }],
  ["simsmile", { n: "SIMSMILE SRL", ci: "Dăbuleni", co: "Dolj" }],
  ["sorridente", { n: "SORRIDENTE SRL", ci: "Sectorul 1", co: "Municipiul București" }],
  ["ag-perfect-smile", { n: "AG PERFECT SMILE SRL", ci: "Craiova", co: "Dolj" }],
  ["batar-ina", { n: "CABINET DENTAR BATAR INA SRL", ci: "Galați", co: "Galați" }],
  ["biomimetic-dent", { n: "BIOMIMETIC DENT SRL", ci: "Sectorul 6", co: "Municipiul București" }],
  ["manova-smile", { n: "MANOVA SMILE SRL", ci: "Craiova", co: "Dolj" }],
  ["calista-dent", { n: "CALISTA DENT SRL", ci: "Târgu Mureș", co: "Mureș" }],
  ["nova-dental-clinic", { n: "NOVA DENTAL CLINIC SRL", ci: "Ploiești", co: "Prahova" }],
  ["phident-concept", { n: "PHIDENT CONCEPT SRL", ci: "Oradea", co: "Bihor" }],
  ["matei-filip-dent", { n: "MATEI FILIP DENT SRL", ci: "Sectorul 1", co: "Municipiul București" }],
  ["ac-endo-dent", { n: "A&C ENDO DENT SRL", ci: "Hirișești", co: "Gorj" }],
  ["tag-dent", { n: "TAG DENT SRL", ci: "Râmnicu Vâlcea", co: "Vâlcea" }],
  ["siganur", { n: "SIGANUR SRL", ci: "Galați", co: "Galați" }],
  ["amd-dent", { n: "AMD DENT SRL", ci: "Domnești", co: "Ilfov" }],
  ["steora-smile", { n: "STEORA SMILE SRL", ci: "Moldoveni", co: "Ialomița" }],
  ["instadent", { n: "INSTADENT SRL", ci: "Hunedoara", co: "Hunedoara" }],
  ["tgf-professional", { n: "TGF PROFESSIONAL SRL", ci: "Cajvana", co: "Suceava" }],
  ["ap-dent", { n: "A.P. DENT SRL", ci: "Craiova", co: "Dolj" }],
  ["alex-dental", { n: "DR. ALEX DENTAL SRL", ci: "Brașov", co: "Brașov" }],
  ["ortofain", { n: "ORTOFAIN SRL", ci: "Craiova", co: "Dolj" }],
  ["cridenta-smile", { n: "CRIDENTA SMILE SRL", ci: "Săbăoani", co: "Neamț" }],
  ["dentalmed-ise", { n: "DENTALMED ISE SRL", ci: "Florești", co: "Cluj" }],
  ["endoray", { n: "ENDORAY SRL", ci: "Cârcea", co: "Dolj" }],
  ["caterina-stefania", { n: "DR. CATERINA-STEFANIA SRL", ci: "Craiova", co: "Dolj" }],
  ["shaping-smiles", { n: "SHAPING SMILES SRL", ci: "Craiova", co: "Dolj" }],
  ["smilence-dental-studio", { n: "SMILENCE DENTAL STUDIO SRL", ci: "Tunari", co: "Ilfov" }],
  ["nova-implant", { n: "NOVA IMPLANT SRL", ci: "Sectorul 2", co: "Municipiul București" }],
  ["dogarudent", { n: "DOGARUDENT SRL", ci: "Galați", co: "Galați" }],
  ["comdent-dental-clinic", { n: "COMDENT DENTAL CLINIC SRL", ci: "Bragadiru", co: "Ilfov" }],
  ["miscu-dds", { n: "MISCU DDS SRL", ci: "Cluj-Napoca", co: "Cluj" }],
  ["hatem-dental-clinic", { n: "HATEM DENTAL CLINIC SRL", ci: "Galați", co: "Galați" }],
  ["ag-dental", { n: "DR.AG DENTAL SRL", ci: "Constanța", co: "Constanța" }],
  ["epingeac-dental", { n: "EPINGEAC DENTAL SRL", ci: "Tunarii Vechi", co: "Dolj" }],
  ["di-dental-studio", { n: "D&I DENTAL STUDIO SRL", ci: "Constanța", co: "Constanța" }],
  ["natdent", { n: "NATDENT SRL", ci: "Cluj-Napoca", co: "Cluj" }],
  ["ilumina-dent", { n: "ILUMINA DENT SRL", ci: "Constanța", co: "Constanța" }],
  ["dentima-premium", { n: "DENTIMA PREMIUM SRL", ci: "Tulcea", co: "Tulcea" }],
  ["diameddent", { n: "DIAMEDDENT SRL", ci: "Prundu Bârgăului", co: "Bistrița-Năsăud" }],
  ["voxel-dent", { n: "VOXEL DENT SRL", ci: "Iași", co: "Iași" }],
  ["dental-dr-revenco", { n: "DENTAL DR.REVENCO SRL", ci: "Voluntari", co: "Ilfov" }],
  ["rapid-dent-implant", { n: "RAPID DENT IMPLANT SRL", ci: "Sectorul 5", co: "Municipiul București" }],
  ["medivin-clinic", { n: "MEDIVIN CLINIC SRL", ci: "Aghireș, Meseșenii de Jos", co: "Sălaj" }],
  ["daliana-stomadent", { n: "DALIANA STOMADENT SRL", ci: "Valea Borcutului", co: "Bistrița-Năsăud" }],
  ["essasmile", { n: "ESSASMILE SRL", ci: "Timișoara", co: "Timiș" }],
  ["rotaru-dentlab", { n: "ROTARU DENTLAB SRL", ci: "Galați", co: "Galați" }],
  ["popp-popp-dental", { n: "POPP & POPP DENTAL PROFESSIONALS SRL", ci: "Buzău", co: "Buzău" }],
  ["clinica-din-deal", { n: "CLINICA DIN DEAL SRL", ci: "Moisei", co: "Maramureș" }],
  ["evident-aesthetics-center", { n: "EVIDENT AESTHETICS CENTER SRL", ci: "Brașov", co: "Brașov" }],
  ["siro-dent-elite", { n: "SIRO DENT ELITE SRL", ci: "Sectorul 3", co: "Municipiul București" }],
  ["dent-target", { n: "DENT TARGET MVT SRL", ci: "Călărași", co: "Călărași" }],
  ["newray-eudent", { n: "NEWRAY EUDENT SRL", ci: "Sibiu", co: "Sibiu" }],
  ["primesmile", { n: "PRIMESMILE SRL", ci: "Craiova", co: "Dolj" }],
  ["simplyartdent", { n: "SIMPLYARTDENT SRL", ci: "Săldăbagiu de Munte, Paleu", co: "Bihor" }],
  ["cgm-dent", { n: "CGM DENT SRL", ci: "Capu Dealului, Brănești", co: "Gorj" }],
  ["mira-dental", { n: "MIRA DENTAL CARE SRL", ci: "Brăila", co: "Brăila" }],
  ["32-smile-center", { n: "32 SMILE CENTER SRL", ci: "Băiculești", co: "Argeș" }],
  ["perioexpert", { n: "PERIOEXPERT SRL", ci: "Sectorul 4", co: "Municipiul București" }],
  ["coltan-dent", { n: "COLTAN DENT SRL", ci: "Alimpești", co: "Gorj" }],
  ["odent-solutions", { n: "ODENT SOLUTIONS SRL", ci: "Valea Lupului", co: "Iași" }],
]);

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  // Skip asset requests
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|woff2?|ttf|map)$/)) {
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

  const clinic = clinics.get(subdomain);
  if (!clinic) {
    return context.next();
  }

  const response = await context.next();
  const html = await response.text();

  const title = `${clinic.n} | ${clinic.ci}`;
  const description = `Cabinet stomatologic în ${clinic.ci}, ${clinic.co}. Implantologie, ortodonție, estetică dentară și chirurgie orală. Programează o consultație.`;
  const ogImage = `${url.protocol}//${url.host}/og/${subdomain}.png`;

  const modifiedHtml = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImage}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ogImage}">`);

  return new Response(modifiedHtml, {
    status: response.status,
    headers: response.headers,
  });
};
