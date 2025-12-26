import { ChevronDown } from "lucide-react";
import type { SectionId } from "../components/Header";
import styles from "./AboutSection.module.css";

const AboutSection = ({ onNavigate }: { onNavigate: (id: SectionId) => void }) => {

    return (
<section id="about" className={styles.aboutSection}>
    <div className={styles.textcontainer}>

        <h2>À propos de moi</h2>
        <h3>Mon parcours</h3>
        <p>
            Après une décennie en gestion technique et management, j'ai choisi de placer le développement web
            au cœur de mon projet professionnel. Ce n'est pas un départ à zéro, mais une évolution logique :
            le code a toujours été mon allié pour automatiser des analyses de tendances ou optimiser 
            la productivité de mes équipes.
            <br /><br />
            Aujourd’hui, je transitionne vers le métier de Développeur Full Stack. J'apporte avec moi la rigueur 
            de mes expériences passées, une communication fluide et une réelle soif d'apprendre. Mon objectif 
            est simple : mettre ma maturité professionnelle et mes compétences techniques en construction 
            au service de vos projets.
        </p>
    </div>
    <ul className={styles.cardsContainer}>
        <li>
            <h4>FrontEnd</h4>
            <p>HTML5, CSS3, JavaScript, React</p>
        </li>
        <li>
            <h4>BackEnd</h4>
            <p>Node.js, Express.js, MySQL, MongoDB</p>
        </li>
        <li>
            <h4>Design & UX</h4>
            <p>Figma, Wireframing, UI Design</p>
        </li>
        <li>
            <h4>Soft Skills</h4>
            <p>Management d'équipe, Communication positive, Intelligence émotionnelle, Esprit critique</p>
        </li>
        <li>
            <h4>Gestion de Projet</h4>
            <p>Rigueur, Organisation, Analyse de données, Agilité (Scrum), Daily quotidien, Trello</p>
        </li>
        <li>
            <h4>OS</h4>
            <p>Linux (Steam os / Mint / Fedora), Mac OS, Windows</p>
        </li>
    </ul>
    <button 
        type="button" 
        className={styles.arrowButton} 
        onClick={() => onNavigate("projects")}
         >
			<ChevronDown className={styles.arrow} />
	</button>
</section>
    );
}

export default AboutSection;   