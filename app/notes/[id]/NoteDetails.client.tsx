"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <div className={css.container}>
      {isLoading && <p>Loading, please wait...</p>}
      {(error || !note) && <p>Something went wrong.</p>}
      {note && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      )}
    </div>
  );
}

export default NoteDetailsClient;
