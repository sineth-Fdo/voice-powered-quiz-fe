import { create } from 'zustand';


interface FormOneI {

    FormOne: {
        title: string;
        code: string;
        description: string;
        password: string;
    };
    FormTwo: {
        teacher: string;    
        subject: string;
        grade: string;
        batch: string;
    };
    setFormOne: (formOne: any) => void;
    setFormTwo: (formTwo: any) => void;
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
