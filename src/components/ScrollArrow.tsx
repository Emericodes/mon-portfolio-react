import { ChevronDown } from "lucide-react";
import type { SectionId } from "./Header";
import "./ScrollArrow.css";

interface ScrollArrowProps {
  target: SectionId;
  onNavigate: (id: SectionId) => void;
}

const ScrollArrow = ({ target, onNavigate }: ScrollArrowProps) => {
  const sectionLabels: Record<SectionId, string> = {
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    contact: "Contact",
    soundwall: "SoundWall",
  };

  return (
    <button 
    type = "button"
    className="scrollButton"
    onClick={() => onNavigate(target)}
    aria-label={`Aller à la section ${sectionLabels[target]}`}
    >
      <ChevronDown className="chevron" aria-hidden="true" />
    </button>
  );
};
export default ScrollArrow;
