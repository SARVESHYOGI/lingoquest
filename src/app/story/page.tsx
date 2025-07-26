"use client";

import DecryptedText from "@/components/DecryptedText";
import { motion } from "motion/react";
interface StoryPageProps {
  story: string;
}

export default function StoryPage({ story }: StoryPageProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <div className="text-2xl font-bold mb-4 text-gray-800">
        Story Based on Your Preferences
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow p-6 max-w-xl w-full text-gray-700"
      >
        {story && (
          <>
            <DecryptedText
              text={story}
              animateOn="view"
              revealDirection="center"
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
