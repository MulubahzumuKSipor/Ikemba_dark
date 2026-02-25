"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/servicesShowcase.module.css";

// --- INTERFACES ---
interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Project {
  title: string;
  location: string;
  image: string;
  stat: string;
  statLabel: string;
}

interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  process: ProcessStep[];
  features: Feature[];
  project: Project;
}

// --- 1. UNIFIED 8-STEP PROCESS ---
const eightStepProcess: ProcessStep[] = [
  { number: "01", title: "Initial Consultation", description: "We begin with a discovery call to understand project goals, land status, intended use, and investment parameters." },
  { number: "02", title: "Site Assessment", description: "Our team conducts a preliminary review of site conditions, access to infrastructure, and development feasibility." },
  { number: "03", title: "Budgeting & Feasibility", description: "We evaluate project scope, estimated costs, development timelines, and regulatory considerations to determine overall project viability." },
  { number: "04", title: "Scope Approval & Agreement", description: "Project scope, budget, and timelines are finalized and documented through a formal development or project management agreement." },
  { number: "05", title: "Design Coordination", description: "Architectural concepts and technical plans are developed in alignment with project objectives and approved budget." },
  { number: "06", title: "Pre-Construction Setup", description: "Permitting, contractor procurement, and scheduling are finalized ahead of project launch." },
  { number: "07", title: "Construction Oversight", description: "Ikemba manages on-site execution to ensure adherence to approved plans, timelines, and quality standards." },
  { number: "08", title: "Project Delivery", description: "Final inspections and handover are completed to ensure a smooth transition to ownership or operations." },
];

// --- 2. SERVICES DATA ---
const services: Service[] = [
  {
    id: "development",
    number: "01",
    title: "Real Estate Development",
    tagline: "Building Sustainable Projects",
    description: "From land acquisition to project completion, we develop high-quality, sustainable projects that drive economic growth across Africa.",
    longDescription: "Our development arm transforms underutilized land into thriving communities and commercial centers. We manage every aspect of the development lifecycle—site selection, feasibility analysis, financing, design coordination, and construction oversight—ensuring projects deliver lasting value to investors and communities alike.",
    image: "/construct.avif",
    process: eightStepProcess,
    features: [
      { icon: "◆", title: "Mixed-Use Developments", description: "Integrated residential, commercial, and retail spaces that create vibrant urban centers." },
      { icon: "■", title: "Residential Communities", description: "From luxury estates to affordable housing, designed for African families." },
      { icon: "●", title: "Commercial Projects", description: "Office complexes, retail centers, and industrial facilities built to international standards." },
      { icon: "◇", title: "Public-Private Partnerships", description: "Collaborative developments with government agencies for infrastructure and housing." },
    ],
    project: { title: "Atlantic View Residence", location: "Marshall, Liberia", image: "/avr.avif", stat: "Luxury", statLabel: "Oceanfront" },
  },
  {
    id: "architecture",
    number: "02",
    title: "Architecture & Design",
    tagline: "Shaping Africa's Urban Future",
    description: "Innovative, functional designs that honor African heritage while embracing contemporary innovation and sustainable practices.",
    longDescription: "Our design studio creates architecture that tells the story of modern Africa—bold, contextual, and built to last. We blend local materials and craftsmanship with cutting-edge technology, producing buildings that are environmentally responsible, culturally resonant, and functionally superior.",
    image: "/architect.avif",
    process: eightStepProcess,
    features: [
      { icon: "◆", title: "Concept & Schematic Design", description: "From initial vision to detailed plans that capture your architectural ambition." },
      { icon: "■", title: "3D Visualization & VR", description: "Photorealistic renderings and virtual walkthroughs before construction begins." },
      { icon: "●", title: "Sustainable Design", description: "Climate-responsive architecture optimized for African environments." },
      { icon: "◇", title: "Interior Architecture", description: "Complete interior design services from space planning to finishes selection." },
    ],
    project: { title: "SG Residence", location: "Monrovia, Liberia", image: "/images/projects/sg_residence.png", stat: "$2.5M", statLabel: "Value" },
  },
  {
    id: "consulting",
    number: "03",
    title: "Investment Consulting",
    tagline: "Data-Driven Advisory",
    description: "Expert advisory services helping investors and institutions make informed decisions in African real estate markets.",
    longDescription: "Our consulting practice bridges the information gap in African real estate. We provide institutional-grade market research, feasibility analysis, and strategic advisory to help clients navigate complex markets, structure deals, and manage risk. Whether you're entering a new market or optimizing an existing portfolio, we deliver the insights you need.",
    image: "/workers.avif",
    process: eightStepProcess,
    features: [
      { icon: "◆", title: "Market Analytics", description: "Proprietary data on pricing, absorption, and demographic trends across West Africa." },
      { icon: "■", title: "Feasibility Studies", description: "Rigorous financial analysis to validate project viability before capital commitment." },
      { icon: "●", title: "Property Valuation", description: "Institutionally-accepted appraisals for acquisitions, dispositions, and financing." },
      { icon: "◇", title: "Project Supervision", description: "Third-party oversight ensuring projects meet scope, schedule, and budget targets." },
    ],
    project: { title: "Ghana Insurance College", location: "Accra, Ghana", image: "/ghana_ins_campus.avif", stat: "61", statLabel: "Acres" },
  },
];

export default function ServicesShowcase() {
  const [activeService, setActiveService] = useState<Service>(services[0]);

  // --- 3. SCROLL & AUTOSCROLL LOGIC ---
  const processScrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  // Manual scroll function (for arrows)
  const scrollProcess = (direction: 'left' | 'right') => {
    if (processScrollRef.current) {
      const { scrollLeft, clientWidth } = processScrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      processScrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Autoscroll Effect
  useEffect(() => {
    if (isAutoScrollPaused) return;

    const autoScrollInterval = setInterval(() => {
      if (processScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = processScrollRef.current;

        // Check if we hit the end of the scroll container
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Rewind smoothly back to step 1
          processScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Slide to the next step
          scrollProcess('right');
        }
      }
    }, 4000); // 4 seconds per slide

    return () => clearInterval(autoScrollInterval);
  }, [isAutoScrollPaused, activeService]);

  return (
    <section className={styles.section}>
      {/* --- HERO SECTION --- */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroBg} style={{ backgroundImage: `url(/service.avif)` }} />

        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.label}>Our Services</span>
            <h1 className={styles.heroTitle}>
              End-to-End <span className={styles.accent}>Real Estate</span> Excellence
            </h1>
            <p className={styles.heroSubtitle}>
              From concept to completion, we deliver comprehensive solutions across
              development, design, and investment advisory.
            </p>
          </div>

          <div className={styles.pillars}>
            {services.map((service) => (
              <button
                key={service.id}
                className={`${styles.pillar} ${activeService.id === service.id ? styles.pillarActive : ""}`}
                onClick={() => {
                  setActiveService(service);
                  // Reset scroll position and pause state when switching tabs
                  setIsAutoScrollPaused(false);
                  if (processScrollRef.current) {
                    processScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
              >
                <span className={styles.pillarNumber}>{service.number}</span>
                <h3 className={styles.pillarTitle}>{service.title}</h3>
                <p className={styles.pillarTagline}>{service.tagline}</p>
                <div className={styles.pillarIndicator} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- SERVICE DETAIL --- */}
      <div className={styles.detail} key={activeService.id}>
        <div className={`container ${styles.detailContainer}`}>

          {/* Overview Section */}
          <div className={styles.overview}>
            <div className={styles.overviewContent}>
              <span className={styles.overviewNumber}>{activeService.number}</span>
              <h2 className={styles.overviewTitle}>{activeService.title}</h2>
              <p className={styles.overviewText}>{activeService.longDescription}</p>
            </div>
            <div className={styles.overviewImage}>
              <div className={styles.overviewImageInner} style={{ backgroundImage: `url(${activeService.image})` }} />
            </div>
          </div>

          {/* Process Section */}
          <div className={styles.process}>
            <div className={styles.processHeader}>
              <div>
                <span className={styles.sectionLabel}>Our Process</span>
                <h3 className={styles.sectionTitle}>
                  How We <span className={styles.accent}>Deliver</span>
                </h3>
              </div>
            </div>

            {/* CRITICAL: Pause autoscroll on hover or touch */}
            <div
              className={styles.processTimeline}
              ref={processScrollRef}
              onMouseEnter={() => setIsAutoScrollPaused(true)}
              onMouseLeave={() => setIsAutoScrollPaused(false)}
              onTouchStart={() => setIsAutoScrollPaused(true)}
              onTouchEnd={() => setIsAutoScrollPaused(false)}
            >
              <div className={styles.processTrackLine} />
              {activeService.process.map((step) => (
                <div key={step.number} className={styles.processStep}>
                  <div className={styles.processMarker}>
                    <span className={styles.processNumber}>{step.number}</span>
                  </div>
                  <div className={styles.processCard}>
                    <h4 className={styles.processStepTitle}>{step.title}</h4>
                    <p className={styles.processStepText}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.features}>
            <div className={styles.featuresHeader}>
              <span className={styles.sectionLabel}>Capabilities</span>
              <h3 className={styles.sectionTitle}>
                What We <span className={styles.accent}>Offer</span>
              </h3>
            </div>

            <div className={styles.featuresGrid}>
              {activeService.features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureText}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          <div className={styles.projectSection}>
            <div className={styles.projectHeader}>
              <span className={styles.sectionLabel}>Featured Project</span>
              <h3 className={styles.sectionTitle}>
                See It In <span className={styles.accent}>Action</span>
              </h3>
            </div>

            <div className={styles.projectCard}>
              <div
                className={styles.projectImage}
                style={{ backgroundImage: `url(${activeService.project.image})` }}
              >
                <div className={styles.projectOverlay} />
              </div>
              <div className={styles.projectContent}>
                <h4 className={styles.projectTitle}>{activeService.project.title}</h4>
                <span className={styles.projectLocation}>
                  <svg
                    className={styles.locationIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {activeService.project.location}
                </span>
                <Link href="/portfolio" className={styles.projectLink}>
                  Find out more
                  <svg
                    className={styles.arrowIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className={styles.cta}>
        <div className={`container ${styles.ctaContainer}`}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>
              Ready to Start Your <span className={styles.accent}>Project?</span>
            </h3>
            <p className={styles.ctaText}>
              Whether you&apos;re developing land, designing a landmark, or seeking investment
              advisory—our team is ready to deliver.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={`btn btn-primary ${styles.ctaBtnPrimary}`}>
                Request Consultation
              </Link>
              <Link href="/portfolio" className={styles.ctaBtnOutline}>
                Explore Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}