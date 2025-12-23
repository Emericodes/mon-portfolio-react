import { useState } from "react";
import Header, { type SectionId } from "./components/Header";
import AboutSection from "./sections/AboutSection";
import HomeSection from "./sections/HomeSection";


function App() {
	const [activeSection, setActiveSection] = useState<SectionId>("home");

	const handleNavigate = (section: SectionId) => {
		setActiveSection(section);

	const element = document.getElementById(section);

	if (element) {
		element.scrollIntoView({ behavior: "smooth" });
	}
	};
	return (
		<>
			<div className="nav-container">
				<Header activeSection={activeSection} onNavigate={handleNavigate} />
			</div>
			<main>
					<HomeSection onNavigate={handleNavigate} />
					<AboutSection />
			</main>
		</>
	);
}

export default App;
