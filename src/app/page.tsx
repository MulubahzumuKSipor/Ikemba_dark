import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Identity from "@/components/identity";
import Leadership from "@/components/leadership";
import Philosophy from "@/components/philosophy";
import Services from "@/components/services";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Identity/>
      <Services />
      <Philosophy />
      <Leadership />
      <Contact />
    </>
  );
}
