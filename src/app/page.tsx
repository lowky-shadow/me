"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import UnifiedHero from "@/components/UnifiedHero";
import Chronicle from "@/components/sections/Chronicle";
import Operations from "@/components/sections/Operations";
import Arsenal from "@/components/sections/Arsenal";
import ContactShadow from "@/components/sections/ContactShadow";
import Footer from "@/components/sections/Footer";

const Snowfall = dynamic(() => import("@/components/Snowfall"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Snowfall />
      <Navbar />

      <main className="relative z-10">
        <UnifiedHero />
        <Chronicle />
        <Operations />
        <Arsenal />
        <ContactShadow />
        <Footer />
      </main>
    </>
  );
}
