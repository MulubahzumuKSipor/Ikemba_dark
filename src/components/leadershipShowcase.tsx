"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/leadershipShowcase.module.css";

// --- TYPES ---
interface Leader {
  id: string;
  name: string;
  role: string;
  shortRole: string;
  image: string;
  bio: string[];
  achievements: string[];
  expertise: string[];
  quote: string;
  linkedinUrl: string;
}

// --- DATA (AUTHENTIC PROFILES) ---
const leaders: Leader[] = [
  {
    id: "bleejay",
    name: "Bleejay Innis",
    role: "Managing Partner & Chief Executive Officer",
    shortRole: "CEO",
    image: "/CEO.avif",
    linkedinUrl: "https://www.linkedin.com/in/bleejay-innis",
    bio: [
      "Bleejay Innis serves as the Chief Executive Officer and a Managing Partner of Ikemba Investment Group, LLC. He is a primary visionary behind the group's mission to contribute meaningfully to the development of Africa's vast economies through long-lasting infrastructure projects.",
      "Under his leadership, the firm strategically focuses on real estate development, architecture, construction management, and consulting within Africa's emerging economies. He oversees operations across the company's international offices in Monrovia (Liberia), Accra (Ghana), and the USA.",
    ],
    achievements: [
      "Founded Ikemba Investment Group",
      "Established strategic presence in Ghana and Liberia",
      "Secured major development and consulting mandates",
      "Pioneered a Pan-African firm model for emerging economies",
    ],
    expertise: [
      "Real Estate Development",
      "Strategic Planning",
      "Infrastructure Investment",
      "International Business",
    ],
    quote:
      "Africa's urban future will be built by Africans. Our role is to channel global expertise and diaspora capital into developments that serve our communities for generations.",
  },
  {
    id: "imari",
    name: "Imari Sekajipo",
    role: "Managing Partner & Chief Operating Officer",
    shortRole: "COO",
    image: "/COO1.avif",
    linkedinUrl: "https://www.linkedin.com/in/imari-sekajipo",
    bio: [
      "Imari Sekajipo is a Managing Partner and the Chief Operating Officer for the group. He plays a critical role in the partnership of African professionals that founded the firm, bringing together over 50 years of collective industry experience.",
      "As COO, he is responsible for the operational execution of the company's diverse services, which include turnkey 'Design & Build' solutions and comprehensive construction management. He ensures that project concept-to-completion workflows maintain strict standards of quality, timeline, and budget.",
    ],
    achievements: [
      "Implemented turnkey 'Design & Build' operational frameworks",
      "Standardized site supervision and contractor oversight protocols",
      "Managed project delivery timelines across multiple markets",
      "Optimized concept-to-completion development workflows",
    ],
    expertise: [
      "Operations & Logistics",
      "Construction Management",
      "Project Oversight",
      "Quality Control",
    ],
    quote:
      "Excellence in execution is non-negotiable. Every project we deliver is a testament to what African firms can achieve when we hold ourselves to the highest global standards.",
  },
  {
    id: "samuel",
    name: "Samuel Kofi Adabie",
    role: "Managing Partner & Chief Creative Officer",
    shortRole: "CCO",
    image: "/CCO.avif",
    linkedinUrl: "https://www.linkedin.com/in/samuel-adabie",
    bio: [
      "Samuel Kofi Adabie is a Managing Partner and the Chief Creative Officer, leading the firm's architectural design vision. He has been instrumental in defining the 'Architecture of a New Africa' by moving away from traditional boxy aesthetics toward contemporary, majestic designs.",
      "His work emphasizes the integration of sustainable elements, such as solar power backup and rainwater harvesting, into modern African architecture. His creative portfolio includes landmark projects such as the Beauty Queen Hotel, the SOS Centre for Arts, and high-end smart homes like the SG Residence.",
    ],
    achievements: [
      "Defined the 'Architecture of a New Africa' design language",
      "Lead designer for the $6M Beauty Queen Hotel",
      "Architect for the bespoke automated $2.5M SG Residence",
      "Integrated sustainable solar and water systems into luxury living",
    ],
    expertise: [
      "Architectural Design",
      "Contemporary Aesthetics",
      "Sustainable Design",
      "Smart Home Integration",
    ],
    quote:
      "Great architecture tells the story of its people. Every structure we design carries forward the legacy of African craftsmanship while embracing the possibilities of tomorrow.",
  },
];

// --- ICONS ---
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// --- MAIN COMPONENT ---
export default function LeadershipShowcase() {
  const searchParams = useSearchParams();
  const leaderId = searchParams.get('id');

  // FIX 1: Initialize State Lazily based on URL
  const [selectedLeader, setSelectedLeader] = useState<Leader>(() => {
    if (leaderId) {
      const found = leaders.find((l) => l.id === leaderId);
      if (found) return found;
    }
    return leaders[0];
  });

  const [carouselIndex, setCarouselIndex] = useState(() => {
    if (leaderId) {
      const index = leaders.findIndex((l) => l.id === leaderId);
      if (index !== -1) return index;
    }
    return 0;
  });

  // FIX 2: Effect only runs on navigation changes
  useEffect(() => {
    if (leaderId && leaderId !== selectedLeader.id) {
      const leader = leaders.find((l) => l.id === leaderId);
      if (leader) {
        setSelectedLeader(leader);
        const index = leaders.findIndex((l) => l.id === leaderId);
        if (index !== -1) setCarouselIndex(index);
      }
    }
  }, [leaderId, selectedLeader.id]);

  // Auto-Rotate Background Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % leaders.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLeaderClick = (leader: Leader) => {
    setSelectedLeader(leader);
    window.history.pushState(null, '', `?id=${leader.id}`);
  };

  return (
    <section className={styles.section}>
      {/* 1. HERO HEADER */}
      <div className={styles.heroHeader}>
        <div className={styles.carouselContainer}>
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className={`${styles.carouselSlide} ${index === carouselIndex ? styles.carouselActive : ""}`}
              style={{ backgroundImage: `url(${leader.image})` }}
            />
          ))}
          <div className={styles.carouselOverlay} />
        </div>

        <div className={styles.carouselIndicators}>
          {leaders.map((leader, index) => (
            <button
              key={leader.id}
              className={`${styles.carouselDot} ${index === carouselIndex ? styles.carouselDotActive : ""}`}
              onClick={() => setCarouselIndex(index)}
              aria-label={`View background for ${leader.name}`}
            />
          ))}
        </div>

        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.label}>Executive Team</span>
          <h1 className={styles.heroTitle}>
            The Minds Behind <span className={styles.accent}>Ikemba</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Three leaders. Fifty years of combined expertise. One shared vision for Africa&apos;s future. [cite: 22]
          </p>
        </div>
      </div>

      {/* 2. INTERACTIVE CONTENT */}
      <div className={`container ${styles.container}`}>
        <div className={styles.selectionGrid}>
          {leaders.map((leader) => (
            <button
              key={leader.id}
              className={`${styles.selectionCard} ${selectedLeader.id === leader.id ? styles.active : ""}`}
              onClick={() => handleLeaderClick(leader)}
              aria-pressed={selectedLeader.id === leader.id}
            >
              <div className={styles.selectionImageWrapper}>
                <div className={styles.selectionImage} style={{ backgroundImage: `url(${leader.image})` }} />
              </div>
              <div className={styles.selectionInfo}>
                <span className={styles.selectionRole}>{leader.shortRole}</span>
                <h3 className={styles.selectionName}>{leader.name}</h3>
              </div>
              <div className={styles.selectionIndicator} />
            </button>
          ))}
        </div>

        <div className={styles.profile} key={selectedLeader.id}>
          <div className={styles.profileGrid}>
            <div className={styles.profileImageWrapper}>
              <div className={styles.profileImage} style={{ backgroundImage: `url(${selectedLeader.image})` }} />
              <div className={styles.profileImageOverlay}>
                <span className={styles.profileImageRole}>{selectedLeader.shortRole}</span>
              </div>
            </div>

            <div className={styles.profileContent}>
              <div className={styles.profileHeader}>
                <div className={styles.headerRow}>
                  <div>
                    <h2 className={styles.profileName}>{selectedLeader.name}</h2>
                    <p className={styles.profileRole}>{selectedLeader.role}</p>
                  </div>
                  <a
                    href={selectedLeader.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinButton}
                  >
                    <LinkedInIcon className={styles.linkedinIcon} />
                    <span>Connect</span>
                  </a>
                </div>
              </div>

              <div className={styles.profileBio}>
                {selectedLeader.bio.map((paragraph, index) => (
                  <p key={index} className={styles.profileText}>{paragraph}</p>
                ))}
              </div>

              <blockquote className={styles.profileQuote}>
                <span className={styles.quoteIcon}>&ldquo;</span>
                {selectedLeader.quote}
              </blockquote>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsCard}>
              <h4 className={styles.detailsTitle}>Areas of Expertise</h4>
              <div className={styles.expertiseTags}>
                {selectedLeader.expertise.map((skill, index) => (
                  <span key={index} className={styles.expertiseTag}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerDivider} />
          <p className={styles.footerTagline}>&ldquo;Building the Future of Africa Together&rdquo; [cite: 15]</p>
          <div className={styles.footerDivider} />
        </div>
      </div>
    </section>
  );
}