import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { BuiltFor } from "@/components/sections/BuiltFor";
import { StatusQuo } from "@/components/sections/StatusQuo";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SpecLive } from "@/components/sections/SpecLive";
import { Verification } from "@/components/sections/Verification";
import { Production } from "@/components/sections/Production";
import { StudioBand } from "@/components/sections/StudioBand";
import { WhyKnitwright } from "@/components/sections/WhyKnitwright";
import { Protection, Reorder } from "@/components/sections/Protection";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

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
        <BuiltFor />
        <StatusQuo />
        <WhatWeDo />
        <HowItWorks />
        <SpecLive />
        <Verification />
        <Production />
        <StudioBand />
        <WhyKnitwright />
        <Protection />
        <Reorder />
        <EarlyAccess />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
