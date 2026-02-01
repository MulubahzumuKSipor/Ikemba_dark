"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/leadershipShowcase.module.css";

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
  linkedinUrl: string; // Added field
}

const leaders: Leader[] = [
  {
    id: "bleejay",
    name: "Bleejay Innis",
    role: "Managing Partner & Chief Executive Officer",
    shortRole: "CEO",
    image: "/CEO.avif",
    linkedinUrl: "https://www.linkedin.com/in/bleejay-innis",
    bio: [
      "Bleejay Innis is the visionary force behind Ikemba Investment Group's Pan-African expansion. With over two decades of experience in real estate development and investment banking, he has led the firm from its founding in Monrovia to becoming a continental leader in infrastructure development.",
      "Under his leadership, IIG has secured landmark projects including the 61-acre Ghana Insurance College campus and the flagship 7th & Tubman mixed-use development. His expertise in structuring complex development deals has attracted institutional investors from across the African diaspora.",
    ],
    achievements: [
      "Founded Ikemba Investment Group in 2011",
      "Secured $50M+ in development financing",
      "Led expansion into Ghana and US markets",
      "Pioneered diaspora investment frameworks",
    ],
    expertise: [
      "Real Estate Development",
      "Investment Structuring",
      "Strategic Partnerships",
      "Capital Markets",
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
      "Imari Sekajipo brings operational excellence to every IIG project. His background in civil engineering and construction management ensures that the firm's ambitious designs become reality—on time, on budget, and to the highest international standards.",
      "Before joining IIG, Imari led major infrastructure projects across East and West Africa, developing deep expertise in navigating the regulatory and logistical challenges unique to African markets. His operational frameworks have become the backbone of IIG's execution capability.",
    ],
    achievements: [
      "Delivered 600+ acres of managed developments",
      "Established Tri Buchanan Development Corp partnership",
      "Implemented ISO-certified project management systems",
      "Reduced average project delivery time by 30%",
    ],
    expertise: [
      "Project Management",
      "Creative Financing",
      "Operations & Logistics",
      "Investor Relations",
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
      "Samuel Kofi Adabie is the architectural mind shaping IIG's landmark developments. With formal training in architecture and urban design from institutions in Ghana and the United States, he brings a unique perspective that blends African design heritage with contemporary innovation.",
      "Samuel's design philosophy centers on creating spaces that honor local context while meeting world-class standards. His work on the SG Residence and the 7th & Tubman tower has established IIG's reputation for developments that are both functionally superior and aesthetically distinctive.",
    ],
    achievements: [
      "Designed the $2.5M SG Residence",
      "Lead architect for 7th & Tubman tower",
      "Developed IIG's sustainable design standards",
      "Created the firm's Pan-African design language",
    ],
    expertise: [
      "Architecture & Design",
      "Urban Planning",
      "Sustainable Development",
      "Brand Identity",
    ],
    quote:
      "Great architecture tells the story of its people. Every structure we design carries forward the legacy of African craftsmanship while embracing the possibilities of tomorrow.",
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function LeadershipShowcase() {
  const [selectedLeader, setSelectedLeader] = useState<Leader>(leaders[0]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % leaders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
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
              aria-label={`View ${leader.name}`}
            />
          ))}
        </div>

        <div className={`container ${styles.heroContainer}`}>
          <span className={styles.label}>Executive Team</span>
          <h1 className={styles.heroTitle}>
            The Minds Behind <span className={styles.accent}>Ikemba</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Three leaders. Fifty years of combined expertise. One shared vision for Africa&apos;s future.
          </p>
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.selectionGrid}>
          {leaders.map((leader) => (
            <button
              key={leader.id}
              className={`${styles.selectionCard} ${selectedLeader.id === leader.id ? styles.active : ""}`}
              onClick={() => setSelectedLeader(leader)}
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
          <p className={styles.footerTagline}>&ldquo;Building the Future of Africa Together&rdquo;</p>
          <div className={styles.footerDivider} />
        </div>
      </div>
    </section>
  );
}