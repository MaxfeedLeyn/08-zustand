"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";
import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

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
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching notes.</p>}
    </div>
  );
}

export default NotesClient;
