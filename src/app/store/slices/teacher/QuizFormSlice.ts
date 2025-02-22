import { create } from "zustand";

interface FormOneData {
  title: string;
  code: string;
  description: string;
  password: string;
}

interface FormTwoData {
  teacher: string;
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
    teacher: "",
    subject: "",
    grade: "",
    batch: "",
  },
  setFormOne: (formOne) => set({ FormOne: formOne }),
  setFormTwo: (formTwo) => set({ FormTwo: formTwo }),
}));

export default useQuizFormOneStore;
