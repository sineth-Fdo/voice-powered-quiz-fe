import { create } from 'zustand';


interface StepI {

    stepNumber: number;
    setStepNumber: (stepNumber: number) => void;
}

const useStepStore = create<StepI>((set) => ({
    stepNumber: 1,
    setStepNumber: (stepNumber) => set({ stepNumber: stepNumber }),
}));

export default useStepStore;
