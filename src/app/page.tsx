"use client";
import { useState } from "react";
import Story from "../components/Story";
import { motion } from "motion/react";
interface Question {
  questionText: string;
  options?: string[];
  inputtext?: string;
}

const questions: Question[] = [
  {
    questionText: "Choose language",
    options: ["English", "Spanish", "French", "German", "Japanese"],
  },
  {
    questionText: "Select Difficulty",
    options: ["Beginner", "Intermediate", "Advance"],
  },
  {
    questionText: "Choose Theme",
    options: ["Adventure", "Romance", "Sci-fi", "Mystery"],
  },
  {
    questionText: "Enter Theme line",
    inputtext: "Enter text here...",
  },
];

export default function Home() {
  const [currInd, setCurrInd] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
    setInputValue("");
    setCurrInd((prev) => prev + 1);
  };

  const handleGenerate = async () => {
    const [language, difficulty, theme, input] = answers;
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, difficulty, theme, input }),
      });
      console.log(res);

      // const data = {
      //   text: '**अहं भीतः अस्मि।** इति रामः अवदत्।\n\nएकदा रामः स्वमित्रेण सह चलचित्रं द्रष्टुं अगच्छत्। तत् एकं महद् नाटकमन्दिरम् आसीत्। जनाः तत्र आसन्।\n\nचित्रस्य आरम्भे एकं भयंकरं दृश्यम् आसीत्। एकः विशालः राक्षसः आगतः। सः गर्जितवान्। रामः भीतः अभवत्। सः स्वनेत्रे पिहितवान्।\n\nकिन्तु, क्षणानन्तरम्, एकं हास्यं दृश्यम् आगतम्। सर्वे जनाः उच्चैः अहसन्। रामः अपि अहसत्। सः विस्मितः अभवत्।\n\nततः एकं करुणं दृश्यम् आसीत्। केचन जनाः अरोदन्। रामः अपि किञ्चित् दुःखितः अभवत्।\n\nअन्ते, एकं सुन्दरं सुखदं दृश्यम् आसीत्। सर्वे जनाः प्रसन्नाः आसन्। रामः अपि प्रसन्नः आसीत्।\n\nचित्रम् अद्भुतम् आसीत्। रामः अवदत्, "अये, चलचित्रम् अतिरोचकम् अस्ति! अहं पुनः आगमिष्यामि!"\n\n***\n\n**Vocabulary (शब्दावली):**\n\n*   **भीतः (bheetah):** scared\n*   **चलचित्रम् (chalachitram):** movie / film\n*   **नाटकमन्दिरम् (naaTakamandiram):** theatre / cinema hall\n*   **दृश्यम् (dRshyam):** scene\n*   **राक्षसः (raakshasaH):** monster\n*   **हसति (hasati):** laughs (अहसत् - laughed)\n*   **प्रसन्नः (prasannaH):** happy',
      // };

      const data = await res.json();
      console.log("data :", data);
      const abs = data.text.replaceAll("**", "");
      setStory(abs);
      // const speak = (abs) => {
      //   const utterance = new SpeechSynthesisUtterance(abs);
      //   window.speechSynthesis.speak(utterance);
      // };
      // speak(abs);
    } catch (error) {
      console.error("Failed to generate story:", error);
    } finally {
      setLoading(false);
    }
  };

  const currQ = questions[currInd];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-xl p-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-extrabold text-purple-700 mb-2">
          LingoQuest
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Create personalized language learning stories by answering a few fun
          questions. Choose your language, difficulty, and theme, then enjoy a
          unique story tailored just for you!
        </p>
      </motion.div>
      {story ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          <Story story={story} />
          <button
            className="mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition-all"
            onClick={() => {
              setStory(null);
              setCurrInd(0);
              setAnswers([]);
              setInputValue("");
            }}
          >
            Go Back
          </button>
        </motion.div>
      ) : currQ ? (
        <motion.div
          initial={{
            opacity: 0,
            x: currInd % 2 === 0 ? 100 : -100, // Even index: from right, Odd: from left
          }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: currInd % 2 === 0 ? -100 : 100 }} // Animate out opposite direction
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-white/80 rounded-xl shadow-lg p-8"
        >
          <motion.h2
            initial={{ opacity: 0, x: currInd % 2 === 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 font-semibold text-purple-700 text-2xl"
          >
            {currQ.questionText}
          </motion.h2>

          {currQ.options && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="flex flex-col gap-3"
            >
              {currQ.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: currInd % 2 === 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all"
                  onClick={() => handleAnswer(opt)}
                  whileTap={{ scale: 0.95 }}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          )}

          {currQ.inputtext && (
            <motion.div
              initial={{ opacity: 0, x: currInd % 2 === 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-2 mt-6"
            >
              <motion.input
                type="text"
                placeholder={currQ.inputtext}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
                initial={false}
                animate={false}
              />
              <motion.button
                onClick={() => inputValue && handleAnswer(inputValue)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 hover:scale-105 transition-all"
                disabled={!inputValue.trim()}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-white/80 rounded-xl shadow-lg p-8 max-w-md w-full"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold mb-4 text-purple-700"
          >
            Thank you!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-2"
          >
            Your answers:
          </motion.p>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="list-disc list-inside mb-4 text-left"
          >
            {answers.map((ans, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="text-blue-700"
              >
                {ans}
              </motion.li>
            ))}
          </motion.ul>
          <motion.button
            onClick={handleGenerate}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 hover:scale-105 transition-all"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            initial={false}
            animate={false}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Story"
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
