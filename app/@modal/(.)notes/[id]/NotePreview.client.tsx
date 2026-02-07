"use client";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {error && <p>Something went wrong.</p>}
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.tag}>{note.tag}</p>
          </div>
        )}
        <button className={css.backBtn} onClick={handleClose}>Close</button>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
