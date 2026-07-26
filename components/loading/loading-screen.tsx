"use client";

import { motion } from "framer-motion";

const steps = [
  "Initializing workspace...",
  "Loading conversations...",
  "Loading projects...",
  "Preparing portfolio...",
];

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050606] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-4xl"
        >
          💬
        </motion.div>

        <h2 className="text-center text-3xl font-bold text-white">
          Preparing your experience
        </h2>

        <p className="mt-3 text-center text-gray-400">
          Please wait a moment...
        </p>

        <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>

        <div className="mt-8 space-y-3">
          {steps.map((step, index) => (
            <motion.p
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.45 }}
              className="text-gray-300"
            >
              ✓ {step}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}