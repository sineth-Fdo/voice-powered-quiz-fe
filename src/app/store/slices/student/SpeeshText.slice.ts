import { create } from 'zustand';


interface SpeechTextI {

    speechText: string;
    textToSpeechText: string;
    setSpeechText: (speechText: string) => void;
    setTextToSpeechText: (textToSpeechText: string) => void;

}

const useSpeechTextStore = create<SpeechTextI>((set) => ({
    speechText: "",
    textToSpeechText: "",
    setSpeechText: (speechText) => set({ speechText: speechText }),
    setTextToSpeechText: (textToSpeechText) => set({ textToSpeechText: textToSpeechText }),
    
}));

export default useSpeechTextStore;
