import { useState } from "react";
import HomeSection from "./sections/HomeSection";
import Header, { type SectionId } from "./components/Header";

function App() {
	const [activeSection, setActiveSection] = useState<SectionId>("home");

	const handleNavigate = (section: SectionId) => {
		setActiveSection(section);
	};
	return (
		<>
			<div className="nav-container">
				<Header activeSection={activeSection} onNavigate={handleNavigate} />
			</div>
			<main>
				<section id="home">
					<HomeSection />
				</section>
			</main>
		</>
	);
}

export default App;
