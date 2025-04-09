"use client";
import { useEffect, useState, useCallback } from "react";

const TextToSpeech = (props: { speechedText: string }) => {
  const { speechedText } = props;
  const [language] = useState("en-GB");
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const speakText = useCallback(() => {
    if (!speechedText) {
      console.warn("No text to speak.");
      return;
    }

    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech to avoid overlap
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(speechedText);
      speech.lang = language;

      // Optional: Adjust speech properties
      speech.rate = 0.9;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    } else {
      console.warn("Sorry, your browser doesn't support Text-to-Speech.");
    }
  }, [speechedText, language]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowDown" && !isSpacePressed) {
        setIsSpacePressed(true);
        speakText();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "ArrowDown") {
        setIsSpacePressed(false);
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [speakText, isSpacePressed]);

  useEffect(() => {
    speakText();
  }
  , [speakText]);

  return (
    <div className="hidden">
      <p>{speechedText}</p>
    </div>
  );
};

export default TextToSpeech;