import { useEffect, useRef, useState } from "react";
import styles from "./SoundWallSection.module.css";
import * as Tone from "tone";
import { AlertCircle, Play, Send } from "lucide-react";
import { BAD_WORDS } from "./constants";

const MAX_WALL_MESSAGES = 10;
const SOUND_WALL_STORAGE_KEY = "sound-wall-messages";

interface VisualCircle {
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
}

interface WallMessage {
    id: string;
    text: string;
    createdAt: string;
}

const createVisualCircle = (): VisualCircle => ({
    id: Date.now() + Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: `hsla(${Math.floor(Math.random() * 360)}, 70%, 60%, 0.4)`,
    size: 100 + Math.random() * 200,
});

const createWallMessage = (text: string): WallMessage => ({
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString(),
});

const getVelocity = () => 0.5 + Math.random() * 0.5;

const SoundWallSection = () => {
    const [audioOn, setAudioOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    
    const [wallMessages, setWallMessages] = useState<WallMessage[]>(() => {
        try {
            const storedMessages = window.localStorage.getItem(SOUND_WALL_STORAGE_KEY);
            if (!storedMessages) return [];

            const parsedMessages = JSON.parse(storedMessages);
            if (!Array.isArray(parsedMessages)) return [];

            return parsedMessages
                .filter(
                    (message): message is WallMessage =>
                        typeof message?.id === "string" &&
                        typeof message?.text === "string" &&
                        typeof message?.createdAt === "string",
                )
                .slice(0, MAX_WALL_MESSAGES);
        } catch {
            return [];
        }
    });
    const [visualCircles, setVisualCircles] = useState<VisualCircle[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);

    const sampler = useRef<Tone.Sampler | null>(null);
    const synth = useRef<Tone.Synth | null>(null);

    const notesList = [
        "C3", "D3", "E3", "G3", "A3", 
        "C4", "D4", "E4", "G4", "A4", 
        "C5", "D5", "E5", "G5"
    ];

    const checkBadWord = (inputText: string) => {
        const lower = inputText.toLowerCase();
        const cleanText = lower.replace(/[.,/#!$%^&*;:{}=_`~()\-\]]/g, " ");
        const words = cleanText.split(/\s+/);
        
        for (let i = 0; i < words.length; i++) {
            if (BAD_WORDS.includes(words[i])) {
                return true;
            }
        }
        
        return false;
    };

    useEffect(() => {
        sampler.current = new Tone.Sampler({
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
            onload: () => {
                setLoading(true);
            },
        }).toDestination();

        return () => {
            if (sampler.current) {
                sampler.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                SOUND_WALL_STORAGE_KEY,
                JSON.stringify(wallMessages.slice(0, MAX_WALL_MESSAGES)),
            );
        } catch {
            // Le SoundWall reste utilisable si le navigateur bloque localStorage.
        }
    }, [wallMessages]);

    const initializeAudio = async () => {
        try {
            await Tone.start();

            synth.current = new Tone.Synth({
                oscillator: { type: "square" },
                envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 },
                volume: -5,
            }).toDestination();
        } catch {
            setError("Le son est bloqué par le navigateur, mais le mur reste utilisable.");
        }
    };

    const clickStart = () => {
        setAudioOn(true);
        void initializeAudio();
    };

    const makeCircle = () => {
        const obj = createVisualCircle();
        
        setVisualCircles((prev) => [...prev, obj]);
        
        setTimeout(() => {
            setVisualCircles((prev) => prev.filter((c) => c.id !== obj.id));
        }, 2000);
    };

    const playNote = (char: string) => {
        if (!sampler.current) return;
        if (char === " ") return;

        const code = char.charCodeAt(0);
        const noteToPlay = notesList[code % notesList.length];
        const velocity = getVelocity();

        sampler.current.triggerAttackRelease(noteToPlay, "0.5", Tone.now(), velocity);
        makeCircle();
    };

    const typing = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!audioOn) return;

        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendToWall();
            return;
        }

        if (event.key.length === 1) {
            playNote(event.key);
        }
    };

    const inputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        if (error) setError(null);
    };

    const playAgain = async (id: string, content: string) => {
        if (playingId) return;

        setPlayingId(id);

        for (let i = 0; i < content.length; i++) {
            playNote(content[i]);
            await new Promise((r) => setTimeout(r, 150));
        }

        setPlayingId(null);
    };

    const sendToWall = () => {
        const trimmedText = text.trim();
        if (trimmedText === "") return;

        if (checkBadWord(trimmedText)) {
            setError("Oups ! Restons courtois et poétiques.");
            
            if (synth.current) {
                const now = Tone.now();
                synth.current.triggerAttackRelease("A2", "8n", now);
                synth.current.triggerAttackRelease("Eb3", "8n", now);
            }
            
            setTimeout(() => setError(null), 3000);
            return;
        }

        setError(null);
        
        const newMessage = createWallMessage(trimmedText);

        setWallMessages((prev) => [newMessage, ...prev].slice(0, MAX_WALL_MESSAGES));
        setText("");
        
        makeCircle();
        setTimeout(makeCircle, 100);

        if (synth.current) {
            const now = Tone.now();
            synth.current.triggerAttackRelease("C5", "16n", now);
            synth.current.triggerAttackRelease("E5", "16n", now + 0.1);
            synth.current.triggerAttackRelease("G5", "16n", now + 0.2);
            synth.current.triggerAttackRelease("C6", "8n", now + 0.3);
        }
    };

    return (
        <section
            id="soundwall"
            className={styles.soundWallSection}
            aria-labelledby="soundwall-title"
        >
            <div className={styles.visualsContainer}>
                {visualCircles.map((circle) => (
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
                <h2 id="soundwall-title">SoundWall</h2>
                <p>Composez votre mélodie en couleurs.</p>

                {!audioOn ? (
                    <button
                        type="button"
                        className={styles.startButton}
                        onClick={clickStart}
                        disabled={!loading}
                        aria-busy={!loading}
                    >
                        {loading ? "Activer le piano" : "Chargement des sons..."}
                    </button>
                ) : (
                    <div className={styles.interactionContainer}>
                        <div className={styles.inputWrapper}>
                            <label className="sr-only" htmlFor="soundwall-message">
                                Message musical
                            </label>
                            <textarea
                                id="soundwall-message"
                                className={`${styles.messageInput} ${error ? styles.inputError : ""}`}
                                value={text}
                                onChange={inputChange}
                                onKeyDown={typing}
                                placeholder="Tapez pour jouer..."
                                rows={3}
                                maxLength={180}
                                aria-describedby="soundwall-help soundwall-count"
                                aria-invalid={error ? "true" : "false"}
                            />
                            <div className={styles.inputMeta}>
                                <p id="soundwall-help">
                                    Entrée pour publier, Maj + Entrée pour revenir à la ligne.
                                </p>
                                <span id="soundwall-count">{text.length}/180</span>
                            </div>
                            {error && (
                                <div className={styles.errorMessage} role="alert">
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="button"
                                className={styles.sendButton}
                                onClick={sendToWall}
                                disabled={text.trim() === ""}
                            >
                                <Send size={18} aria-hidden="true" />
                                Envoyer
                            </button>
                        </div>

                        <div
                            className={styles.wallContainer}
                            aria-live="polite"
                            aria-label={`Mur sonore, ${wallMessages.length} message${wallMessages.length > 1 ? "s" : ""} affiché${wallMessages.length > 1 ? "s" : ""} sur ${MAX_WALL_MESSAGES} maximum`}
                        >
                            {wallMessages.length === 0 && (
                                <p className={styles.emptyWall}>Le mur est silencieux...</p>
                            )}
                            {wallMessages.map((msg) => (
                                <article key={msg.id} className={styles.wallMessage}>
                                    <p className={styles.messageText}>"{msg.text}"</p>

                                    <button
                                        type="button"
                                        className={styles.playButton}
                                        onClick={() => playAgain(msg.id, msg.text)}
                                        disabled={playingId !== null}
                                        aria-label={`Rejouer la mélodie du message : ${msg.text}`}
                                    >
                                        <Play
                                            size={16}
                                            aria-hidden="true"
                                            fill={playingId === msg.id ? "#0077ed" : "white"}
                                            stroke={playingId === msg.id ? "#0077ed" : "white"}
                                        />
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SoundWallSection;
