import AboutHero from "@/components/aboutHero";
import AboutStory from "@/components/aboutStory";
// import AboutValues from "@/components/aboutValues";
// import AboutTimeline from "@/components/aboutTimeline";
import AboutPresence from "@/components/aboutPresence";
import AboutCta from "@/components/aboutCTA";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      {/* <AboutValues />
      <AboutTimeline /> */}
      <AboutPresence />
      <AboutCta />
    </>
  );
}