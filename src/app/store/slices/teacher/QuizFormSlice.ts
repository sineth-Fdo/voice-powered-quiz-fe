import { create } from "zustand";

interface FormOneData {
  title: string;
  code: string;
  description: string;
  password: string;
}

interface FormTwoData {
  subject: string;
  grade: string;
  batch: string;
}

interface FormOneI {
  FormOne: FormOneData;
  FormTwo: FormTwoData;
  setFormOne: (formOne: FormOneData) => void;
  setFormTwo: (formTwo: FormTwoData) => void;
}

const useQuizFormOneStore = create<FormOneI>((set) => ({
  FormOne: {
    title: "",
    code: "",
    description: "",
    password: "",
  },
  FormTwo: {
    subject: "",
    grade: "",
    batch: "",
  },
  setFormOne: (formOne) => set({ FormOne: formOne }),
  setFormTwo: (formTwo) => set({ FormTwo: formTwo }),
}));

export default useQuizFormOneStore;
