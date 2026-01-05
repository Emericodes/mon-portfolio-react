import { useEffect, useRef, useState } from "react";
import styles from "./SoundWallSection.module.css";
import * as Tone from "tone";
import { Play, AlertCircle } from "lucide-react";
import { BAD_WORDS } from "./constants";

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
}

const SoundWallSection = () => {
    const [audioOn, setAudioOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    
    const [wallMessages, setWallMessages] = useState<WallMessage[]>([]);
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

    const clickStart = async () => {
        await Tone.start();
        setAudioOn(true);
        
        synth.current = new Tone.Synth({
            oscillator: { type: "square" },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 },
            volume: -5,
        }).toDestination();
    };

    const makeCircle = () => {
        const obj: VisualCircle = {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            color: `hsla(${Math.floor(Math.random() * 360)}, 70%, 60%, 0.4)`,
            size: 100 + Math.random() * 200,
        };
        
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
        const velocity = 0.5 + Math.random() * 0.5;

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
        if (text.trim() === "") return;

        if (checkBadWord(text)) {
            setError("Oups ! Restons courtois et poétiques 🌸");
            
            if (synth.current) {
                const now = Tone.now();
                synth.current.triggerAttackRelease("A2", "8n", now);
                synth.current.triggerAttackRelease("Eb3", "8n", now);
            }
            
            setTimeout(() => setError(null), 3000);
            return;
        }

        setError(null);
        
        const newMessage: WallMessage = { 
            id: Date.now().toString(), 
            text: text 
        };

        setWallMessages((prev) => [newMessage, ...prev]);
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
        <section id="soundwall" className={styles.soundWallSection}>
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
                <h2>SoundWall</h2>
                <p>Composez votre mélodie en couleurs...</p>

                {!audioOn ? (
                    <button
                        type="button"
                        className={styles.startButton}
                        onClick={clickStart}
                        disabled={!loading}
                        style={{
                            opacity: loading ? 1 : 0.5,
                            cursor: loading ? "pointer" : "wait",
                        }}
                    >
                        {loading ? "Activer le Piano 🎹" : "Chargement des sons..."}
                    </button>
                ) : (
                    <div className={styles.interactionContainer}>
                        <div className={styles.inputWrapper}>
                            <textarea
                                className={`${styles.messageInput} ${error ? styles.inputError : ""}`}
                                value={text}
                                onChange={inputChange}
                                onKeyDown={typing}
                                placeholder="Tapez pour jouer..."
                                rows={3}
                            />
                            {error && (
                                <div className={styles.errorMessage}>
                                    <AlertCircle size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="button"
                                className={styles.sendButton}
                                onClick={sendToWall}
                            >
                                Envoyer 🚀
                            </button>
                        </div>

                        <div className={styles.wallContainer}>
                            {wallMessages.length === 0 && (
                                <p className={styles.emptyWall}>Le mur est silencieux...</p>
                            )}
                            {wallMessages.map((msg) => (
                                <div key={msg.id} className={styles.wallMessage}>
                                    <span className={styles.messageText}>"{msg.text}"</span>

                                    <button
                                        type="button"
                                        className={styles.playButton}
                                        onClick={() => playAgain(msg.id, msg.text)}
                                        disabled={playingId !== null}
                                        title="Rejouer la mélodie"
                                    >
                                        <Play
                                            size={16}
                                            fill={playingId === msg.id ? "#0077ed" : "white"}
                                            stroke={playingId === msg.id ? "#0077ed" : "white"}
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