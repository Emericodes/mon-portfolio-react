import type { SectionId } from "../components/Header";
import styles from "./AboutSection.module.css";
import ScrollArrow from "../components/ScrollArrow";
import cvimg from "../assets/images/CV Emeric.png";
import cvPdf from "../assets/docs/Mouillat Emeric CV 2025.pdf";


interface Skill {
    id: string;
    title: string;
    content: string;
}
const skillsData : Skill[]= [
    {
		id: "Front",
        title: "FrontEnd",
        content: "HTML5, CSS3, JavaScript, React"
    },
    {
		id: "Back",
        title: "BackEnd",
        content: "Node.js, Express.js, MySQL, MongoDB"
    },
    {
		id: "DevOps",
        title: "Design & UX",
        content: "Figma, Wireframing, UI Design"
    },
    {
		id: "Soft",
        title: "Soft Skills",
        content: "Management d'équipe, Communication positive, Intelligence émotionnelle, Esprit critique"
    },
    {	
		id: "Projet",
        title: "Gestion de Projet",
        content: "Rigueur, Organisation, Analyse de données, Agilité (Scrum), Daily quotidien, Trello"
    },
    {
		id: "OS",
        title: "OS",
        content: "Linux (Steam os / Mint / Fedora), Mac OS, Windows"
    }
];

const AboutSection = ({
    onNavigate,
}: {
    onNavigate: (id: SectionId) => void;
}) => {
    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.textabout}>
                <h2>À propos de moi</h2>
                <h3>Mon parcours</h3>
                <p>
                    Après une décennie en gestion technique et management, j'ai choisi de
                    placer <strong className={styles.bold}>le développement web</strong>{" "}
                    au cœur de mon projet professionnel.
                </p>
                <p>
                    Ce n'est pas un départ à zéro, mais une évolution logique : le code a
                    toujours été mon allié pour automatiser des analyses de tendances ou
                    optimiser la productivité de mes équipes.
                </p>
                <p>
                    Aujourd’hui, je transitionne vers le métier de{" "}
                    <strong className={styles.bold}>Développeur Full Stack</strong>.
                    J'apporte avec moi la rigueur de mes expériences passées, une
                    communication fluide et une réelle soif d'apprendre. Mon objectif est
                    simple : mettre ma maturité professionnelle et mes compétences
                    techniques en construction au service de vos projets.
                </p>
            </div>

            <ul className={styles.cardsAbout}>
                {skillsData.map((skill,) => ( 
                    <li key={skill.id}>
                        <h4>{skill.title}</h4>
                        <p>{skill.content}</p>
                    </li>
                ))}

                <li className={`${styles.cardsAboutLi} ${styles.cvCardContainer}`}>
                    <a
                        href={cvPdf}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className={styles.cvLink}
                    >
                        <div className={styles.cvImage}>
                            <img src={cvimg} alt="Miniature du CV" />
                        </div>
                        <div className={styles.cvText}>
                            <h4>Mon CV complet</h4>
                            <p>Télécharger au format PDF</p>
                        </div>
                    </a>
                </li>
            </ul>

            <ScrollArrow target="projects" onNavigate={onNavigate} />
        </section>
    );
};

export default AboutSection;