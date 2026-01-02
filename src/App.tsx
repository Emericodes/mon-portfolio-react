import { useState } from "react";
import Header, { type SectionId } from "./components/Header";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import HomeSection from "./sections/HomeSection";
import ProjectsSection from "./sections/ProjectsSection";
import SoundWallSection from "./sections/SoundWallSection";

function App() {
	const [activeSection, setActiveSection] = useState<SectionId>("home");

	const Navigate = (section: SectionId) => {
		setActiveSection(section);

		const element = document.getElementById(section);

		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<>
			<div className="nav-container">
				<Header activeSection={activeSection} onNavigate={Navigate} />
			</div>
			<main>
				<HomeSection onNavigate={Navigate} />
				<AboutSection onNavigate={Navigate} />
				<ProjectsSection onNavigate={Navigate} />
				<ContactSection onNavigate={Navigate} />
				<SoundWallSection />
			</main>
		</>
	);
}

export default App;
