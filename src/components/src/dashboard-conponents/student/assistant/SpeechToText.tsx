"use client";
import useSpeechTextStore from "@/app/store/slices/student/SpeeshText.slice";
import { Mic, MicOffIcon, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Define types for the Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const SpeechToText = () => {
  const { setSpeechText } = useSpeechTextStore();
  const [isListening, setIsListening] = useState<boolean>(false);

  // Use a ref to store the recognition instance to avoid re-creating it on each render
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Only initialize on client-side
  useEffect(() => {
    // Check if browser supports the Web Speech API
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();

        // Configure recognition
        if (recognitionRef.current) {
          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            const speechResult = event.results[0][0].transcript
              .split(" ") // Split the result into words
              .filter((word, index, arr) => word !== arr[index - 1]) // Remove consecutive duplicates
              .join(" "); // Join back into a cleaned string
            setSpeechText(speechResult);
          };

          recognitionRef.current.onerror = (
            event: SpeechRecognitionErrorEvent
          ) => {
            console.error("Error occurred in speech recognition:", event.error);
          };

          recognitionRef.current.onend = () => {
            setIsListening(false);
          };
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isListening) {
        startListening();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space" && isListening) {
        stopListening();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isListening]); // Re-run the effect if `isListening` changes

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Speech-to-Text functionality.");
      return;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  return (
    <div className=" flex justify-end">
      <div className=" w-auto h-10 flex justify-between space-x-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-RED">
          {isListening ? <Mic /> : <MicOffIcon />}
        </div>
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-RED">
          <Volume2 />
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
