import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Play, AlertCircle } from "lucide-react";
import styles from "./SoundWallSection.module.css";

interface VisualCircle {
	id: number;
	x: number;
	y: number;
	color: string;
	size: number;
}


const BAD_WORDS = [
	"abruti",
	"abrutie",
	"anus",
	"arabe",
	"batard",
	"batarde",
	"benet",
	"biatch",
	"bibite",
	"bicot",
	"bicotte",
	"bite",
    "bites",
    "bitte",
	"biteur",
	"biture",
	"boche",
	"bordel",
	"boucaque",
	"bougnoul",
	"bougnoule",
	"bouffon",
	"bouffonne",
	"boule",
	"bourrer",
	"branle",
	"branlee",
	"branleur",
	"branleuse",
	"brêle",
	"brouter",
	"brouteur",
	"broutage",
	"burnes",
	"cac",
	"caca",
	"cageot",
	"con",
	"conne",
	"conard",
	"connard",
	"connnard",
	"connasse",
	"couille",
	"couillon",
	"couillu",
	"crade",
	"crass",
	"cretin",
	"crotte",
	"cul",
	"debile",
	"deconne",
	"deconner",
	"degage",
	"degueu",
	"degueulasse",
	"encule",
	"enculee",
	"enculer",
	"enfoire",
	"enfoiree",
	"etron",
	"fion",
	"fiotte",
	"fist",
	"foutre",
	"foufoune",
	"fourien",
	"frotteur",
	"frugivore",
	"fuck",
	"fumier",
	"garage",
	"garce",
	"gland",
	"glandeur",
	"glandu",
	"glauque",
	"gogol",
	"gouine",
	"gourdasse",
	"grognasse",
	"gueule",
	"imbecile",
	"inceste",
	"inculte",
	"insulte",
	"insultes",
	"ivrogne",
	"jarter",
	"jean-foutre",
	"jobard",
	"jobastre",
	"jouir",
	"juif",
	"kike",
	"lache",
	"laideron",
	"lavette",
	"loche",
	"lopette",
	"loubard",
	"louch",
	"louche",
	"lourd",
	"lourdingue",
	"maboul",
	"macaque",
	"mange-merde",
	"manger",
	"manouche",
	"merde",
	"merdique",
	"merdeux",
	"meuf",
	"minette",
	"moche",
	"mongol",
	"moule",
	"naze",
	"nazi",
	"negre",
	"negresse",
	"neuneu",
	"nique",
	"niquer",
	"niqueur",
	"noeud",
	"nouille",
	"nuls",
	"nympho",
	"obsede",
	"oignon",
	"orgie",
	"ouste",
	"pouf",
	"poufiasse",
	"pd",
	"pédé",
	"pede",
	"pelle",
	"penis",
	"peta",
	"petasse",
	"peter",
	"petochard",
	"phallus",
	"piche",
	"pine",
	"pisser",
	"pisseur",
	"pisseuse",
	"pipe",
	"pouffiasse",
	"pourri",
	"pourriture",
	"pue",
	"pute",
	"putain",
	"raclure",
	"raciste",
	"radasse",
	"rat",
	"rate",
	"rectum",
	"ringard",
	"rogne",
	"romano",
	"rongeon",
	"rosbif",
	"rouste",
	"roupettes",
	"salaud",
	"salopard",
	"salope",
	"saperlipopette",
	"schleu",
	"schnock",
	"schpountz",
	"semence",
	"sexe",
	"sodomie",
	"sodomiser",
	"suce",
	"sucer",
	"suceur",
	"suceuse",
	"tafiole",
	"tantouze",
	"tapette",
	"tare",
	"tarlouze",
	"teub",
	"teuch",
	"teuche",
	"tocard",
	"tonche",
	"tont",
	"touze",
	"trainée",
	"travelo",
	"tronche",
	"trou",
	"trouduc",
	"truie",
	"uterus",
	"vagin",
	"vaseux",
	"veule",
	"vicelard",
	"videuse",
	"viol",
	"viole",
	"violer",
	"vol",
	"voleur",
	"vomi",
	"voyou",
	"vulve",
	"wesh",
	"xénophobe",
	"zizi",
	"zob",
	"zoulette",

	"ass",
	"asshole",
	"bastard",
	"bitch",
	"blowjob",
	"bollocks",
	"boob",
	"boobs",
	"bugger",
	"bullshit",
	"clit",
	"cock",
	"coon",
	"crap",
	"cum",
	"cunt",
	"damn",
	"dick",
	"dildo",
	"douche",
	"fag",
	"faggot",
	"feck",
	"fuck",
	"fucker",
	"fucking",
	"gay",
	"handjob",
	"hell",
	"homo",
	"idiot",
	"jerk",
	"jizz",
	"knob",
	"lezzie",
	"masturbate",
	"moron",
	"motherfucker",
	"nazi",
	"nigger",
	"orgasm",
	"penis",
	"piss",
	"poop",
	"porn",
	"prick",
	"pussy",
	"queer",
	"rape",
	"retard",
	"rimjob",
	"scum",
	"sex",
	"shit",
	"shite",
	"slag",
	"slut",
	"smegma",
	"spastic",
	"tit",
	"tits",
	"tosser",
	"turd",
	"twat",
	"wanker",
	"whore",
	"wtf",
];

const SoundWallSection = () => {
	const [isAudioStarted, setIsAudioStarted] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [message, setMessage] = useState("");
	const [savedMessages, setSavedMessages] = useState<
		Array<{ id: string; text: string }>
	>([]);
	const [circles, setCircles] = useState<VisualCircle[]>([]);

	// États pour la modération et la lecture
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [isPlaying, setIsPlaying] = useState<string | null>(null);

	const pianoSampler = useRef<Tone.Sampler | null>(null);
	const validationSynthRef = useRef<Tone.Synth | null>(null);

	const notes = [
		"C3",
		"D3",
		"E3",
		"G3",
		"A3",
		"C4",
		"D4",
		"E4",
		"G4",
		"A4",
		"C5",
		"D5",
		"E5",
		"G5",
	];

	// Fonction de vérification (Le Videur)
	const containsBadWords = (text: string): boolean => {
		const lowerText = text.toLowerCase();
		return BAD_WORDS.some((badWord) => {
			// Regex pour trouver le mot exact (\b = frontière de mot)
			const regex = new RegExp(`\\b${badWord}\\b`, "i");
			return regex.test(lowerText);
		});
	};

	useEffect(() => {
		pianoSampler.current = new Tone.Sampler({
			urls: {
				A2: "A2.mp3",
				C3: "C3.mp3",
				C4: "C4.mp3",
				"D#4": "Ds4.mp3",
				"F#4": "Fs4.mp3",
				A4: "A4.mp3",
				C5: "C5.mp3",
			},
			baseUrl: "https://tonejs.github.io/audio/salamander/",
			onload: () => setIsLoaded(true),
		}).toDestination();

		return () => {
			pianoSampler.current?.dispose();
		};
	}, []);

	const startAudio = async () => {
		await Tone.start();
		setIsAudioStarted(true);
		validationSynthRef.current = new Tone.Synth({
			oscillator: { type: "square" },
			envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 },
			volume: -5,
		}).toDestination();
	};

	const addVisualCircle = () => {
		const newCircle: VisualCircle = {
			id: Date.now() + Math.random(),
			x: Math.random() * 100,
			y: Math.random() * 100,
			color: `hsla(${Math.floor(Math.random() * 360)}, 70%, 60%, 0.4)`,
			size: 100 + Math.random() * 200,
		};
		setCircles((prev) => [...prev, newCircle]);
		setTimeout(() => {
			setCircles((prev) => prev.filter((c) => c.id !== newCircle.id));
		}, 2000);
	};

	const playSingleNote = (char: string) => {
		if (!pianoSampler.current) return;
		if (char === " ") return;

		const charCode = char.charCodeAt(0);
		const note = notes[charCode % notes.length];
		const velocity = 0.5 + Math.random() * 0.5;

		pianoSampler.current.triggerAttackRelease(
			note,
			"0.5",
			Tone.now(),
			velocity,
		);
		addVisualCircle();
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (!isAudioStarted) return;

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
			return;
		}

		if (e.key.length > 1) return;

		playSingleNote(e.key);
	};

	const replayMessage = async (msgId: string, text: string) => {
		if (isPlaying || !pianoSampler.current) return;

		setIsPlaying(msgId);

		for (const char of text) {
			playSingleNote(char);
			await new Promise((resolve) => setTimeout(resolve, 150));
		}

		setIsPlaying(null);
	};

	const sendMessage = () => {
		if (message.trim() === "") return;

		// 1. ÉTAPE DE MODÉRATION
		if (containsBadWords(message)) {
			// Affichage du message d'erreur
			setErrorMsg("Oups ! Restons courtois et poétiques 🌸");

			// Son d'erreur (Triton dissonant)
			if (validationSynthRef.current) {
				const now = Tone.now();
				validationSynthRef.current.triggerAttackRelease("A2", "8n", now);
				validationSynthRef.current.triggerAttackRelease("Eb3", "8n", now);
			}

			// On efface l'erreur après 3 secondes
			setTimeout(() => setErrorMsg(null), 3000);
			return; // ON ARRÊTE TOUT, le message n'est pas envoyé
		}

		// Si tout va bien :
		setErrorMsg(null);
		setSavedMessages((prev) => [
			{ id: Date.now().toString(), text: message },
			...prev,
		]);
		setMessage("");

		// Animation et Son de succès
		addVisualCircle();
		setTimeout(addVisualCircle, 100);

		if (validationSynthRef.current) {
			const now = Tone.now();
			validationSynthRef.current.triggerAttackRelease("C5", "16n", now);
			validationSynthRef.current.triggerAttackRelease("E5", "16n", now + 0.1);
			validationSynthRef.current.triggerAttackRelease("G5", "16n", now + 0.2);
			validationSynthRef.current.triggerAttackRelease("C6", "8n", now + 0.3);
		}
	};

	return (
		<section id="soundwall" className={styles.soundWallSection}>
			<div className={styles.visualsContainer}>
				{circles.map((circle) => (
					<div
						key={circle.id}
						className={styles.visualCircle}
						style={{
							left: `${circle.x}%`,
							top: `${circle.y}%`,
							backgroundColor: circle.color,
							width: `${circle.size}px`,
							height: `${circle.size}px`,
						}}
					/>
				))}
			</div>

			<div className={styles.contentLayer}>
				<h2>SoundWall</h2>
				<p>Composez votre mélodie en couleurs...</p>

				{!isAudioStarted ? (
					<button
						type="button"
						className={styles.startButton}
						onClick={startAudio}
						disabled={!isLoaded}
						style={{
							opacity: isLoaded ? 1 : 0.5,
							cursor: isLoaded ? "pointer" : "wait",
						}}
					>
						{isLoaded ? "Activer le Piano 🎹" : "Chargement des sons..."}
					</button>
				) : (
					<div className={styles.interactionContainer}>
						<div className={styles.inputWrapper}>
							<textarea
								// Ajout de la classe d'erreur conditionnelle
								className={`${styles.messageInput} ${errorMsg ? styles.inputError : ""}`}
								value={message}
								onChange={(e) => {
									setMessage(e.target.value);
									if (errorMsg) setErrorMsg(null); // On efface l'erreur dès que l'utilisateur corrige
								}}
								onKeyDown={onKeyDown}
								placeholder="Tapez pour jouer..."
								rows={3}
							/>

							{/* Affichage du message d'erreur s'il existe */}
							{errorMsg && (
								<div className={styles.errorMessage}>
									<AlertCircle size={18} />
									<span>{errorMsg}</span>
								</div>
							)}

							<button
								type="button"
								className={styles.sendButton}
								onClick={sendMessage}
							>
								Envoyer 🚀
							</button>
						</div>

						<div className={styles.wallContainer}>
							{savedMessages.length === 0 && (
								<p className={styles.emptyWall}>Le mur est silencieux...</p>
							)}
							{savedMessages.map((msg) => (
								<div key={msg.id} className={styles.wallMessage}>
									<span className={styles.messageText}>"{msg.text}"</span>

									<button
										type="button"
										className={styles.playButton}
										onClick={() => replayMessage(msg.id, msg.text)}
										disabled={isPlaying !== null}
										title="Rejouer la mélodie"
									>
										<Play
											size={16}
											fill={isPlaying === msg.id ? "#0077ed" : "white"}
											stroke={isPlaying === msg.id ? "#0077ed" : "white"}
										/>
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default SoundWallSection;
