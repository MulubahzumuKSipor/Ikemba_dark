'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/services.module.css';

const services = [
  {
    id: '01',
    title: 'Development',
    fullTitle: 'Real Estate Development',
    description: 'High-quality, sustainable projects that drive economic growth. We handle land acquisition, site prep, and joint venture partnerships.',
    features: ['Mixed-Use Developments', 'Residential Communities', 'Public-Private Partnerships'],
    bgImage: '/construct.avif',
  },
  {
    id: '02',
    title: 'Architecture',
    fullTitle: 'Architecture & Design',
    description: 'Innovative, functional designs shaping Africa’s urban future. From concept schematics to 3D visualization and smart building solutions.',
    features: ['Concept & Schematic Design', '3D Rendering & VR', 'Sustainable Planning'],
    bgImage: '/architect.avif',
  },
  {
    id: '03',
    title: 'Consulting',
    fullTitle: 'Advisory & Analytics',
    description: 'Data-driven advisory services helping clients make informed decisions. We provide market analytics, valuation, and project supervision.',
    features: ['Market Data & Analytics', 'Feasibility Studies', 'Risk Assessment'],
    bgImage: '/workers.avif',
  }
];

export default function Services() {
  const [activeId, setActiveId] = useState('02');

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.label}>Our Expertise</span>
          <h2 className={styles.heading}>
            Comprehensive <br />
            <span className={styles.accent}>Real Estate Solutions.</span>
          </h2>
        </div>

        {/* ACCORDION WRAPPER */}
        <div className={styles.accordion}>
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`${styles.card} ${activeId === service.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveId(service.id)}
              onClick={() => setActiveId(service.id)} // <--- Added for Mobile Tap Support
              style={{ backgroundImage: `url(${service.bgImage})` }} 
            >
              <div className={styles.overlay} />
              
              {/* COLLAPSED CONTENT (Visible when inactive) */}
              <div className={styles.collapsedContent}>
                <span className={styles.verticalNumber}>{service.id}</span>
                <span className={styles.verticalTitle}>{service.title}</span>
              </div>

              {/* EXPANDED CONTENT (Visible when active) */}
              <div className={styles.expandedContent}>
                <div className={styles.contentInner}>
                  <span className={styles.bigNumber}>{service.id}</span>
                  <h3 className={styles.fullTitle}>{service.fullTitle}</h3>
                  <div className={styles.divider} />
                  <p className={styles.description}>{service.description}</p>
                  
                  <ul className={styles.featureList}>
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>

                  <Link href="/services" className={styles.link}>
                    Explore Service &rarr;
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}