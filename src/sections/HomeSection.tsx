import { Github, Linkedin, Mail } from 'lucide-react';
import styles from './HomeSection.module.css';

import Profil from '../../src/assets/images/profil.png'; 
import cvPdf from '../../src/assets/docs/Mouillat_Emeric_CV.pdf';
import ScrollArrow from '../components/ScrollArrow';
import type { SectionId } from '../components/Header';

interface HomeSectionProps {
  onNavigate: (id: SectionId) => void;
}

const HomeSection = ({ onNavigate }: HomeSectionProps) => {
  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.backgroundContainer} aria-hidden="true" />

      <div className={styles.heroContent}>
        
        
        <div className={styles.leftColumn}>
          <h1 className={styles.mainTitle}>Emeric Mouillat</h1>
		  <h2 className={styles.secondTitle}>Developpeur Full Stack</h2>

          <ul className={styles.socialList}>
            <li className={styles.socialItem}>
              <a
                href="https://github.com/Emericodes"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir mon profil GitHub"
              >
                <Github className={styles.myIcon} aria-hidden="true" />
              </a>
            </li>
            <li className={styles.socialItem}>
              <a
                href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir mon profil LinkedIn"
              >
                <Linkedin className={styles.myIcon} aria-hidden="true" />
              </a>
            </li>
            <li className={styles.socialItem}>
              <a
                href="mailto:pro.emeric.m@gmail.com"
                aria-label="M'envoyer un email"
              >
                <Mail className={styles.myIcon} aria-hidden="true" />
              </a>
            </li>
          </ul>

          <div className={styles.container}>
            <a
              href={cvPdf}
              target="_blank"
              rel="noreferrer"
              className={styles.cvLink}
              aria-label="Télécharger mon CV complet au format PDF (ouvre un nouvel onglet)"
            >
              <span className={styles.cvTextDesc}>Télécharger mon CV</span>
            </a>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <img
            src={Profil}
            alt="Portrait d'Emeric"
            className={styles.profileImage}
            fetchPriority="high"
          />
        </div>

      </div>

      <ScrollArrow target="about" onNavigate={onNavigate} />
    </section>
  );
};

export default HomeSection;