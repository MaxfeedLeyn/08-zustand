import CreateNoteClient from './CreateNote.client'
import type { Metadata } from "next";

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
    <CreateNoteClient />
  );
}

export default CreateNote;
