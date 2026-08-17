import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExhibitionCarousel } from "@/components/ExhibitionCarousel";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Magazine } from "@/components/Magazine";
import { Clients } from "@/components/Clients";
import { Exhibitions } from "@/components/Exhibitions";
import { Contact } from "@/components/Contact";
import PromoBannerPage from "@/components/PromoBannerPage";
import ProductPage from "@/components/ProductPage";
import ScrollToTop from "./components/ScrollToTop";

function Home() {
  return (
    <>
      <Header />
      <ExhibitionCarousel />
      <main>
        <Hero />
        <About />
        <Magazine />
        <Clients />
        <Exhibitions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promo" element={<PromoBannerPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;