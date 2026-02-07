import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

// 💌 LOVE MESSAGE
const LOVE_MESSAGE = `Thank you so much. I love you more than anything in the world.

Terima kasih banyak. Aku mencintaimu lebih dari apa pun di dunia.`;

// 💌 SECOND PAGE MESSAGE
const THANK_YOU_PAGE_TEXT = `Thank you for coming into my life.
Before you, I was just existing… but because of you, I started truly living again.
You gave me reasons to smile when I forgot how to, reasons to laugh when life felt heavy, and reasons to believe that love like this is real.

You are not just special to me, you are my peace, my happiness, my safe place.
The way you care, the way you understand me, the way you stand by me… it means more than I can ever explain.

You are the best thing that has ever happened to me.
You walked into my life and changed everything without even trying.

I want to be there for you on your best days and your worst days.
I want to hold your hand through every phase of life.
I don’t just want to love you today, I want to love you forever.

If I had to choose again, in every lifetime, in every world, I would still choose you.

I love you Riska ❤️`;

// 🖼️ CLOUDINARY IMAGE LINKS
const LOVE_PHOTOS = [
  "https://res.cloudinary.com/dd9rdl01i/image/upload/v1770493458/IMG_9080_vmuxov.png",
  "https://res.cloudinary.com/dd9rdl01i/image/upload/v1770493576/IMG_9084_zxkufr.png",
  "https://res.cloudinary.com/dd9rdl01i/image/upload/v1770493578/IMG_9083_wwu3b6.png"
];

// 🎵 MAIN PAGE SONG
const LOVE_SONG = "https://res.cloudinary.com/dd9rdl01i/video/upload/v1770493987/Roopkumar_Rathod_-_Tujh_Mein_Rab_Dikhta_Hai_Lyrics_Rab_Ne_Bana_Di_Jodi_ryzlys.mp3";

// 🎵 THANK YOU PAGE SONG
const THANK_YOU_SONG = "https://res.cloudinary.com/dd9rdl01i/video/upload/v1770495252/tum-hi-ho-lyrics-arijit-singhaashiqui-2-tseries_LlNFYQvm_pq2loi.mp3";

// 🎞️ SIDE GIFS
const LEFT_GIF = "https://media.giphy.com/media/1JmGiBtqTuehfYxuy9/giphy.gif";
const RIGHT_GIF = "https://media.giphy.com/media/f9EmXxglhdhAj1bo28/giphy.gif";

// 💖 Falling Hearts
function HeartRain() {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0.7 }}
          animate={{ y: window.innerHeight + 100, opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          className="absolute text-pink-400 text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

// ❤️ Heart Cursor
function HeartPointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          fontSize: "28px"
        }}
      >
        ❤️
      </div>
    </div>
  );
}

// ⌨️ Typewriter Text
function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <p className="whitespace-pre-line text-lg leading-relaxed">{displayed}</p>;
}

export default function ValentineApp() {
  const [answeredYes, setAnsweredYes] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNo = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-[#ffd6e0] p-6 font-mono overflow-hidden"
      style={{ cursor: "none" }}
    >
      <HeartPointer />

      <AnimatePresence mode="wait">
        {!answeredYes ? (
          <motion.div key="question" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <div className="border-4 border-black shadow-lg bg-[#fff0f6] rounded-2xl p-10 text-center space-y-6">
              <Heart className="text-red-600 w-16 h-16 mx-auto" fill="currentColor" />

              <h1 className="text-2xl font-bold tracking-wide">WILL YOU BE MY VALENTINE?</h1>

              <div className="flex justify-center gap-6 pt-4 relative">
                <button onClick={() => setAnsweredYes(true)} className="text-lg px-6 py-2 bg-pink-400 rounded-lg">YES</button>

                <motion.div animate={{ x: noPos.x, y: noPos.y }} transition={{ type: "spring", stiffness: 300 }}>
                  <button onMouseEnter={moveNo} onClick={moveNo} className="text-lg px-6 py-2 bg-white border border-black text-black rounded-lg">NO</button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <LoveMode />
        )}
      </AnimatePresence>
    </div>
  );
}

function LoveMode() {
  const [opened, setOpened] = useState(false);
  const [showThankYouPage, setShowThankYouPage] = useState(false);
  const thankYouAudioRef = useRef(null);

  useEffect(() => {
    if (showThankYouPage && thankYouAudioRef.current) {
      thankYouAudioRef.current.play().catch(() => {});
    }
  }, [showThankYouPage]);

  if (showThankYouPage) {
    return (
      <div className="relative min-h-screen flex justify-center items-center overflow-hidden" style={{ cursor: "none" }}>
        <HeartPointer />
        <HeartRain />

        <audio ref={thankYouAudioRef} src={THANK_YOU_SONG} loop autoPlay />

        <div className="max-w-2xl mx-auto bg-[#fff0f6] border-4 border-black rounded-2xl shadow-2xl p-10">
          <TypewriterText text={THANK_YOU_PAGE_TEXT} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center min-h-[70vh]" style={{ cursor: "none" }}>
      <HeartPointer />

      <div className="text-center space-y-6 relative">
        {!opened ? (
          <button onClick={() => setOpened(true)}>
            <Heart className="w-32 h-32 text-red-600 mx-auto" fill="currentColor" />
            <p>Click heart to open</p>
          </button>
        ) : (
          <div className="relative flex items-center justify-center">
            <img src={LEFT_GIF} className="hidden lg:block absolute -left-52 top-1/2 -translate-y-1/2 w-44 pointer-events-none select-none" />
            <img src={RIGHT_GIF} className="hidden lg:block absolute -right-52 top-1/2 -translate-y-1/2 w-44 pointer-events-none select-none" />

            <div className="max-w-lg mx-auto bg-[#fff0f6] border-4 border-black rounded-2xl p-8 space-y-6">
              <p className="text-lg whitespace-pre-line">{LOVE_MESSAGE}</p>

              <div className="grid grid-cols-3 gap-3">
                {LOVE_PHOTOS.map((src, i) => (
                  <img key={i} src={src} alt={`photo-${i}`} className="rounded-lg object-cover w-full h-24" />
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold">🎵 Tujh me rab dikhta he</p>
                <audio controls autoPlay loop>
                  <source src={LOVE_SONG} type="audio/mpeg" />
                </audio>

                <button onClick={() => setShowThankYouPage(true)} className="bg-pink-400 text-black w-full py-2 rounded-lg">
                  Thank You
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
