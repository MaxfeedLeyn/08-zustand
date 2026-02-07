"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface NotesClientProps{
  tag: string | undefined;
}

function NotesClient({tag}:NotesClientProps) {

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tagType = tag === "all" ? undefined : tag;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page, tagType],
    queryFn: () => fetchNotes(query, page, tagType),
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 1000);

  const totalPages = data ? data.totalPages : 1;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={(selectedPage) => setPage(selectedPage)}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching notes.</p>}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
