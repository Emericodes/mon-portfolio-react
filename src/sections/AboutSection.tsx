import ScrollArrow from "../components/ScrollArrow";
import Aboutbackground from "../assets/images/white.png";
import type { SectionId } from "../components/Header";
import styles from "./AboutSection.module.css";


import { 
  Apple,
  Atom,         
  Braces,       
  Compass,      
  Cpu,          
  Database,     
  FileCode2,    
  Figma,    
  Github,    
  GitBranch,   
  LayoutGrid,
  Orbit, 
  Server,       
  Sparkles    
} from "lucide-react";

interface AboutSectionProps {
  onNavigate: (id: SectionId) => void;
}

const AboutSection = ({ onNavigate }: AboutSectionProps) => {
  return (
    <section
      id="about"
      className={styles.aboutSection}
      aria-labelledby="about-title"
    >
     
      <div className={styles.backgroundContainer} aria-hidden="true">
        <img
          src={Aboutbackground}
          alt=""
          className={styles.backgroundImage}
          fetchPriority="high"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.bentoGrid}>
        
       
        <div className={`${styles.bentoCard} ${styles.biographyCard}`}>
          <div className={styles.titleWithIcon}>
            <Compass size={28} className={styles.cardIcon} />
            <h2 id="about-title" className={styles.sectionTitle}>À propos de moi</h2>
          </div>
          <h3 className={styles.subtitle}>Mon parcours</h3>
          <p className={styles.bioText}>
            Après une décennie en gestion technique et management, j'ai choisi de
            placer <strong className={styles.bold}>le développement web</strong> au cœur de mon projet professionnel.
          </p>
          <p className={styles.bioText}>
            Le code a toujours été mon allié pour automatiser des analyses ou optimiser la productivité des équipes.
          </p>
          <p className={styles.bioText}>
            Aujourd’hui, en tant que <strong className={styles.bold}>Développeur Full Stack</strong>, j'apporte ma maturité professionnelle, ma rigueur et une réelle soif d'apprendre au service de vos projets.
          </p>
        </div>

       
        <div className={styles.bentoCard}>
          <h4 className={styles.blockTitle}>Hard Skills & Stack</h4>
          <div className={styles.logoGrid}>
            <div className={styles.logoItem} title="HTML5 / CSS3">
              <FileCode2 size={25} />
              <span>HTML/CSS</span>
            </div>
            <div className={styles.logoItem} title="JavaScript / TypeScript">
              <Braces size={25} />
              <span>JS / TS</span>
            </div>
            <div className={styles.logoItem} title="React.js">
              <Atom size={25} />
              <span>React</span>
            </div>
            <div className={styles.logoItem} title="Node.js / Express">
              <Server size={25} />
              <span>Node.js</span>
            </div>
            <div className={styles.logoItem} title="Databases (MySQL, MongoDB)">
              <Database size={25} />
              <span>Bases DD</span>
            </div>
            <div className={styles.logoItem} title="Figma UI/UX">
              <Figma size={25} />
              <span>Figma</span>
            </div>
            <div className={styles.logoItem} title="Github">
              <Github size={25} />
              <span>Github</span>
            </div>
             <div className={styles.logoItem} title="Orbit">
              <Orbit size={25} />
              <span>LM studio</span>
              <span>Codex</span>
            </div>
          </div>
        </div>

        {/* BLOC DROITE 2 : Méthodologies & Écosystèmes */}
        <div className={styles.bentoCard}>
          <div className={styles.cardHeader}>
            <GitBranch className={styles.cardIcon} />
            <h4>Méthode & Environnement</h4>
          </div>
          <p className={styles.cardDescription}>
            Gestion de projet via la rigueur <strong>Agile (Scrum)</strong>, sprints et outils collaboratifs comme <strong>Trello</strong>.
          </p>
            <div className={styles.osBadges}>
            <span className={styles.miniBadge}>
              <Cpu size={12} /> Linux (SteamOS / Mint)
            </span>
            <span className={styles.miniBadge}>
              <Apple size={12} /> macOS 
            </span>
            <span className={styles.miniBadge}>
              <LayoutGrid size={12} /> Windows 
            </span>
          </div>
        </div>

        {/* BLOC DROITE 3 : Soft Skills */}
        <div className={styles.bentoCard}>
          <div className={styles.cardHeader}>
            <Sparkles className={styles.cardIcon} />
            <h4>Soft Skills</h4>
          </div>
          <p className={styles.cardDescription}>
            Management d'équipe, communication positive, intelligence émotionnelle et esprit critique acquis durant mon passé de manager.
          </p>
        </div>

      </div>

      <ScrollArrow target="projects" onNavigate={onNavigate} />
    </section>
  );
};

export default AboutSection;