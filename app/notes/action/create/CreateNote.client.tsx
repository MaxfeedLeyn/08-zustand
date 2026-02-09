"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { useRouter } from 'next/navigation';
    
function CreateNoteClient() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={handleClose} />
      </div>
    </main>
  );
}

export default CreateNoteClient;
