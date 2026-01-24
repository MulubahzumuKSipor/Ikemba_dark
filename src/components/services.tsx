'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/services.module.css';

const services = [
  {
    id: '01',
    title: 'Real Estate Development',
    subtitle: 'Sustainable Growth',
    description: 'High-quality, sustainable projects that drive economic growth. We handle land acquisition, site prep, and joint venture partnerships.',
    features: [
      'Mixed-Use Developments',
      'Residential Communities',
      'Commercial Projects',
      'Land Acquisition',
      'Public-Private Partnerships'
    ],
    link: '/services#development',
    bgClass: styles.bgDevelopment
  },
  {
    id: '02',
    title: 'Architecture',
    subtitle: 'Design & Innovation',
    description: 'Innovative, functional designs shaping Africa’s urban future. From concept schematics to 3D visualization and smart building solutions.',
    features: [
      'Concept & Schematic Design',
      'Architectural Planning',
      '3D Rendering & VR',
      'Sustainable Design',
      'Regulatory Compliance'
    ],
    link: '/services#architecture',
    bgClass: styles.bgArchitecture
  },
  {
    id: '03',
    title: 'Consulting',
    subtitle: 'Expert Advisory',
    description: 'Data-driven advisory services helping clients make informed decisions. We provide market analytics, valuation, and project supervision.',
    features: [
      'Market Data & Analytics',
      'Feasibility Studies',
      'Construction Supervision',
      'Property Valuation',
      'Risk Assessment'
    ],
    link: '/services#consulting',
    bgClass: styles.bgConsulting
  }
];

export default function Services() {
  const [activeId, setActiveId] = useState('01');

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        
        {/* HEADER: Now Dark Text on Light Background */}
        <div className={styles.header}>
          <span className={styles.label}>Our Expertise</span>
          <h2 className={styles.heading}>
            Comprehensive <br />
            <span className={styles.accent}>Real Estate Solutions.</span>
          </h2>
        </div>

        {/* INTERACTIVE ACCORDION */}
        <div className={styles.accordion}>
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`${styles.card} ${activeId === service.id ? styles.active : ''} ${service.bgClass}`}
              onMouseEnter={() => setActiveId(service.id)}
            >
              {/* Overlay: Makes text readable but keeps image visible */}
              <div className={styles.overlay} />
              
              <div className={styles.content}>
                <div className={styles.topInfo}>
                  <span className={styles.number}>{service.id}</span>
                  <h3 className={styles.title}>{service.title}</h3>
                  <span className={styles.subtitle}>{service.subtitle}</span>
                </div>

                <div className={styles.hiddenContent}>
                  <p className={styles.description}>{service.description}</p>
                  
                  <ul className={styles.featureList}>
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>

                  <Link href="/portfolio" className={styles.link}>
                    View Details &rarr;
                  </Link>
                </div>
              </div>

              {/* Vertical Title for Collapsed State */}
              <div className={styles.verticalTitle}>
                {service.title}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}