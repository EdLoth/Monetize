import { create } from "zustand"

type NewWishState = {
    isOpen: boolean;
    onOpen: () =>  void;
    onClose: () => void;
}

export const useNewWish = create<NewWishState>((set) => ({
    isOpen: false, 
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))