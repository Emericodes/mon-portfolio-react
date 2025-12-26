import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import Homebackground from "../assets/images/background_home.png"; 
import Profil from "../assets/images/profil.png";
import type { SectionId } from "../components/Header";
import styles from "./HomeSection.module.css"; 


const HomeSection = ({ onNavigate }: { onNavigate: (id: SectionId) => void }) => {

    return (
        <section id="home" className={styles.heroSection}>
            <div className={styles.backgroundWrapper}>
                <img
                    src={Homebackground}
                    alt="Décoration d'ambiance"
                    className={styles.backgroundImage}
                    fetchPriority="high"
                />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.textWrapper}>
                    <h1 className={styles.title}>
                        Bienvenue <span className={styles.highlight}>sur mon site</span>
                    </h1>
                    <h2 className={styles.subtitle}>
                        La théorie c'est bien, la pratique c'est mieux. <br />
                        <strong className={styles.strongText}>
                            Opérationnel aujourd'hui, expert demain.
                        </strong>
                    </h2>

                    <p className={styles.description}>
                        Je me forme activement sur <strong>React</strong> et{" "}
                        <strong>Node.js</strong> à travers des projets réels. Je suis prêt à
                        relever vos défis techniques et à évoluer avec votre équipe.
                    </p>
                </div>
                
                <img
                    src={Profil}
                    alt="Portrait d'Emeric"
                    className={styles.profileImage}
                    fetchPriority="high"
                />

                <div className={styles.ctaContainer}>
                    <a href="https://github.com/Emericodes" target="_blank" rel="noreferrer">
                        <Github className={styles.myIcon} />
					</a>
					<a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" target="_blank" rel="noreferrer">
                        <Linkedin className={styles.myIcon} />
                    </a>
					<a href="mailto:pro.emeric.m@gmail.com">
   					 <Mail className={styles.myIcon} />
					</a>
                </div>
            </div>
				<button 
                    type="button" 
                    className={styles.arrowButton} 
                    onClick={() => onNavigate("about")}
                    >
					<ChevronDown className={styles.arrow} />
				</button>
        </section>
    );
}

export default HomeSection;