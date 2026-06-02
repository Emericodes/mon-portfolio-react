import { useForm, ValidationError } from "@formspree/react";
import type { SectionId } from "../components/Header";
import ScrollArrow from "../components/ScrollArrow";
import styles from "./ContactSection.module.css";

const ContactSection = ({
	onNavigate,
}: {
	onNavigate: (id: SectionId) => void;
}) => {
	const [state, submitForm] = useForm("xlgdjlgj");

	const renderContent = () => {
		if (state.succeeded) {
			return (
				<div className={styles.successBox}>
					<p>✅ Merci, votre message est bien parti !</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className={styles.resetButton}
					>
						Envoyer un autre message ?
					</button>
				</div>
			);
		}
		return (
			<form onSubmit={submitForm} className={styles.contactForm}>
				<label htmlFor="name">Nom</label>
				<input
					id="name"
					type="text"
					name="name"
					placeholder="Votre nom"
					required
				/>
				<ValidationError prefix="Name" field="name" errors={state.errors} />

				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="votre@email.com"
					required
				/>
				<ValidationError prefix="Email" field="email" errors={state.errors} />

				<fieldset className={styles.categoryGroup}>
					<legend>Vous êtes :</legend>
					<div className={styles.radioOptions}>
						<label>
							<input
								type="radio"
								name="status"
								value="Employer"
								defaultChecked
							/>{" "}
							Un employeur
						</label>
						<label>
							<input type="radio" name="status" value="Visitor" /> Visiteur
						</label>
					</div>
				</fieldset>

				<label htmlFor="message">Message</label>
				<textarea
					id="message"
					name="message"
					placeholder="Bonjour Emeric..."
					required
				/>
				<ValidationError
					prefix="Message"
					field="message"
					errors={state.errors}
				/>

				<button
					type="submit"
					className={styles.sendButton}
					disabled={state.submitting}
				>
					{state.submitting ? "Envoi..." : "Envoyer le message"}
				</button>
			</form>
		);
	};

	return (
		<section
			id="contact"
			className={styles.contactSection}
			aria-labelledby="contact-title"
		>
			<div className={styles.formCard}>
				<h2 id="contact-title">Me contacter</h2>
				<p>Une proposition de travail ou un commentaire? Écrivez-moi !</p>
				{renderContent()}
			</div>
			<ScrollArrow target="soundwall" onNavigate={onNavigate} />
		</section>
	);
};

export default ContactSection;
