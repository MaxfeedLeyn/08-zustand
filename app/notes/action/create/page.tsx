import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";
import { redirect } from "next/dist/server/api-utils";

export const metadata: Metadata = {
  title: "NoteHub: Create New",
  description: "Simple form to create new note for further completion",
  openGraph: {
    title: "NoteHub: Create New",
    description: "Simple form to create new note for further completion",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1536,
        height: 1024,
        alt: "NoteHub logo",
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={() => redirect('/')} />
      </div>
    </main>
  );
}

export default CreateNote;
