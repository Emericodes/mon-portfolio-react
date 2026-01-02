import { ChevronDown } from "lucide-react";
import type { SectionId } from "./Header";
import "./ScrollArrow.css";

interface ScrollArrowProps {
  target: SectionId;
  onNavigate: (id: SectionId) => void;
}

const ScrollArrow = ({ target, onNavigate }: ScrollArrowProps) => {
  return (
    <button 
    type = "button"
    className="scrollButton"
    onClick={() => onNavigate(target)}
    aria-label={`Aller à la section ${target}`}
    >
      <ChevronDown className="chevron" />
    </button>
  );
};
export default ScrollArrow;