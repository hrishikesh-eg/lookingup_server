/**
 * PRODUCT DETAILS
 * ---------------------------------------------------------
 * Independent data file for the product detail page. Not linked to
 * site.ts on purpose — each entry here is self-contained: whatever
 * you put here is exactly what shows on that product's page.
 *
 * `id` must match the product's `id` in site.ts (that's how the
 * click on a product box knows which detail entry to open).
 *
 * Images: place files in src/assets/products/ and import them at
 * the top of this file, then reference below. Leave undefined to
 * show a placeholder.
 */

import stb from "../assets/productimages/stb.png"
import emco from "../assets/productimages/emco.png"
import captech from "../assets/productimages/captech.jpg"
import asv from "../assets/productimages/asv.jpg"
import amed from "../assets/productimages/amed.jpg"
import vm from "../assets/productimages/vm.jpg"
import alp from "../assets/productimages/alp.jpg"
import shrd from "../assets/productimages/shrd.jpg"
import cap from "../assets/productimages/cap.jpg"
import pol from "../assets/productimages/pol.jpg"
import arti from "../assets/productimages/arti.jpg"
import rair from "../assets/productimages/rair.jpg"
import pci from "../assets/productimages/pci.jpg"
import sh from "../assets/productimages/sh.jpg"
import shreeji from "../assets/productimages/shreeji.jpg"
import rj from "../assets/productimages/rj.jpg"
import innix from "../assets/productimages/innix.jpg"
import ved from "../assets/productimages/ved.jpg"
import pal from "../assets/productimages/pal.jpg"
import jnd from "../assets/productimages/jnd.jpg"
import jbs from "../assets/productimages/jbs.jpg"
import joy from "../assets/productimages/joy.jpg"
import nd from "../assets/productimages/nd.jpg"
import capfill from "../assets/productimages/capfill.jpg"
export interface ProductDetail {
  id: string;
  companyName: string;
  companyEmail: string,
  productName: string;
  image?: string;
  imageType?: "product" | "magazine";
  description: string;
}

export const productDetails: ProductDetail[] = [
  {
    id: "stability-chamber",
    companyName: "Erfolgganar Pvt. Ltd.",
    companyEmail: "sales@erfolgganar.com",
    productName: "Stability Test Chamber",
    image:stb,
    description:
      "Controlled temperature & humidity chamber built for pharmaceutical stability studies, compliant with ICH guidelines. Precision-engineered for consistent results across long-duration test cycles.",
  },
  {
    id: "walk-in-chamber",
    companyName: "Erfolgganar Pvt. Ltd.",
    companyEmail: "sales@erfolgganar.com",
    productName: "Walk-In Stability Chamber",
    image:stb,
    description:
      "Large-capacity walk-in chamber for bulk sample storage with continuous environmental monitoring, built for high-volume pharmaceutical and industrial QC operations.",
  },
  {
    id: "gear-coupling-emco",
    companyName: "Emco Engineering Pvt. Ltd",
    companyEmail: "info@airjetmaill.com",
    productName: "Export-Grade Crating",
    image:emco,
    imageType: "magazine",
    description: "ISPM-15 compliant wooden crating engineered for heavy machinery shipments.",
  },
  {
  id: "auto-capsule-filling-captech",
  companyName: "Captech Systems",
  companyEmail: "info@captech.in",
  image:captech,
  imageType: "magazine",
  productName: "Automatic Capsule Filling Machine",
  description: "Captech's fully automated capsule filling line handles powder, pellets, granules, and tablets — individually or in combination (powder+pellets, pellets+tablets, etc.) — built for consistent, high-volume pharmaceutical manufacturing.",
},
  {
  id: "silicone-tubes-asv",
  companyName: "Asv Pharma Corporate Pvt. Ltd",
  companyEmail :"asvsalescorporation@gmail.com",
  image:asv,
  imageType: "magazine",
  productName: "Platinum Cured Silicone Tubes",
  description: "High-purity platinum-cured silicone tubing engineered for pharmaceutical fluid transfer, offering excellent chemical resistance, flexibility, and compliance with pharma-grade material standards.",
},
  {
  id: "modular-ot-almed",
  companyName: "Almed Equipments",
  companyEmail: "almedequip@gmail.com",
  image:amed,
  imageType: "magazine",
  productName: "Modular Operation Theatre",
  description: "Complete modular OT installation using EPOXY, PPGI, SS, or HPL PUF panels, integrated with Almed's patented Ductless Air Handling Unit for Class II cleanroom air quality compliant with NABH norms.",
},
  {
  id: "cap-tab-150-vms",
  companyName: "V. M Services",
  companyEmail:"vmservices2003@yahoo.com",
  image:vm,
  imageType: "magazine",
  productName: "CAP-TAB-150 Blister Packing Machine",
  description: "Single-track blister packing machine designed for pharmaceutical capsule and tablet packaging, known for accurate dimensions, easy installation, and rigid, long-lasting construction.",
},
  {
  id: "rapid-mixer-granulator-alpro",
  companyName: "Alpro Equipment & Technologies",
  companyEmail: "info@alproequipment.com",
  image:alp,
  imageType: "magazine",
  productName: "Rapid Mixer Granulator",
  description: "ISO 9001 and GMP-compliant rapid mixer granulator for precision mixing and wet granulation in pharmaceutical manufacturing, built to CE-certified engineering standards.",
},
  {
  id: "punches-dies-shraddha",
  companyName: "Shraddha Industries",
  companyEmail:"vishesh@shraddha-industries.com",
  image:shrd,
  imageType: "magazine",
  productName: "Tablet Compression Tooling - Punches & Dies",
  description: "Precision-engineered punches and dies for rotary tablet compression machines, built for consistent tablet quality and long tooling life across pharmaceutical production runs.",
},
  {
  id: "octagonal-blender-cappro",
  companyName: "Cappro Equipment",
  companyEmail: "capproequipement@hotmail.com",
  image:cap,
  imageType: "magazine",
  productName: "Octagonal Blender",
  description: "Cappro's octagonal blender is engineered for uniform, gentle mixing of powders and granules with minimal segregation, suited for pharmaceutical, chemical, cosmetic, and food industry batch processing.",
},
{
  id: "hanfure-tubing-polyanh",
  companyName: "Polyanh Polymers and Industries Pvt. Ltd",
  companyEmail:"sales.polyanh@gmail.com",
  image:pol,
  imageType: "magazine",
  productName: "Hanfure Silicone Tubing",
  description: "High-quality platinum-cured silicone tubing with an extra-smooth inner bore, suitable for fluid transfer in pharma and biotech industries. Made from food-grade material and designed for peristaltic pump applications.",
},

{
  id: "vertical-autoclave-arti",
  companyName: "Arti Surgicals",
  companyEmail: "artisurgicals@gmail.com",
  image:arti,
  imageType: "magazine",
  productName: "Vertical Autoclave",
  description: "Premium stainless steel vertical autoclave manufactured in Mumbai, available in portable, laboratory, and hospital models, built for reliable steam sterilization in healthcare and lab settings.",
},
{
  id: "static-pass-box-rair",
  companyName: "R Air Clean Pharma Equipment",
  companyEmail:"raircleanp@gmail.com",
  image:rair,
  imageType: "magazine",
  productName: "Static Pass Box",
  description: "Static pass box designed to safely transfer materials between cleanrooms or between a cleanroom and a non-classified area, minimizing contamination risk while maintaining pressure differential control.",
},
{
  id: "hydrogen-gas-generator-pci",
  companyName: "Pci Analytics Pvt. Ltd",
  companyEmail: "info@pcianalytics.in",
  image:pci,
  imageType: "magazine",
  productName: "Hydrogen Gas Generator",
  description: "PGH Series Hydrogen Generator uses advanced electrolytic membrane technology to produce pure hydrogen for GC-FID and TCD applications, requiring only distilled water for trouble-free long-term operation.",
},
{
  id: "high-shear-emulsifier-shashvath",
  companyName: "Shashvath Fabrication and Engineers",
  companyEmail:"shashvathfabandengg@gmail.com",
  image:sh,
  imageType: "magazine",
  productName: "High Shear Emulsifier & Inline Homogenizer",
  description: "High shear emulsifier and inline homogenizer engineered for consistent, fine-particle mixing in pharmaceutical ointments, cosmetic creams, and gel manufacturing processes.",
},
{
  id: "vial-inspection-shreeji",
  companyName: "Shreeji Pharmatech",
  companyEmail: "mitesh@shreejiphrmatech.com",
  image:shreeji,
  imageType: "magazine",
  productName: "Fully Automatic Camera-Based Vial Inspection Machine",
  description: "First of its kind in India — a fully automatic, camera-based vial inspection machine that inspects vials and automatically rejects defective units per programmed criteria, reflecting Shreeji Pharmatech's focus on precision and innovation.",
},
{
  id: "hepa-filter-clamp-rjpal",
  companyName: "R. J Pal Steel",
  companyEmail:"rjpalsteel@gmail.com",
  image:rj,
  imageType: "magazine",
  productName: "SS HEPA Filter Clamp",
  description: "Stainless steel 304 HEPA filter clamp built for secure, corrosion-resistant mounting of HEPA filters in cleanroom, pharma, and pass box installations.",
},
{
  id: "turnkey-cleanroom-innixi",
  companyName: "Innixi Solutions",
  companyEmail: "sales@innixisolutions.com",
  image:innix,
  imageType: "magazine",
  productName: "Turnkey Clean Room Solutions",
  description: "Complete cleanroom project execution from design and construction through validation and commissioning, tailored for pharmaceutical, biotech, and precision engineering facilities.",
},
{
  id: "alu-alu-format-parts-ved",
  companyName: "Ved Enterprise",
  companyEmail:"info@vedentp.com",
  image:ved,
  imageType: "magazine",
  productName: "Alu-Alu Blister Format Change Parts",
  description: "Precision-engineered Alu-Alu format change parts for blister packing machines, designed for accurate dimensions and smooth changeovers across a wide range of blister machine models.",
},
{
  id: "rapid-mixer-granulator-pal",
  companyName: "Paal Pharma Machinery",
  companyEmail: "sales@palpharmamachinery.com",
  image:pal,
  imageType: "magazine",
  productName: "Rapid Mixer Granulator",
  description: "High-shear rapid mixer granulator built for efficient, consistent wet granulation of pharmaceutical powders, part of Pal Pharma Machinery's tablet section equipment range.",
},
{
  id: "wfi-distribution-jnd",
  companyName: "JND Engineering Services",
  companyEmail:"jndengineering.nirav@gmail.com",
  image:jnd,
  imageType: "magazine",
  productName: "WFI Distribution Loop System",
  description: "GMP-compliant stainless steel Water for Injection (WFI) distribution loop system, including storage vessel, distribution pump, and piping, engineered for reliable pharmaceutical-grade water delivery.",
},
{
  id: "round-shape-toolings-jayshree",
  companyName: "Jayshree Tablet Compression Toolings",
  companyEmail: "jayshreetabletting@gmail.com",
  image:jbs,
  imageType: "magazine",
  productName: "Round Shape Tablet Toolings",
  description: "High-precision round shape dies and punches engineered for consistent weight, thickness, and hardness across continuous tablet production runs, built for minimal wear and long tool life.",
},
{
  id: "lab-fume-hood-joyous",
  companyName: "Joyous Inc",
  companyEmail: "inquiry@joyousinc.im",
  image:joy,
  imageType: "magazine",
  productName: "Lab Fume Hood",
  description: "Modular lab fume hood designed for reliable fume extraction and containment, part of Joyous Inc's complete range of laboratory furniture and turnkey lab setup solutions.",
},
{
  id: "ceramic-pump-navdurga",
  companyName: "Nav Durga Engineers",
  companyEmail:"info@ndengineers.com",
  image:nd,
  imageType: "magazine",
  productName: "Pharmaceutical Ceramic Pump for Sterile Aseptic Filling",
  description: "Ceramic pump built for sterile aseptic filling, operating on a valve-less rotary filling principle for precise, contamination-free dosing of pharmaceutical liquids.",
},
{
  id: "loading-rings-capfill",
  companyName: "Capfill Technologies",
  companyEmail: "capfill.tech@gmail.com",
  image:capfill,
  imageType: "magazine",
  productName: "Loading Rings & Pin Plates",
  description: "Precision-manufactured loading rings and pin plates for semi-automatic capsule filling machines, built for consistent capsule orientation and reliable long-term performance.",
},
];