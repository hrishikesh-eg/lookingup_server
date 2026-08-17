/**
 * SITE DATA
 * ---------------------------------------------------------
 * Central data for the customer directory, products, and past
 * exhibitions.
 *
 * New companies below have name/phone/email only for now —
 * category, description, logo, and products get filled in later.
 * The page handles missing fields gracefully in the meantime.
 *
 * Logos: place image files in src/assets/clients/ and import them at
 * the top of this file, then reference the import in `logo` below.
 * Leave `logo: undefined` to show an initials badge instead.
 */
import erfolg from "../assets/logos/logo.jpg"
import captech from "../assets/logos/captech.png"
export interface Product {
  id: string;
  name: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  logo?: string;
  category?: string;
  description?: string;
  joinedYear?: number;
  email?: string;
  phone?: string;
  products?: Product[];
}

export interface Exhibition {
  id: string;
  title: string;
  location: string;
  year: number;
  image?: string;
}

export const customers: Customer[] = [
  // --- Existing clients with full detail ---
  {
    id: "erfolgganar",
    name: "Erfolgganar Pvt. Ltd.",
    category: "Laboratory Equipment",
    description:
      "Manufacturer of precision environmental test chambers for pharmaceutical and industrial quality control.",
    joinedYear: 2021,
    email: "sales@erfolgganar.com",
    phone: "8928815858",
    logo:erfolg,
    products: [
      { id: "stability-chamber", name: "Stability Test Chamber", description: "Controlled temperature & humidity chamber built for pharmaceutical stability studies, compliant with ICH guidelines." },
      { id: "walk-in-chamber", name: "Walk-In Stability Chamber", description: "Large-capacity walk-in chamber for bulk sample storage with continuous environmental monitoring." },
    ],
  },
 

  // --- New clients: name/phone/email only, detail comes later ---
  {
  id: "emco-engineering",
  name: "Emco Engineering Pvt. Ltd",
  phone: "7738095999",
  email: "info@airjetmaill.com",
  category: "Mechanical Power Transmission",
  description: "Manufacturer, dealer, exporter and supplier of industrial chains, conveyor sprockets, gear couplings, universal joints, cardan shaft couplings, pulleys, and equipment fabrication, serving industries including marine, mining, steel, cement, power, pharma, and defense.",
  products: [
    { id: "gear-coupling-emco", name: "Gear Coupling", description: "Precision-engineered gear couplings for reliable mechanical power transmission across industrial applications." },
  ],
},
  {
  id: "captech-systems",
  name: "Captech Systems",
  phone: "9820062795 / 9820962795",
  email: "info@captech.in",
  category: "Pharmaceutical Machinery",
  description: "Founded in 1997, Captech Systems is a Mumbai-based manufacturer of fully automated, semi-automatic, and manual capsule filling machines, along with counting machines, dry powder filling lines, and rapid mixer granulators for the pharmaceutical industry.",
  joinedYear: 1997,
  logo:captech,
  products: [
    { id: "auto-capsule-filling-captech", name: "Automatic Capsule Filling Machine", description: "Fully automated capsule filling machine for powder, pellets, granules, and tablets — individually or in combination — for high-volume pharmaceutical production." },
  ],
},
  {
  id: "asv-pharma-corporate",
  name: "Asv Pharma Corporate Pvt. Ltd",
  phone: "8888133377",
  email: "asvsalescorporation@gmail.com",
  category: "Pharma Rubber & Machinery",
  description: "ISO 9001:2015 certified, with 30+ years of experience, ASV Pharma Tech manufactures and supplies silicone tubes, pharma machinery, pharma consumables, surgical & medical simulators, and freeze-dried fruits & vegetables, backed by dedicated R&D and USFDA DMF listing.",
  products: [
    { id: "silicone-tubes-asv", name: "Platinum Cured Silicone Tubes", description: "Precision-manufactured platinum-cured silicone tubing for pharmaceutical fluid transfer applications." },
  ],
},
  {
  id: "almed-equipments",
  name: "Almed Equipments",
  phone: "9322510636",
  email: "almedequip@gmail.com",
  category: "Healthcare Equipment",
  description: "ISO-certified manufacturer of Modular Operation Theatres, PSA Oxygen Generation Plants, and patented Ductless Laminar Air Flow systems for infection control.",
  products: [
    { id: "modular-ot-almed", name: "Modular Operation Theatre", description: "Complete modular OT installation with patented Ductless Air Handling Unit technology for infection control and cleanroom air quality." },
  ],
},
  {
  id: "vm-services",
  name: "V. M Services",
  phone: "9825413488",
  email: "vmservices2003@yahoo.com",
  category: "Pharma Packaging Machinery",
  description: "Ahmedabad-based manufacturer with 28+ years of experience, specializing in blister packing machines, Alu-Alu blister pack machines, de-blister machines, and change parts, exporting to 30+ countries.",
  joinedYear: 1997,
  products: [
    { id: "cap-tab-150-vms", name: "CAP-TAB-150 Blister Packing Machine", description: "Single-track blister packing machine for pharmaceutical capsule and tablet packaging, built for accuracy and reliable long-term performance." },
  ],
},
  { id: "varpar-furniture", name: "Varpar Furniture", phone: "8800960111", email: "info@varper.in" },
  {
  id: "alpro-equipment-technologies",
  name: "Alpro Equipment & Technologies",
  phone: "7276070511",
  email: "info@alproequipment.com",
  category: "Pharma & Cosmetic Machinery",
  description: "ISO 9001, GMP, and CE certified manufacturer with 20+ years of experience, producing pharmaceutical, cosmetic, and food processing machinery for 30+ countries.",
  products: [
    { id: "rapid-mixer-granulator-alpro", name: "Rapid Mixer Granulator", description: "High-precision granulation equipment for pharmaceutical mixing and wet granulation processes." },
  ],
},
  {
  id: "shraddha-industries",
  name: "Shraddha Industries",
  phone: "7698697092",
  email: "vishesh@shraddha-industries.com",
  category: "Tablet Compression Machinery",
  description: "Ahmedabad-based manufacturer with 20+ years of experience in tablet compression machinery, punches and dies, and tablet press spare parts for the pharmaceutical industry.",
  products: [
    { id: "punches-dies-shraddha", name: "Tablet Compression Tooling - Punches & Dies", description: "High-quality tablet compression tooling for precise, durable pharmaceutical tablet manufacturing." },
  ],
},
  {
  id: "cappro-equipment",
  name: "Cappro Equipment",
  phone: "7977181932",
  email: "capproequipement@hotmail.com",
  category: "Process Equipment Manufacturing",
  description: "Thane-based manufacturer of blenders, dryers, mixers, mills, and SS process equipment for the pharma, chemical, cosmetic, and food & beverage industries.",
  products: [
    { id: "octagonal-blender-cappro", name: "Octagonal Blender", description: "Process blending equipment for uniform mixing of powders and granules in pharmaceutical and chemical manufacturing." },
  ],
},
  {
  id: "polyanh-polymers",
  name: "Polyanh Polymers and Industries Pvt. Ltd",
  phone: "8983525827",
  email: "sales.polyanh@gmail.com",
  category: "Silicone & Rubber Components",
  description: "ISO 9001:2015 certified, Startup India recognized manufacturer of silicone tubing, hoses, and gaskets for pharma, medical, dairy, and engineering applications.",
  products: [
    { id: "hanfure-tubing-polyanh", name: "Hanfure Silicone Tubing", description: "Platinum-cured silicone tubing with smooth bore finish for fluid transfer in pharma and biotech applications, made from food-grade material." },
  ],
},
  { id: "ultrafil-air-system", name: "Ultrafil Air System (I) Pvt. Ltd", phone: "9177631526", email: "sales@ultrafil.net" },
  { id: "akshar-engineers", name: "Akshar Engineers", phone: "8511103192", email: "aksharengineers16616@yahoo.com" },
  {
  id: "arti-surgicals",
  name: "Arti Surgicals",
  phone: "9768308758",
  email: "artisurgicals@gmail.com",
  category: "Sterilization Equipment",
  description: "Mumbai-based, ISO certified manufacturer of autoclaves, ETO sterilizers, and CSSD equipment since 1984, trusted by 1000+ hospitals and labs across India.",
  joinedYear: 1984,
  products: [
    { id: "vertical-autoclave-arti", name: "Vertical Autoclave", description: "Stainless steel vertical autoclave for hospital, laboratory, and clinic sterilization, available in portable, laboratory, and hospital models." },
  ],
},
  {
  id: "r-air-clean-pharma",
  name: "R Air Clean Pharma Equipment",
  phone: "7768886667",
  email: "raircleanp@gmail.com",
  category: "Cleanroom Equipment",
  description: "Manufacturer of cleanroom equipment including static and dynamic pass boxes, laminar air flow units, bio safety cabinets, air showers, and garment cabinets for pharmaceutical facilities.",
  products: [
    { id: "static-pass-box-rair", name: "Static Pass Box", description: "Cleanroom pass box for transferring materials between controlled environments while maintaining contamination control." },
  ],
},
  {
  id: "pci-analytics",
  name: "Pci Analytics Pvt. Ltd",
  phone: "9323700351",
  email: "info@pcianalytics.in",
  category: "Laboratory Gas Equipment",
  description: "Thane-based supplier of ultra-high-purity gas generators, gas equipment, analytical instruments, and chromatography consumables for laboratories, partnering with global brands like Cosmosil and Eldex.",
  products: [
    { id: "hydrogen-gas-generator-pci", name: "Hydrogen Gas Generator", description: "Advanced electrolytic membrane technology generator producing pure hydrogen for GC-FID and TCD applications." },
  ],
},
  {
  id: "shashvath-fabrication",
  name: "Shashvath Fabrication and Engineers",
  phone: "8888511188",
  email: "shashvathfabandengg@gmail.com",
  category: "Pharma & Cosmetic Processing Machinery",
  description: "Vasai Virar-based manufacturer and exporter of tablet section machines, ointment section machines, high shear emulsifiers, and cosmetic processing equipment since 2014.",
  joinedYear: 2014,
  products: [
    { id: "high-shear-emulsifier-shashvath", name: "High Shear Emulsifier & Inline Homogenizer", description: "High-performance emulsification and homogenizing equipment for pharmaceutical, cosmetic, and cream/gel manufacturing." },
  ],
},
  {
  id: "shreeji-pharmatech",
  name: "Shreeji Pharmatech",
  phone: "7940084414",
  email: "mitesh@shreejiphrmatech.com",
  category: "Pharma Packaging Machinery",
  description: "Ahmedabad-based manufacturer established in 1999, specializing in dry powder filling lines, liquid filling machines, cap sealing, vial inspection, and labeling machinery, trusted by names like Cipla and Cadila.",
  joinedYear: 1999,
  products: [
    { id: "vial-inspection-shreeji", name: "Fully Automatic Camera-Based Vial Inspection Machine", description: "India's first fully automatic, camera-based vial inspection machine that inspects and auto-rejects vials as programmed." },
  ],
},
  {
  id: "rj-pal-steel",
  name: "R. J Pal Steel",
  phone: "9867730282",
  email: "rjpalsteel@gmail.com",
  category: "Cleanroom & Refrigeration Spare Parts",
  description: "Vasai-based manufacturer of stainless steel hinges, door pull handles, HEPA filter clamps, and spare parts for cleanroom equipment, pass boxes, and refrigeration units.",
  products: [
    { id: "hepa-filter-clamp-rjpal", name: "SS HEPA Filter Clamp", description: "Stainless steel clamp for securely mounting HEPA filters in cleanroom and pharmaceutical facility installations." },
  ],
},
  {
  id: "innixi-solutions",
  name: "Innixi Solutions",
  phone: "8149928214",
  email: "sales@innixisolutions.com",
  category: "HVAC & Cleanroom Solutions",
  description: "Established in 2020, Innixi Solutions delivers turnkey cleanroom construction, HVAC systems, BMS/EMS architecture, and validation & commissioning services for pharmaceutical, biotech, and industrial sectors.",
  joinedYear: 2020,
  products: [
    { id: "turnkey-cleanroom-innixi", name: "Turnkey Clean Room Solutions", description: "End-to-end cleanroom design, construction, and validation for pharmaceutical and biotech manufacturing environments." },
  ],
},
  { id: "indo-climatecare", name: "Indo Climatecare Pvt. Ltd", phone: "8830561339", email: "info@indoclimatecare.com" },
  { id: "shree-rani-pharma", name: "Shree Rani Pharma", email: "info@shreeranipharma.com" },
  {
  id: "ved-enterprise",
  name: "Ved Enterprise",
  phone: "9662897009",
  email: "info@vedentp.com",
  category: "Pharma Machinery Spare Parts",
  description: "Ahmedabad-based, globally trusted since 1998, manufacturer of blister packing format change parts, and replacement spares for cartoning, tablet compression, capsule filling, and strip packing machines.",
  joinedYear: 1998,
  products: [
    { id: "alu-alu-format-parts-ved", name: "Alu-Alu Blister Format Change Parts", description: "Precision-engineered format change parts for Alu-Alu blister packing machines, built for accurate fit and reliable long-term performance." },
  ],
},
  {
  id: "paal-pharma-machinery",
  name: "Paal Pharma Machinery Pvt. Ltd",
  phone: "9175608018",
  email: "sales@palpharmamachinery.com",
  category: "Pharma & Cosmetic Machinery",
  description: "Vasai-based manufacturer with 10+ years of experience, producing tablet section, liquid section, and cosmetic processing machinery for pharmaceutical and chemical companies, trusted by names like Lupin and Dr. Reddy's.",
  products: [
    { id: "rapid-mixer-granulator-pal", name: "Rapid Mixer Granulator", description: "High-shear mixing and granulation equipment for consistent wet granulation in pharmaceutical tablet manufacturing." },
  ],
},
 {
  id: "jnd-engineering-services",
  name: "JND Engineering Services",
  phone: "9879610096",
  email: "jndengineering.nirav@gmail.com",
  category: "Pharmaceutical Water Systems",
  description: "GMP certified, ISO 9001:2015 manufacturer of WFI and Purified Water distribution loop systems, water distillation and generation plants, and pharmaceutical injection plants based in Ahmedabad.",
  products: [
    { id: "wfi-distribution-jnd", name: "WFI Distribution Loop System", description: "Stainless steel Water for Injection distribution loop system with storage vessel, distribution pump, and piping for pharmaceutical manufacturing." },
  ],
},
  {
  id: "jayshree-tablet-compression",
  name: "Jayshree Tablet Compression Toolings",
  phone: "9824062192",
  email: "jayshreetabletting@gmail.com",
  category: "Tablet Compression Tooling",
  description: "Ahmedabad-based, GMP/TSM/European System compliant manufacturer since 1992, specializing in tablet punching machines, dies and punches, and custom tooling for pharmaceutical, nutraceutical, and confectionery tablet production.",
  joinedYear: 1992,
  products: [
    { id: "round-shape-toolings-jayshree", name: "Round Shape Tablet Toolings", description: "Precision-engineered round shape dies and punches for standard tablet compression across pharmaceutical and nutraceutical applications." },
  ],
},
  {
  id: "joyous-inc",
  name: "Joyous Inc",
  phone: "8156058977",
  email: "inquiry@joyousinc.im",
  category: "Laboratory Furniture",
  description: "Ahmedabad-based manufacturer of modular laboratory furniture, lab fume hoods, stainless steel furniture, and turnkey lab project solutions from design through installation.",
  products: [
    { id: "lab-fume-hood-joyous", name: "Lab Fume Hood", description: "Modular laboratory fume hood engineered for safe extraction and containment of hazardous fumes in lab environments." },
  ],
},
  {
  id: "nav-durga-engineers",
  name: "Nav Durga Engineers",
  phone: "9879089172",
  email: "info@ndengineers.com",
  category: "Pharma Filling Equipment",
  description: "Established in 2010, Navdurga Engineers manufactures and exports volumetric syringes, dosing pumps, and nozzles for bottle, vial, and ampoule filling across pharmaceutical, food, chemical, and cosmetic industries.",
  joinedYear: 2010,
  products: [
    { id: "ceramic-pump-navdurga", name: "Pharmaceutical Ceramic Pump for Sterile Aseptic Filling", description: "Valve-less rotary ceramic pump engineered for sterile aseptic filling of pharmaceutical liquids." },
  ],
},
  { id: "sanyoi-technology-india", name: "Sanyoi Technology India Pvt. Ltd", phone: "9594660771", email: "sales@sanyotechnologyindia.com" },
  {
  id: "capfill-technologies",
  name: "Capfill Technologies",
  phone: "7620506105",
  email: "capfill.tech@gmail.com",
  category: "Capsule Filling Machine Parts",
  description: "Vasai-based manufacturer established in 1996, specializing in loading rings, pin plates, tablet feeding attachments, and capsule polishing machines for semi-automatic capsule filling equipment.",
  joinedYear: 1996,
  products: [
    { id: "loading-rings-capfill", name: "Loading Rings & Pin Plates", description: "Precision loading rings and pin plates for semi-automatic capsule filling machines, engineered for accurate, reliable capsule handling." },
  ],
},
];

import nepal from "../assets/exhibitions/nepal.jpeg";
import pharamtech  from "../assets/exhibitions/pharmatech.png";
import pmec from "../assets/exhibitions/pmec.jpeg";
export const exhibitions: Exhibition[] = [
  { id: "expo-2026", title: "Nepal Pharma Expo", location: "Katmandu, Nepal", year: 2026,image:nepal },
  { id: "pmec", title: "Pmec Exhibition", location: "Greater Noida, India", year: 2025,image:pmec },
  { id: "pharmatech", title: "Pharmatech Expo & Tech Expo", location: "Bhartmandap Delhi, India", year: 2025 ,image:pharamtech},

];