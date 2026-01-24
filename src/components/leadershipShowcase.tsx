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
}

const leaders: Leader[] = [
  {
    id: "bleejay",
    name: "Bleejay Innis",
    role: "Managing Partner & Chief Executive Officer",
    shortRole: "CEO",
    image: "/CEO.avif",
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
      "Construction Management",
      "Civil Engineering",
      "Operations & Logistics",
      "Regulatory Compliance",
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

export default function LeadershipShowcase() {
  const [selectedLeader, setSelectedLeader] = useState<Leader>(leaders[0]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-rotate carousel background
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % leaders.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      {/* HERO HEADER WITH CAROUSEL BACKGROUND */}
      <div className={styles.heroHeader}>
        {/* Background Carousel */}
        <div className={styles.carouselContainer}>
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className={`${styles.carouselSlide} ${
                index === carouselIndex ? styles.carouselActive : ""
              }`}
              style={{ backgroundImage: `url(${leader.image})` }}
            />
          ))}
          <div className={styles.carouselOverlay} />
        </div>

        {/* Carousel Indicators */}
        <div className={styles.carouselIndicators}>
          {leaders.map((leader, index) => (
            <button
              key={leader.id}
              className={`${styles.carouselDot} ${
                index === carouselIndex ? styles.carouselDotActive : ""
              }`}
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
            Three leaders. Fifty years of combined expertise. One shared vision
            for Africa&apos;s future.
          </p>
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        {/* LEADER SELECTION GRID */}
        <div className={styles.selectionGrid}>
          {leaders.map((leader) => (
            <button
              key={leader.id}
              className={`${styles.selectionCard} ${
                selectedLeader.id === leader.id ? styles.active : ""
              }`}
              onClick={() => setSelectedLeader(leader)}
              aria-pressed={selectedLeader.id === leader.id}
            >
              <div className={styles.selectionImageWrapper}>
                <div
                  className={styles.selectionImage}
                  style={{ backgroundImage: `url(${leader.image})` }}
                />
              </div>
              <div className={styles.selectionInfo}>
                <span className={styles.selectionRole}>{leader.shortRole}</span>
                <h3 className={styles.selectionName}>{leader.name}</h3>
              </div>
              <div className={styles.selectionIndicator} />
            </button>
          ))}
        </div>

        {/* EXPANDED PROFILE */}
        <div className={styles.profile} key={selectedLeader.id}>
          <div className={styles.profileGrid}>
            {/* LEFT: Large Portrait */}
            <div className={styles.profileImageWrapper}>
              <div
                className={styles.profileImage}
                style={{ backgroundImage: `url(${selectedLeader.image})` }}
              />
              <div className={styles.profileImageOverlay}>
                <span className={styles.profileImageRole}>
                  {selectedLeader.shortRole}
                </span>
              </div>
            </div>

            {/* RIGHT: Bio & Details */}
            <div className={styles.profileContent}>
              <div className={styles.profileHeader}>
                <h2 className={styles.profileName}>{selectedLeader.name}</h2>
                <p className={styles.profileRole}>{selectedLeader.role}</p>
              </div>

              {/* Bio */}
              <div className={styles.profileBio}>
                {selectedLeader.bio.map((paragraph, index) => (
                  <p key={index} className={styles.profileText}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quote */}
              <blockquote className={styles.profileQuote}>
                <span className={styles.quoteIcon}>&ldquo;</span>
                {selectedLeader.quote}
              </blockquote>
            </div>
          </div>

          {/* ACHIEVEMENTS & EXPERTISE ROW */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailsCard}>
              <h4 className={styles.detailsTitle}>Key Achievements</h4>
              <ul className={styles.detailsList}>
                {selectedLeader.achievements.map((achievement, index) => (
                  <li key={index} className={styles.detailsItem}>
                    <span className={styles.detailsBullet}>◆</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.detailsCard}>
              <h4 className={styles.detailsTitle}>Areas of Expertise</h4>
              <div className={styles.expertiseTags}>
                {selectedLeader.expertise.map((skill, index) => (
                  <span key={index} className={styles.expertiseTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER STATEMENT */}
        <div className={styles.footer}>
          <div className={styles.footerDivider} />
          <p className={styles.footerTagline}>
            &ldquo;Building the Future of Africa Together&rdquo;
          </p>
          <div className={styles.footerDivider} />
        </div>
      </div>
    </section>
  );
}