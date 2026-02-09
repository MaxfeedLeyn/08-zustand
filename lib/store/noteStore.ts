// app/lib/stores/noteStore.ts

import { create } from 'zustand';
// 1. Імпортуємо функцію
import { persist } from 'zustand/middleware';
import { PostNote } from '@/types/note';

type PostNoteDraftStore = {
  draft: PostNote;
  setDraft: (note: PostNote) => void;
  clearDraft: () => void;
};

const initialDraft: PostNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<PostNoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
