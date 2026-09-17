import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Gallery } from "@/components/home/Gallery";
import { Showcase } from "@/components/home/Showcase";
import { Benefits } from "@/components/home/Benefits";
import { SpecLive } from "@/components/home/SpecLive";
import { Production } from "@/components/home/Production";
import { Why } from "@/components/home/Why";
import { BuiltFor } from "@/components/home/BuiltFor";
import { EarlyAccess } from "@/components/home/EarlyAccess";
import { Footer } from "@/components/home/Footer";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Gallery />
        <Showcase />
        <Benefits />
        <SpecLive />
        <Production />
        <Why />
        <BuiltFor />
        <div data-nav-theme="light">
          <Faq />
        </div>
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
