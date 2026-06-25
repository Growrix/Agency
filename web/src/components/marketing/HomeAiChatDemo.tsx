"use client";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HOME_AI_DEMO_SCRIPT } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

type Phase = "idle" | "user" | "typing" | "assistant" | "pills" | "done";

type HomeAiChatDemoProps = {
  variant: "desktop" | "mobile";
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const TIMING = {
  idleDelay: 180,
  afterUser: 450,
  typing: 550,
  afterAssistant: 320,
} as const;

const enterTransition = { duration: 0.32, ease: EASE };
const crossfadeTransition = { duration: 0.22, ease: EASE };

const demoTurn = HOME_AI_DEMO_SCRIPT.turns[0];

function TypingIndicator() {
  return (
    <div className="home-ai-chat-demo__typing" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function HomeAiChatDemo({ variant, className }: HomeAiChatDemoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, margin: "-40px 0px" });
  const reduced = useReducedMotion();
  const hasCompletedRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");

  const quickReplies = HOME_AI_DEMO_SCRIPT.quickReplies;

  useEffect(() => {
    if (reduced || hasCompletedRef.current || !inView || phase === "done") {
      return;
    }

    let timeout: ReturnType<typeof setTimeout> | undefined;

    switch (phase) {
      case "idle":
        timeout = setTimeout(() => setPhase("user"), TIMING.idleDelay);
        break;
      case "user":
        timeout = setTimeout(() => setPhase("typing"), TIMING.afterUser);
        break;
      case "typing":
        timeout = setTimeout(() => setPhase("assistant"), TIMING.typing);
        break;
      case "assistant":
        timeout = setTimeout(() => setPhase("pills"), TIMING.afterAssistant);
        break;
      case "pills":
        timeout = setTimeout(() => {
          hasCompletedRef.current = true;
          setPhase("done");
        }, 280);
        break;
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [inView, phase, reduced]);

  const userVisible = reduced || phase !== "idle";
  const assistantMode: "hidden" | "typing" | "message" = reduced
    ? "message"
    : phase === "typing"
      ? "typing"
      : phase === "assistant" || phase === "pills" || phase === "done"
        ? "message"
        : "hidden";
  const pillsVisible = reduced || phase === "pills" || phase === "done";

  return (
    <div
      ref={rootRef}
      className={cn("home-ai-chat-demo", `home-ai-chat-demo--${variant}`, className)}
      aria-hidden="true"
    >
      <span className="sr-only">Example AI conversation</span>

      <motion.div
        className="home-ai-chat-demo__row home-ai-chat-demo__row--user"
        initial={false}
        animate={{ opacity: userVisible ? 1 : 0, y: userVisible ? 0 : 6 }}
        transition={enterTransition}
      >
        <span className="home-ai-chat-demo__avatar" aria-hidden="true" />
        <div className="home-ai-chat-demo__bubble home-ai-chat-demo__bubble--user">
          <motion.span
            className="home-ai-chat-demo__bubble-text"
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: userVisible ? 1 : 0, y: userVisible ? 0 : 4 }}
            transition={crossfadeTransition}
          >
            {demoTurn.user}
          </motion.span>
        </div>
      </motion.div>

      <div className="home-ai-chat-demo__assistant-slot">
        <AnimatePresence mode="sync" initial={false}>
          {assistantMode === "typing" ? (
            <motion.div
              key="typing"
              className="home-ai-chat-demo__row home-ai-chat-demo__row--assistant"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={crossfadeTransition}
            >
              <div className="home-ai-chat-demo__bubble home-ai-chat-demo__bubble--typing">
                <TypingIndicator />
              </div>
              <span className="home-ai-chat-demo__badge" aria-hidden="true">
                <CubeTransparentIcon className="home-ai-chat-demo__badge-icon" aria-hidden="true" />
              </span>
            </motion.div>
          ) : null}

          {assistantMode === "message" ? (
            <motion.div
              key="assistant"
              className="home-ai-chat-demo__row home-ai-chat-demo__row--assistant"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={crossfadeTransition}
            >
              <div className="home-ai-chat-demo__bubble home-ai-chat-demo__bubble--assistant">
                <motion.span
                  className="home-ai-chat-demo__bubble-text"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...crossfadeTransition, delay: 0.04 }}
                >
                  {demoTurn.assistant}
                </motion.span>
              </div>
              <span className="home-ai-chat-demo__badge" aria-hidden="true">
                <CubeTransparentIcon className="home-ai-chat-demo__badge-icon" aria-hidden="true" />
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {pillsVisible ? (
          <motion.div
            key="pills"
            className="home-ai-chat-demo__pills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {quickReplies.map((reply, index) => (
              <motion.span
                key={reply}
                className="home-ai-chat-demo__pill"
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  ease: EASE,
                  delay: reduced ? 0 : 0.04 + index * 0.05,
                }}
              >
                {reply}
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
