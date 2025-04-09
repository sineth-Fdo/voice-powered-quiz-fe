import { create } from 'zustand';

interface DialogPopupI {

    dialogPopup: number;
    setDialogPopup: (dialogPopup: number) => void;
}

const useDialogPopupStore = create<DialogPopupI>((set) => ({
    dialogPopup: 0,
    setDialogPopup: (dialogPopup) => set({ dialogPopup: dialogPopup }),
}));

export default useDialogPopupStore;
